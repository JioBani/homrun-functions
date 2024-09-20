import { DecodedIdToken } from "firebase-admin/auth";
import { NoticeReferences } from "./notice.refernces";
import { NoticeDtoFields } from "./value/notice_dto.fields";
import * as firebaseAdmin from 'firebase-admin';
import { CollectionReference, Timestamp } from "firebase-admin/firestore";
import { LikeFields } from "./value/like.fields";
import {  NotFoundError } from "../../error/http.error";
import { FieldValue } from 'firebase-admin/firestore';
import { APTAnnouncement } from "@/model/apply_home_info/apt_announcement";
import { NoticeDocumentResult } from "./model/notice_document_result";
import { ProcessedAPTAnnouncementByHouseType } from "@/model/apply_home_info/processed_apt_announcement_by_house_type";
import { AptAnnouncementByHouseType } from "@/model/apply_home_info/apt_announcement_by_house_type";
import { logger } from "firebase-functions/v1";
import { ApplyHommeApiService } from "../applyhome/applyhome_api.service";
export class NoticeService{

    private applyHomeApiService : ApplyHommeApiService = new ApplyHommeApiService();

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


    //#region #. 공고 문서 생성

    /**
     * 공고 문서를 생성하는 함수
     * 
     * @param noticeCollection - 파이어베이스 컬렉션 참조
     * @param aptAnnouncement - APT 분양 공고 객체 (null일 수 있음)
     * 
     * @returns 문서 생성 결과 객체 배열을 반환
     * 
     * - aptAnnouncement가 null이면 오류를 반환
     * - 주택 유형별 세부 정보를 가져온 후, 이를 가공하여 문서를 작성
     * - 파이어베이스에 문서를 저장하고 성공 여부를 반환
     * - 오류가 발생할 경우, 문서 생성 실패 결과를 반환
     */
    private async makeNoticeDocumentByAnnouncement(
        noticeCollection : CollectionReference, 
        aptAnnouncement : APTAnnouncement | null
    ) : Promise<NoticeDocumentResult>{

        //#. aptAnnouncement가 null이면 반환
        if(aptAnnouncement === null){
            return NoticeDocumentResult.fromAllFailure({
                noticeId : null,
                error : Error("[ApplyHomeApiService.makeNoticeDocument()] aptAnnouncement 가 null 임")
            });
        }

        //#. 문서가 있는지 확인
        const noticeId : string = aptAnnouncement.publicAnnouncementNumber;     
        const doc = await noticeCollection.doc(noticeId).get();
        const isDocExist = doc.exists;


        //#1. 주택 유형별 세부정보 가져오기
        let infoByHouseTypeList : Array<AptAnnouncementByHouseType | null> | null = null;

        try{
            infoByHouseTypeList  = await this.applyHomeApiService.getAptAnnouncementByHouseTypeList(
                aptAnnouncement.houseManageNumber,
                aptAnnouncement.publicAnnouncementNumber,
            );
        }catch(e){
            //#. 주택 유형별 세부정보를 가져오지 못했으면 데이터 없이 문서 만들기 진행
            logger.error(`[ApplyHomeApiService.makeNoticeDocument()] 주택 유형별 세부정보 가져오기 중 오류\n${e}`);
        }

        //#2. 주택 유형별 정보 가공 데이터 제작
        let processedByHouseType : ProcessedAPTAnnouncementByHouseType | null;

        if(!infoByHouseTypeList?.includes(null)){ //#. 유형별 정보 리스트에  null 이 없으면 제작
            processedByHouseType = ProcessedAPTAnnouncementByHouseType.fromData({
                announcementByHouseTypeList : infoByHouseTypeList as AptAnnouncementByHouseType[],
                totalSupplyHouseholdCount : aptAnnouncement.totalSupplyHouseholdCount
            });
        }
        else{ //#. 있으면 null
            processedByHouseType = null;
        }

        //#3. 파이어베이스에 업로드       
        try{
            await noticeCollection.doc(noticeId).set({
                [NoticeDtoFields.noticeId] : noticeId,
                [NoticeDtoFields.views] : 0,  //#. 조회수
                [NoticeDtoFields.likes] : 0,  //#. 좋아요
                [NoticeDtoFields.scraps] : 0, //#. 스크랩 수
                [NoticeDtoFields.houseName] : aptAnnouncement.houseName, //#. 아파트 이름
                [NoticeDtoFields.applicationReceptionStartDate] : aptAnnouncement.applicationReceptionStartDate,
                [NoticeDtoFields.recruitmentPublicAnnouncementDate] : aptAnnouncement.recruitmentPublicAnnouncementDate,
                [NoticeDtoFields.info] : aptAnnouncement.toMapWithNull(), //#. 공고
                [NoticeDtoFields.aptAnnouncementByTypeList] : infoByHouseTypeList?.map((e)=>e?.toMap()),
                [NoticeDtoFields.processedAPTAnnouncementByHouseType]  : processedByHouseType?.toMap() ?? null
            });

            //#. 결과 리턴
            return new NoticeDocumentResult({
                noticeId : noticeId,
                isSuccess : true,
                isGenerated : !isDocExist,
                isUpdated : isDocExist,
                isByHouseTypeInfoSuccess : !infoByHouseTypeList?.includes(null),
                isProcessedAPTAnnouncementByHouseTypeSuccess : processedByHouseType != null ? true : false,
                isProcessedAPTAnnouncementByHouseTypeHasCountError : processedByHouseType?.hasSupplyHouseholdsCountError ?? false
            });

        }catch(e){
            logger.error(`[NoticeService.makeNoticeDocument()] ${e}\n`);
            return NoticeDocumentResult.fromAllFailure({
                noticeId : noticeId,
                error : e
            });
        }
        
    } 


    /**
     *  2개월 전부터의 공고 문서를 생성하는 함수
     * 
     * @returns 공고 생성 결과에 대한 로그 메시지를 반환
     * 
     * - 현재로부터 두 달 전의 공고 데이터를 가져와서 각각 문서를 생성
     * - 각 공고에 대해 문서를 만들고, 결과를 수집한 후 로그를 생성하여 반환
     */
    async makeNoticeDocuments(){        
        const noticeCollection = NoticeReferences.getNoticeCollection();
        
        //#1. 공고 가져오기
        //#. 현재로부터 두달전의 공고부터 가져옴
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 2);
        
        let aptAnnouncementList : Array<APTAnnouncement  | null>;

        try{
            aptAnnouncementList  = await this.applyHomeApiService.getAPTAnnouncementList(currentDate); 
        }catch(e){
            //TODO 로깅
            throw e;
        }
       
        //#2. 가져온 공고마다 문서 만들기        
        const result : Array<NoticeDocumentResult> = await Promise.all<NoticeDocumentResult>(aptAnnouncementList.map((aptAnnouncement)=>
            this.makeNoticeDocumentByAnnouncement(noticeCollection , aptAnnouncement)
        ));

        //#3. 결과 로그 생성
        const resultLog = this.makeNoticeUpdateLog(
            result,
            aptAnnouncementList.length,
            currentDate.toISOString().split('T')[0]
        )

        logger.log(`[ApplyHomeApiService.makeNoticeDocuments()]\n${resultLog}`);    

        return resultLog;
    }


    /**
     * 공고 생성 결과 로그를 생성하는 함수
     * 
     * @param result - 각 공고 문서 생성에 대한 결과 리스트
     * @param totalCount - 총 공고 개수
     * @param startDateString - 공고 조회 시작 날짜 (포맷: YYYY-MM-DD)
     * 
     * @returns 업데이트 로그 객체 반환
     * 
     * - 실패한 공고 수, 추가된 문서 수, 업데이트된 문서 수 등 각종 통계 정보를 기반으로 로그를 생성
     */
    private makeNoticeUpdateLog(
        result : Array<NoticeDocumentResult> , 
        totalCount : number,
        startDateString : string
    ){
        let failure = 0;
        let generated = 0;
        let updated =  0;
        let byHouseTypeSuccess =  0;
        let isProcessedAPTAnnouncementByHouseTypeSuccess =  0;
        let isProcessedAPTAnnouncementByHouseTypeHasCountError =  0;

        result.map(e =>{
            if(!e.isSuccess){
                failure++;
            }

            if(e.isGenerated){
                generated++;
            }

            if(e.isUpdated){
                updated++;
            }

            if(e.isByHouseTypeInfoSuccess){
                byHouseTypeSuccess++;
            }

            if(e.isProcessedAPTAnnouncementByHouseTypeSuccess){
                isProcessedAPTAnnouncementByHouseTypeSuccess++;
            }

            if(e.isProcessedAPTAnnouncementByHouseTypeHasCountError){
                isProcessedAPTAnnouncementByHouseTypeHasCountError++;
            }
        });
        
        return {
            range: `~${startDateString}`,
            addedDocuments: `${generated} / ${totalCount}`,
            successRate: `${totalCount - failure} / ${totalCount}`,
            updatedDocuments: `${updated} / ${totalCount}`,
            byHouseTypeSuccessRate: `${byHouseTypeSuccess} / ${totalCount}`,
            processedSuccessRate: `${isProcessedAPTAnnouncementByHouseTypeSuccess} / ${totalCount}`,
            priceErrorRate: `${isProcessedAPTAnnouncementByHouseTypeHasCountError} / ${totalCount}`
        };
    }

    //#endregion
}