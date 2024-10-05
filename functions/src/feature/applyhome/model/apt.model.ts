import { Timestamp } from "firebase-admin/firestore";

export abstract class AptInfo{
    /**
     * 주택 관리 번호 (주택관리번호).
     * 항목구분: 옵션(0)
     */
    abstract houseManageNumber: string;

    /**
     * 공고 번호 (공고번호).
     * 항목구분: 옵션(0)
     */
    abstract publicAnnouncementNumber: string;
}

export interface AptBasicInfo extends AptInfo{
    totalSupplyHouseholdCount : number | null;

    /**
    * 주택명 (주택명).
    */
    houseName: string | null;

    /**
    * 모집 공고일 (Firebase Timestamp).
    */
    recruitmentPublicAnnouncementDate: Timestamp | null;

    /**
    * 청약 접수 시작일 (Firebase Timestamp).
    */
    subscriptionReceptionStartDate: Timestamp | null;

    /**
    * 청약 접수 종료일 (Firebase Timestamp).
    */
    subscriptionReceptionEndDate: Timestamp | null;
}


export interface AptDetailsInfo extends AptInfo{
      /**
     * 일반 공급 세대수 (일반공급세대수).
     * 항목구분: 옵션(0)
     */
    generalSupplyHouseholds?: number | null;

    /**
     * 특별 공급 세대수 (특별공급세대수).
     * 항목구분: 옵션(0)
     */
    specialSupplyHouseholds?: number | null;

    topAmount : number | null;
}