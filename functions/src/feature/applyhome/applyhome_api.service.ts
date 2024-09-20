import { APTAnnouncement } from "../../model/apply_home_info/apt_announcement";
import { AptAnnouncementByHouseType } from "../../model/apply_home_info/apt_announcement_by_house_type";
import { applyhomeInfoDetailServiceKey } from "../../sucure/apply_home_info_detail.service_key";
import axios from "axios";
import { logger } from "firebase-functions/v1";

//TODO 오류 클래스화 하기
export class ApplyHommeApiService{

   /**
     * 	청약홈 분양정보 조회 서비스 API의 [APT 분양정보 상세조회] 로부터 APTAnnouncement : null 객체의 배열을 가져옵니다.
     *
     * 참고: API 응답 데이터의 개별 항목 처리 중 오류가 발생한 경우, 해당 항목에 대해서는 `null`이 반환됩니다.
     * 전체 함수의 예외 처리는 외부에서 처리해야 합니다.
     * 
     * @param {Date} startDate - 데이터 조회를 시작할 시각.
     * @returns {Promise<Array<APTAnnouncement | null>>} APTAnnouncement 객체 배열 또는 항목 처리 중 오류가 발생한 경우 `null`이 포함된 배열을 반환합니다.
     * 
     */
    async getAPTAnnouncementList(startDate: Date): Promise<Array<APTAnnouncement | null>> {
        //#. 현재 시간에서 fromDate만큼 이전의 데이터부터 가져옴

        const url = `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?` +
                    `page=1&` +
                    `perPage=500&` +
                    `cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${startDate.toISOString().split('T')[0]}&` +
                    `serviceKey=${applyhomeInfoDetailServiceKey}`;

        const response = await axios.get(url);

        //#. 상태 코드가 200이 아닌 경우
        if(response.status != 200){
            logger.error(`[ApplyHomeApiService.getAPTAnnouncementList()] 청약홈 API와 통신 불가 : ${response.status} , ${response.data}`);
            throw new Error(`청약홈 API 통신 오류: 상태 코드 ${response.status}`);
        }

        //#. 가져온 데이터가 배열이 아닌 경우
        if (!Array.isArray(response.data.data)) {
            logger.error(`[ApplyHomeApiService.getAPTAnnouncementList()] data가 Array가 아님 ${response.data.data}`);
            throw new Error(`청약홈 API 데이터 오류: data가 Array가 아님 ${response.data.data}`);
        }        

        //#. APTAnnouncement 배열로 만들어서 반환
        return response.data.data.map((item: any) => {
            try {
                return APTAnnouncement.fromMap(item);
            } catch (e) {
                logger.error(`[ApplyHomeApiService.getAPTAnnouncementList()] ${e}`);
                return null;
            }
        });
    }

    
    /**
     * 청약홈 분양정보 조회 서비스 API의 [APT 분양정보 주택형별 상세조회] 로부터 AptAnnouncementByHouseType | null 객체를 가져옵니다.
     * @param houseNumber 주택관리번호
     * @param announcementNumber 공고번호
     */
    async getAptAnnouncementByHouseTypeList(
        houseNumber : string,
        announcementNumber : string
    ) : Promise<Array<AptAnnouncementByHouseType | null>>{
        const url = `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancMdl?` +
                        `page=1&` +
                        `perPage=1&` +
                        `cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=${houseNumber}&` +
                        `cond%5BPBLANC_NO%3A%3AEQ%5D=${announcementNumber}&`+
                        `serviceKey=${applyhomeInfoDetailServiceKey}`;                        

        const response = await axios.get(url);

        //#. 상태 코드가 200이 아닌 경우
        if(response.status != 200){
            logger.error(`[ApplyHomeApiService.getAptAnnouncementByHouseType()] 청약홈 API와 통신 불가 : ${response.status} , ${response.data}`);
            throw new Error(`청약홈 API 통신 오류: 상태 코드 ${response.status}`);
        }

        //#. 가져온 데이터의 개수가 1보다 작은경우
        if(response.data.currentCount < 1){
            logger.error(`[ApplyHomeApiService.getAptAnnouncementByHouseType()] 결과가 1보다 작음 : ${response.data}`);
            throw new Error(`청약홈 API 데이터 오류 : 결과가 1보다 작음 ${response.data}`);
        }

         //#. 가져온 데이터가 배열이 아닌 경우
        if (!Array.isArray(response.data.data)) {
            logger.error(`[ApplyHomeApiService.getAptAnnouncementByHouseType()] data가 Array가 아님 ${response.data.data}`);
            throw new Error(`청약홈 API 데이터 오류: data가 Array가 아님 ${response.data.data}`);
        }

        return response.data.data.map((item : any) => {
            try{
                return AptAnnouncementByHouseType.fromMap(item);
            }catch(e){
                //#. 파싱 실패한 경우
                logger.error(`[ApplyHomeApiService.getAptAnnouncementByHouseType()] AptAnnouncementByHouseType 파싱 오류 : ${e}\n${item}`);
                return null;
            } 
        });
    }
   
}