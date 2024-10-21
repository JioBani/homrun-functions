import { DecodedIdToken } from "firebase-admin/auth";
import { NoticeReferences } from "./notice.refernces";
import { NoticeDtoFields } from "./value/notice_dto.fields";
import * as firebaseAdmin from 'firebase-admin';
import { DocumentSnapshot, QuerySnapshot, Timestamp } from "firebase-admin/firestore";
import { LikeFields } from "./value/like.fields";
import {  NotFoundError } from "../../error/http.error";
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from "firebase-functions/v1";
import { ApplyHommeApiService } from "../applyhome/applyhome_api.service";
import { ApplyHomeDto } from "../applyhome/model/apply_home.dto";
import { SupplyMethod } from "../applyhome/value/supply_method.enum";
import { ApplyHomeResult } from "../applyhome/common/apply_home_result";
import { GeminiApiService } from "../gemini_api/gemini_api.service";

export class NoticeService{

    constructor(
        private applyHomeApiService : ApplyHommeApiService,
        private geminiApiService  : GeminiApiService
    ){}

    private noticeCollection = NoticeReferences.getNoticeCollection();
    private aptInfoUploadCollection = NoticeReferences.getAptInfoUploadResultCollection();

    async increaseViewCount(noticeId : string){
         const doc = await NoticeReferences.getNoticeDocument(noticeId);

         try{
            await doc.update({
                [NoticeDtoFields.views] : FieldValue.increment(1)
            }); 
         }catch(e){
            if(this.checkIsDocumentNotFoundError(e)){
                throw NotFoundError.DocumentNotFoundError();             
            }
            else{
                throw e;
            }
         }         
    }

    async like(token: DecodedIdToken, noticeId: string, like: boolean) : Promise<boolean>{
        const likeRef = NoticeReferences.getNoticeLikeCollection(noticeId).doc(token.uid);
        const noticeRef = NoticeReferences.getNoticeDocument(noticeId);

        if(!(await noticeRef.get()).exists){
            throw NotFoundError.DocumentNotFoundError();
        }
    
        await firebaseAdmin.firestore().runTransaction(async (transaction) => {
            try{
                if(like){                
                    await transaction.set(likeRef, {[LikeFields.likeAt]: Timestamp.now()});
                    transaction.update(noticeRef, {
                        [NoticeDtoFields.likes]: FieldValue.increment(1),
                    });
                } else {        
                    await transaction.delete(likeRef);
                    transaction.update(noticeRef, {
                        [NoticeDtoFields.likes]: FieldValue.increment(-1),
                    });
                }
            }catch(e){
                if(this.checkIsDocumentNotFoundError(e)){
                    throw NotFoundError.DocumentNotFoundError();             
                }
                else{
                    throw e;
                }
            }    
        });
    
        return like;
    }    
    
    private checkIsDocumentNotFoundError(e : any) : boolean{
        if (e instanceof Error && 'code' in e && (e as any).code === 5) {
            return true;
        } 
        else{
            return false;
        }
    }

    //#. 공고 스크랩 수 증가
    async updateNoticeScrapCount(noticeId : string,up : boolean){  
        //#. 공고 문서 가져오기
        const doc = await NoticeReferences.getNoticeDocument(noticeId);

        //#. 스크랩 수 증가
        await doc.update({
            [NoticeDtoFields.scraps] : FieldValue.increment(up ? 1 : -1)
        });   
    }


    //#region 공고 문서 업데이트

    //#. 공고 업데이트
    //TODO 시간으로 가져오는거 오류있음
    async updateAptInfo(){
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 2);

        const announcementResult = await this.applyHomeApiService.getAptAnnouncementInfo(currentDate);
        await this.updateAptInfoByApplyHomeResult(announcementResult, SupplyMethod.General);
        logger.log("공급 방식 : 일반 완료")

        const unrankedRemainResult = await this.applyHomeApiService.getUrankedRemainInfo(currentDate);
        await this.updateAptInfoByApplyHomeResult(unrankedRemainResult, SupplyMethod.UnrankedRemain);
        logger.log("공급 방식 : 무순위, 잔여세대 완료")

        const optionalSupplytResult = await this.applyHomeApiService.getAPTOptionalSupplyInfo(currentDate);
        await this.updateAptInfoByApplyHomeResult(optionalSupplytResult, SupplyMethod.OptionalSupply);
        logger.log("공급 방식 : 임의 공급 완료")
    }

      //#. 공고 업데이트
      async updateAptInfoForce(){
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 2);

        const announcementResult = await this.applyHomeApiService.getAptAnnouncementInfo(currentDate);
        await this.updateAptInfoByApplyHomeResult(announcementResult, SupplyMethod.General);
        logger.log("공급 방식 : 일반 완료")

        const unrankedRemainResult = await this.applyHomeApiService.getUrankedRemainInfo(currentDate);
        await this.updateAptInfoByApplyHomeResult(unrankedRemainResult, SupplyMethod.UnrankedRemain);
        logger.log("공급 방식 : 무순위, 잔여세대 완료")

        const optionalSupplytResult = await this.applyHomeApiService.getAPTOptionalSupplyInfo(currentDate);
        await this.updateAptInfoByApplyHomeResult(optionalSupplytResult, SupplyMethod.OptionalSupply);
        logger.log("공급 방식 : 임의 공급 완료")
    }


    //#. 주소를 시도, 시군구로 파싱하여 업데이트
    async updateAddress(){
        const begin = new Date().getMilliseconds();

        const querySnapshot : QuerySnapshot = await this.noticeCollection.get();
        const updateNeededList: DocumentSnapshot[] = [];

        querySnapshot.docs.forEach((doc) => {
            if (doc.data()?.region == null && doc.data()?.detailRegion == null) {
                updateNeededList.push(doc);
            }
        });


        //#. 리스트 분할
        const chunkSize = 50;
        const chunkedList: DocumentSnapshot[][] = [];
        const errors : string[] = [];
    
        for (let i = 0; i < updateNeededList.length; i += chunkSize) {
            const chunk = updateNeededList.slice(i, i + chunkSize);
            chunkedList.push(chunk);
        }

        //#. 요청
        for (const chunk of chunkedList) {
            const addressList: Array<string> = chunk.map((snapshot) => {
                return snapshot.data()?.info.basicInfo.supplyLocationAddress ?? '';
            });
    
            // 파싱 부분은 순차 처리
            const parsingResult = await this.geminiApiService.parseAddressList(addressList);
    
            if (parsingResult.isSuccess) {

                //#. 병렬로 문서 업데이트
                const updatePromises = parsingResult.data!.map((parsedAddress, index) => {
                    const doc = chunk[index];
    
                    if (parsedAddress) {
                        const updateData = {
                            region: parsedAddress.시도,
                            detailRegion: parsedAddress.시군구,
                        };
    
                        // Firestore 문서 업데이트 비동기 작업 생성
                        return doc.ref.update(updateData);
                    }
    
                    return Promise.resolve(); // 아무것도 업데이트할 필요가 없는 경우
                });
    
                // 모든 업데이트 작업을 병렬로 실행
                await Promise.all(updatePromises);
            } else {
                errors.push(`${parsingResult.error}`);
            }
        }

        const end = new Date().getMilliseconds();

        //#. 결과 로깅
        await firebaseAdmin.firestore().collection('notice_address_update').add({
            "date" : Timestamp.now(),
            "totalDoc" : querySnapshot.docs.length,
            "updatedNeeded" : updateNeededList.length,
            "chunkLength" : chunkedList.length,
            "error" : errors,
            "time" : end - begin,
        });

        return {
            date : Timestamp.now(),
            totalDoc : querySnapshot.docs.length,
            updatedNeeded : updateNeededList.length,
            chunkLength : chunkedList.length,
            error : errors,
            time : end - begin,
        };
    }

    //#. API 결과를 이용해서 Firebase에 공고를 업로드하고 결과를 저장
    async updateAptInfoByApplyHomeResult(result : ApplyHomeResult , supplyMethod : SupplyMethod){
        let uploadResult = null;

        //#. 공고 업로드하기
        if(result.data != null){
            console.time(`[NoticeService.updateAptInfoByApplyHomeResult()] ${supplyMethod}`);
            uploadResult = await Promise.all(result.data.map(async dto =>{
                if(dto != null){
                    return await this.uploadAptDto(dto , supplyMethod);
                }
                else{
                    return null;
                }
            }));
            console.timeEnd(`[NoticeService.updateAptInfoByApplyHomeResult()] ${supplyMethod}`);
        }

        //#. 결과 저장하기
        try{
            this.aptInfoUploadCollection.doc(Timestamp.now().toMillis().toString()).set({
                date : Timestamp.now(),
                supplyMethod : supplyMethod,
                statistics : result.statistics.toMapWithTimeStamp(),
                firebaseResult : uploadResult,
            });
        }catch(e){
            logger.error(e);
        }
    }

    

    //#. DTO를 firebase에 업로드
    private async uploadAptDto(applyHomeDto : ApplyHomeDto , supplyMethod : SupplyMethod)
    {
        try{

            const doc = this.noticeCollection.doc(applyHomeDto.basicInfo.publicAnnouncementNumber);

            const documentSnapshot : DocumentSnapshot = await doc.get();

            await this.noticeCollection.doc(applyHomeDto.basicInfo.publicAnnouncementNumber).set({
                [NoticeDtoFields.noticeId] : applyHomeDto.basicInfo.publicAnnouncementNumber,
                [NoticeDtoFields.views] : 0,  //#. 조회수
                [NoticeDtoFields.likes] : 0,  //#. 좋아요
                [NoticeDtoFields.scraps] : 0, //#. 스크랩 수
                [NoticeDtoFields.houseName] : applyHomeDto.basicInfo.houseName, //#. 아파트 이름
                [NoticeDtoFields.subscriptionReceptionStartDate] : applyHomeDto.basicInfo.subscriptionReceptionStartDate,
                [NoticeDtoFields.recruitmentPublicAnnouncementDate] : applyHomeDto.basicInfo.recruitmentPublicAnnouncementDate,
                [NoticeDtoFields.supplyMethod] : supplyMethod,
                [NoticeDtoFields.info] :applyHomeDto.toMapWithTimeStamp(), //#. 공고
                [NoticeDtoFields.region] : null,
                [NoticeDtoFields.detailRegion] : null,
            });

            return {
                publicNoticeNumber : applyHomeDto.basicInfo.publicAnnouncementNumber,
                result : documentSnapshot.exists ? "updated" : "generated",
            };
        }catch(e){
            logger.error(e);
            return {
                publicNoticeNumber : applyHomeDto.basicInfo.publicAnnouncementNumber,
                result : e
            };
        }           
    }
}