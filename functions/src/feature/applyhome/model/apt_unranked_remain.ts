import { TimeFormatter } from "../../../utils/time_formatter";
import { APTUnrankedRemainFields as APTUnrankedRemainFields } from "../value/apt_unranked_remain.fields";
import { Timestamp } from "firebase-admin/firestore";
import { AptBasicInfo} from "./apt.model";
import { ApplyHomeApiName, ApplyHomeApiUrls } from "../value/apply_home_api_urls";
import { AptBasicInfoFactory } from "../factory/apply_heme.factory";

/**
 * APT 무순위/잔여세대 분양정보를 나타내는 클래스.
 * 각 필드는 API 응답에 맞게 타입이 정의되며, Firebase Timestamp 타입을 사용합니다.
 */
export class APTUnrankedRemain implements AptBasicInfo {
    /**
     * 주택 관리 번호 (주택관리번호).
     */
    houseManageNumber: string;

    /**
     * 공고 번호 (공고번호).
     */
    publicNoticeNumber: string;

    /**
     * 주택명 (주택명).
     */
    houseName: string | null;

    /**
     * 주택 구분 코드 (주택구분코드).
     */
    houseSectionCode: string | null;

    /**
     * 주택 구분 코드명 (주택구분코드명).
     */
    houseSectionCodeName: string | null;

    /**
     * 공급 위치 우편번호 (공급위치 우편번호).
     */
    supplyLocationZipCode: string | null;

    /**
     * 공급 위치 주소 (공급위치).
     */
    supplyLocationAddress: string | null;

    /**
     * 공급 규모 (공급규모).
     */
    totalSupplyHouseholdCount: number;

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

    /**
     * 특별 공급 접수 시작일 (Firebase Timestamp).
     */
    specialSupplyReceptionStartDate: Timestamp | null;

    /**
     * 특별 공급 접수 종료일 (Firebase Timestamp).
     */
    specialSupplyReceptionEndDate: Timestamp | null;

    /**
     * 일반 공급 접수 시작일 (Firebase Timestamp).
     */
    generalSupplyReceptionStartDate: Timestamp | null;

    /**
     * 일반 공급 접수 종료일 (Firebase Timestamp).
     */
    generalSupplyReceptionEndDate: Timestamp | null;

    /**
     * 당첨자 발표일 (Firebase Timestamp).
     */
    winnerAnnouncementDate: Timestamp | null;

    /**
     * 계약 시작일 (Firebase Timestamp).
     */
    contractStartDate: Timestamp | null;

    /**
     * 계약 종료일 (Firebase Timestamp).
     */
    contractEndDate: Timestamp | null;

    /**
     * 홈페이지 주소 (홈페이지주소).
     */
    homepageAddress: string | null;

    /**
     * 사업 주체명 (사업주체명).
     */
    businessEntityName: string | null;

    /**
     * 문의처 (문의처).
     */
    inquiryPhoneNumber: string | null;

    /**
     * 입주 예정월 (입주예정월).
     */
    moveInPlannedYearMonth: string | null;

    /**
     * 분양정보 URL (분양정보 URL).
     */
    announcementUrl: string | null;

    constructor(data : {
        houseManageNumber: string,
        publicAnnouncementNumber: string,
        totalSupplyHouseholdCount: number,
        houseName: string | null,
        houseSectionCode: string | null,
        houseSectionCodeName: string | null,
        supplyLocationZipCode: string | null,
        supplyLocationAddress: string | null,
        recruitmentPublicAnnouncementDate: Timestamp | null,
        subscriptionReceptionStartDate: Timestamp | null,
        subscriptionReceptionEndDate: Timestamp | null,
        specialSupplyReceptionStartDate: Timestamp | null,
        specialSupplyReceptionEndDate: Timestamp | null,
        generalSupplyReceptionStartDate: Timestamp | null,
        generalSupplyReceptionEndDate: Timestamp | null,
        winnerAnnouncementDate: Timestamp | null,
        contractStartDate: Timestamp | null,
        contractEndDate: Timestamp | null,
        homepageAddress: string | null,
        businessEntityName: string | null,
        inquiryPhoneNumber: string | null,
        moveInPlannedYearMonth: string | null,
        announcementUrl: string | null
    }) {
        this.houseManageNumber = data.houseManageNumber;
        this.publicNoticeNumber = data.publicAnnouncementNumber;
        this.totalSupplyHouseholdCount = data.totalSupplyHouseholdCount;
        this.houseName = data.houseName;
        this.houseSectionCode = data.houseSectionCode;
        this.houseSectionCodeName = data.houseSectionCodeName;
        this.supplyLocationZipCode = data.supplyLocationZipCode;
        this.supplyLocationAddress = data.supplyLocationAddress;
        this.recruitmentPublicAnnouncementDate = data.recruitmentPublicAnnouncementDate;
        this.subscriptionReceptionStartDate = data.subscriptionReceptionStartDate;
        this.subscriptionReceptionEndDate = data.subscriptionReceptionEndDate;
        this.specialSupplyReceptionStartDate = data.specialSupplyReceptionStartDate;
        this.specialSupplyReceptionEndDate = data.specialSupplyReceptionEndDate;
        this.generalSupplyReceptionStartDate = data.generalSupplyReceptionStartDate;
        this.generalSupplyReceptionEndDate = data.generalSupplyReceptionEndDate;
        this.winnerAnnouncementDate = data.winnerAnnouncementDate;
        this.contractStartDate = data.contractStartDate;
        this.contractEndDate = data.contractEndDate;
        this.homepageAddress = data.homepageAddress;
        this.businessEntityName = data.businessEntityName;
        this.inquiryPhoneNumber = data.inquiryPhoneNumber;
        this.moveInPlannedYearMonth = data.moveInPlannedYearMonth;
        this.announcementUrl = data.announcementUrl;
    }

    getApiName(): ApplyHomeApiName {
        return ApplyHomeApiName.UnrankedRemain;
    }
    
    /**
     * 주어진 객체로부터 APTUnrankedRemainHouseDetail 객체를 생성합니다.
     * Firebase Timestamp로 변환할 수 있는 필드들은 TimeFormatter를 이용해 변환합니다.
     * @param map 객체로부터 데이터를 읽어와서 APTUnrankedRemainHouseDetail 인스턴스를 생성합니다.
     * @returns APTUnrankedRemainHouseDetail 인스턴스
     */
    static fromMap(map: { [key: string]: any }): APTUnrankedRemain {
        return new APTUnrankedRemain({
            houseManageNumber: map[APTUnrankedRemainFields.houseManageNumber],
            publicAnnouncementNumber: map[APTUnrankedRemainFields.publicAnnouncementNumber],
            houseName: map[APTUnrankedRemainFields.houseName] ?? null,
            houseSectionCode: map[APTUnrankedRemainFields.houseSectionCode] ?? null,
            houseSectionCodeName: map[APTUnrankedRemainFields.houseSectionCodeName] ?? null,
            supplyLocationZipCode: map[APTUnrankedRemainFields.supplyLocationZipCode] ?? null,
            supplyLocationAddress: map[APTUnrankedRemainFields.supplyLocationAddress] ?? null,
            totalSupplyHouseholdCount: map[APTUnrankedRemainFields.totalSupplyHouseholdCount],
            recruitmentPublicAnnouncementDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.recruitmentPublicAnnouncementDate] as string) ?? null,
            subscriptionReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.subscriptionReceptionStartDate] as string) ?? null,
            subscriptionReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.subscriptionReceptionEndDate] as string) ?? null,
            specialSupplyReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.specialSupplyReceptionStartDate] as string) ?? null,
            specialSupplyReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.specialSupplyReceptionEndDate] as string)?? null,
            generalSupplyReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.generalSupplyReceptionStartDate] as string) ?? null,
            generalSupplyReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.generalSupplyReceptionEndDate] as string) ?? null,
            winnerAnnouncementDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.winnerAnnouncementDate] as string) ?? null,
            contractStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.contractStartDate] as string) ?? null,
            contractEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.contractEndDate] as string) ?? null,
            homepageAddress: map[APTUnrankedRemainFields.homepageAddress] ?? null,
            businessEntityName: map[APTUnrankedRemainFields.businessEntityName] ?? null,
            inquiryPhoneNumber: map[APTUnrankedRemainFields.inquiryPhoneNumber] ?? null,
            moveInPlannedYearMonth: map[APTUnrankedRemainFields.moveInPlannedYearMonth] ?? null,
            announcementUrl: map[APTUnrankedRemainFields.announcementUrl] ?? null,
        });
    }

    /**
     * 현재 객체를 맵으로 변환합니다.
     * @returns 객체의 데이터가 담긴 맵
     */
    toMap(): { [key: string]: any } {
        return {
            houseManageNumber: this.houseManageNumber,
            publicAnnouncementNumber: this.publicNoticeNumber,
            houseName: this.houseName,
            houseSectionCode: this.houseSectionCode,
            houseSectionCodeName: this.houseSectionCodeName,
            supplyLocationZipCode: this.supplyLocationZipCode,
            supplyLocationAddress: this.supplyLocationAddress,
            totalSupplyHouseholdCount: this.totalSupplyHouseholdCount,
            recruitmentPublicAnnouncementDate: this.recruitmentPublicAnnouncementDate,
            subscriptionReceptionStartDate: this.subscriptionReceptionStartDate,
            subscriptionReceptionEndDate: this.subscriptionReceptionEndDate,
            specialSupplyReceptionStartDate: this.specialSupplyReceptionStartDate,
            specialSupplyReceptionEndDate: this.specialSupplyReceptionEndDate,
            generalSupplyReceptionStartDate: this.generalSupplyReceptionStartDate,
            generalSupplyReceptionEndDate: this.generalSupplyReceptionEndDate,
            winnerAnnouncementDate: this.winnerAnnouncementDate,
            contractStartDate: this.contractStartDate,
            contractEndDate: this.contractEndDate,
            homepageAddress: this.homepageAddress,
            businessEntityName: this.businessEntityName,
            inquiryPhoneNumber: this.inquiryPhoneNumber,
            moveInPlannedYearMonth: this.moveInPlannedYearMonth,
            announcementUrl: this.announcementUrl
        };
    }
}


export class APTUnrankedRemainFactory implements AptBasicInfoFactory<APTUnrankedRemain>{
    fromMap(map: { [key: string]: any; }): APTUnrankedRemain {
        return APTUnrankedRemain.fromMap(map);
    }    

    getApiUrl(startDate: Date): string {
        return ApplyHomeApiUrls.getUnrankedRemain(startDate);
    }
}
