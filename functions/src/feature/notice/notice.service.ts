import { DecodedIdToken } from "firebase-admin/auth";
import { NoticeReferences } from "./notice.refernces";
import { NoticeDtoFields } from "./value/notice_dto.fields";
import * as firebaseAdmin from 'firebase-admin';
import { CollectionReference, Timestamp } from "firebase-admin/firestore";
import axios from 'axios';
import { APTAnnouncementFields } from "./value/apt_announcement.fields";
import { logger } from "firebase-functions";
import { NoticeDocumentResult } from "./model/notice_document_result";
import { applyhomeInfoDetailServiceKey } from "../../sucure/apply_home_info_detail.service_key";
import { LikeFields } from "./value/like.fields";
import {  NotFoundError } from "../../error/http.error";
import { FieldValue } from 'firebase-admin/firestore';
import { APTAnnouncement } from "../../model/apt_announcement";

export class NoticeService{
       

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
    

    async makeNoticeDocuments(){
        try {
            const currentDate = new Date();
            currentDate.setMonth(currentDate.getMonth() - 2);
            const formattedDate = currentDate.toISOString().split('T')[0];
            const url = `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?` +
                        `page=1&` +
                        `perPage=500&` +
                        `cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${formattedDate}&` +
                        `serviceKey=${applyhomeInfoDetailServiceKey}`;

            const response = await axios.get(url);

            const data = response.data.data;

            const noticeCollection = NoticeReferences.getNoticeCollection();

            var failure = 0;
            var generated = 0;
            
            await Promise.all<NoticeDocumentResult>(data.map(async (item: any) => {
                const result = await this.makeNoticeDocument(noticeCollection , item);
                if(!result.isSuccess){
                    failure++;
                }

                if(result.isGenerated){
                    generated++;
                }
            }))           
       

            logger.log(`
                APT 분양 공고 정보 업데이트 완료\n
                범위 : ~${formattedDate}\n
                성공률 : ${response.data["currentCount"] - failure} / ${response.data["currentCount"]}\n
                추가된 문서 수 : ${generated}\n
            `)

        } catch (error) {
            logger.error('Unexpected error:', error);
            throw error;
        }         
    }

    private async makeNoticeDocument(noticeCollection : CollectionReference , item : any) : Promise<NoticeDocumentResult>{
        const noticeId = item[APTAnnouncementFields.publicAnnouncementNumber];
        
        try{

            const doc = await noticeCollection.doc(noticeId).get();

            if(doc.exists){
                return new NoticeDocumentResult({
                    noticeId : noticeId,
                    isSuccess : true,
                    isGenerated : false,
                });
            }
            else{
                await noticeCollection.doc(noticeId).set({
                    [NoticeDtoFields.noticeId] : noticeId,
                    [NoticeDtoFields.views] : 0,
                    [NoticeDtoFields.likes] : 0,
                    [NoticeDtoFields.scraps] : 0,
                    [NoticeDtoFields.houseName] : item[APTAnnouncementFields.houseName],
                    [NoticeDtoFields.applicationReceptionStartDate] : 
                        this.convertStringToTimestamp(item[APTAnnouncementFields.applicationReceptionStartDate]),
                    [NoticeDtoFields.recruitmentPublicAnnouncementDate] : 
                        this.convertStringToTimestamp(item[APTAnnouncementFields.recruitmentPublicAnnouncementDate]),
                    [NoticeDtoFields.info] : APTAnnouncement.fromMap(item).toMapWithNull()
                });

                return new NoticeDocumentResult({
                    noticeId : noticeId,
                    isSuccess : true,
                    isGenerated : true,
                });
            }
        }catch(e){
            logger.error(`[NoticeService.makeNoticeDocument()] ${e}\n`);
            return new NoticeDocumentResult({
                noticeId : noticeId,
                isSuccess : false,
                isGenerated : false,
                error : e
            });
        }
        
    }

    private checkIsDocumentNotFoundError(e : any) : boolean{
        if (e instanceof Error && 'code' in e && (e as any).code === 5) {
            return true;
        } 
        else{
            return false;
        }
    }

    //TODO utills로 옮겨야 할 수도
    //TODO 공고 날짜가 없는 경우 어떻게 처리할지 - 현재 timestamp = 0으로 처리하는건 별로인듯
    private convertStringToTimestamp(dateString: string): Timestamp {
        try {

          // 날짜 문자열이 올바른 형식인지 확인
          const dateParts = dateString.split('-');
          if (dateParts.length !== 3) {
            throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
          }
      
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1;
          const day = parseInt(dateParts[2], 10);
      
          // 유효한 날짜인지 확인
          if (isNaN(year) || isNaN(month) || isNaN(day)) {
            throw new Error('Invalid date components. Ensure the date string is in the correct format: YYYY-MM-DD');
          }
      
          const date = new Date(year, month, day);
      
          if (isNaN(date.getTime())) {
            throw new Error('Invalid date. Unable to create a valid Date object.');
          }
      
          return Timestamp.fromDate(date);
        } catch (error) {
          console.error('Error converting string to Timestamp:', error);
          // 유효하지 않은 경우 Timestamp 0 반환
          return Timestamp.fromDate(new Date(0));
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

    /**
     * 청약홈 API에서 주택형별 APT 분양 상세정보를 가져옵니다.
     * @param houseNumber 주택관리번호
     * @param announcementNumber 공고번호
     */
    async getAptAnnouncementByHouseType(
        houseNumber : string,
        announcementNumber : string
    ) : Promise<AptAnnouncementByHouseType | null>{
        try {
            const url = `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancMdl?` +
                        `page=1&` +
                        `perPage=1&` +
                        `cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=${houseNumber}&` +
                        `cond%5BPBLANC_NO%3A%3AEQ%5D=${announcementNumber}&`+
                        `serviceKey=${applyhomeInfoDetailServiceKey}`;                        

            const response = await axios.get(url);

            //#. 상태 코드가 200이 아닌 경우
            if(response.status != 200){
                logger.error(`[NoticeService.getAptAnnouncementByHouseType()] 청약홈 API와 통신 불가 : ${response.status} , ${response.data}`);
                return null;
            }

            const data = response.data.data;

            //#. 가져온 데이터의 개수가 1보다 작은경우
            if(data['currentCount'] < 1){
                logger.error(`[NoticeService.getAptAnnouncementByHouseType()] 결과가 1보다 작음 : ${data}`);
                return null;
            }

            //#. 파싱
            try{
                return AptAnnouncementByHouseType.fromMap(data[0]);
            }catch(e){
                //#. 파싱 실패한 경우
                logger.error(`[NoticeService.getAptAnnouncementByHouseType()] AptAnnouncementByHouseType 파싱 오류 : ${e}`);
                logger.error(`[NoticeService.getAptAnnouncementByHouseType()] AptAnnouncementByHouseType 응답 : ${data}`);
                return null;
            }     

        } catch (error) {
            logger.error('[NoticeService.getAptAnnouncementByHouseType()] Unexpected error:', error);
            return null;
        }  
    }

}