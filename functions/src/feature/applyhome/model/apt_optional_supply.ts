import { Timestamp } from "firebase-admin/firestore";
import { TimeFormatter } from "../../../utils/time_formatter";
import { APTOptionalSupplyFields } from "../value/apt_optional_supply.fields";
import { AptBasicInfo } from "./apt.model";
import { AptBasicInfoFactory } from "../factory/apply_heme.factory";
import { ApplyHomeApiUrls } from "../value/apply_home_api_urls";

/**
 * APT 임의공급 분양정보 상세정보를 나타내는 클래스.
 */
export class AptOptionalSupply implements AptBasicInfo {
    /**
     * 주택 관리 번호 (주택관리번호).
     * 항목구분: 옵션(0)
     */
    houseManageNumber: string;

    /**
     * 공고 번호 (공고번호).
     * 항목구분: 옵션(0)
     */
    publicAnnouncementNumber: string; // publicNoticeNumber -> publicAnnouncementNumber로 수정

    /**
     * 주택명 (주택명).
     * 항목구분: 옵션(0)
     */
    houseName: string | null;

    /**
     * 주택 구분 코드 (주택구분코드).
     * 항목구분: 옵션(0)
     */
    houseSectionCode: string | null;

    /**
     * 주택 구분 코드명 (주택구분코드명).
     * 항목구분: 옵션(0)
     */
    houseSectionName: string | null; // houseSectionCodeName -> houseSectionName으로 수정

    /**
     * 공급 위치 우편번호 (공급위치 우편번호).
     * 항목구분: 옵션(0)
     */
    supplyLocationZipCode: string | null;

    /**
     * 공급 위치 주소 (공급위치).
     * 항목구분: 옵션(0)
     */
    supplyLocationAddress: string | null;

    /**
     * 공급 규모 (공급규모).
     * 항목구분: 옵션(0)
     */
    totalSupplyHouseholdCount: number | null;

    /**
     * 모집 공고일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    recruitmentPublicAnnouncementDate: Timestamp | null;

    /**
     * 청약 접수 시작일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    subscriptionReceptionStartDate: Timestamp | null;

    /**
     * 청약 접수 종료일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    subscriptionReceptionEndDate: Timestamp | null;

    /**
     * 특별 공급 접수 시작일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    specialSupplyReceptionStartDate: Timestamp | null;

    /**
     * 특별 공급 접수 종료일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    specialSupplyReceptionEndDate: Timestamp | null;

    /**
     * 일반 공급 접수 시작일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    generalSupplyReceptionStartDate: Timestamp | null; // 일반공급접수 관련 필드는 APTAnnouncementFields에 없으므로 그대로 유지

    /**
     * 일반 공급 접수 종료일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    generalSupplyReceptionEndDate: Timestamp | null; // 일반공급접수 관련 필드는 APTAnnouncementFields에 없으므로 그대로 유지

    /**
     * 당첨자 발표일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    prizeWinnerAnnouncementDate: Timestamp | null; // winnerAnnouncementDate -> prizeWinnerAnnouncementDate로 수정

    /**
     * 계약 시작일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    contractConclusionStartDate: Timestamp | null; // contractStartDate -> contractConclusionStartDate로 수정

    /**
     * 계약 종료일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    contractConclusionEndDate: Timestamp | null; // contractEndDate -> contractConclusionEndDate로 수정

    /**
     * 홈페이지 주소 (홈페이지주소).
     * 항목구분: 옵션(0)
     */
    homepageAddress: string | null;

    /**
     * 사업 주체명 (사업주체명).
     * 항목구분: 옵션(0)
     */
    businessEntityName: string | null;

    /**
     * 문의처 (문의처).
     * 항목구분: 옵션(0)
     */
    inquiryTelephone: string | null; // inquiryPhoneNumber -> inquiryTelephone으로 수정

    /**
     * 입주 예정월 (입주예정월).
     * 항목구분: 옵션(0)
     */
    moveInPrearrangeYearMonth: string | null; // moveInPlannedYearMonth -> moveInPrearrangeYearMonth으로 수정


    constructor(data: {
        houseManageNumber: string,
        publicAnnouncementNumber: string,
        houseName: string | null,
        houseSectionCode: string | null,
        houseSectionName: string | null, // houseSectionCodeName -> houseSectionName으로 수정
        supplyLocationZipCode: string | null,
        supplyLocationAddress: string | null,
        totalSupplyHouseholdCount: number | null,
        recruitmentPublicAnnouncementDate: Timestamp | null,
        subscriptionReceptionStartDate: Timestamp | null,
        subscriptionReceptionEndDate: Timestamp | null,
        specialSupplyReceptionStartDate: Timestamp | null,
        specialSupplyReceptionEndDate: Timestamp | null,
        generalSupplyReceptionStartDate: Timestamp | null,
        generalSupplyReceptionEndDate: Timestamp | null,
        prizeWinnerAnnouncementDate: Timestamp | null, // winnerAnnouncementDate -> prizeWinnerAnnouncementDate로 수정
        contractConclusionStartDate: Timestamp | null, // contractStartDate -> contractConclusionStartDate로 수정
        contractConclusionEndDate: Timestamp | null, // contractEndDate -> contractConclusionEndDate로 수정
        homepageAddress: string | null,
        businessEntityName: string | null,
        inquiryTelephone: string | null, // inquiryPhoneNumber -> inquiryTelephone으로 수정
        moveInPrearrangeYearMonth: string | null, // moveInPlannedYearMonth -> moveInPrearrangeYearMonth으로 수정
    }) {
        this.houseManageNumber = data.houseManageNumber;
        this.publicAnnouncementNumber = data.publicAnnouncementNumber; // publicNoticeNumber -> publicAnnouncementNumber로 수정
        this.houseName = data.houseName;
        this.houseSectionCode = data.houseSectionCode;
        this.houseSectionName = data.houseSectionName; // 수정된 필드명 반영
        this.supplyLocationZipCode = data.supplyLocationZipCode;
        this.supplyLocationAddress = data.supplyLocationAddress;
        this.totalSupplyHouseholdCount = data.totalSupplyHouseholdCount;
        this.recruitmentPublicAnnouncementDate = data.recruitmentPublicAnnouncementDate;
        this.subscriptionReceptionStartDate = data.subscriptionReceptionStartDate;
        this.subscriptionReceptionEndDate = data.subscriptionReceptionEndDate;
        this.specialSupplyReceptionStartDate = data.specialSupplyReceptionStartDate;
        this.specialSupplyReceptionEndDate = data.specialSupplyReceptionEndDate;
        this.generalSupplyReceptionStartDate = data.generalSupplyReceptionStartDate;
        this.generalSupplyReceptionEndDate = data.generalSupplyReceptionEndDate;
        this.prizeWinnerAnnouncementDate = data.prizeWinnerAnnouncementDate; // 수정된 필드명 반영
        this.contractConclusionStartDate = data.contractConclusionStartDate; // 수정된 필드명 반영
        this.contractConclusionEndDate = data.contractConclusionEndDate; // 수정된 필드명 반영
        this.homepageAddress = data.homepageAddress;
        this.businessEntityName = data.businessEntityName;
        this.inquiryTelephone = data.inquiryTelephone; // 수정된 필드명 반영
        this.moveInPrearrangeYearMonth = data.moveInPrearrangeYearMonth; // 수정된 필드명 반영
    }
        

    /**
     * 주어진 객체로부터 APTOptionalSupply 객체를 생성합니다.
     * Firebase Timestamp로 변환할 수 있는 필드들은 TimeFormatter를 이용해 변환합니다.
     * @param map 객체로부터 데이터를 읽어와서 APTOptionalSupply 인스턴스를 생성합니다.
     * @returns APTOptionalSupply 인스턴스
     */
    static fromMap(map: { [key: string]: any }): AptOptionalSupply {
        //#. 임의공급의 날짜는 0000000형태의 문자열
        return new AptOptionalSupply({
            houseManageNumber: map[APTOptionalSupplyFields.houseManageNumber],
            publicAnnouncementNumber: map[APTOptionalSupplyFields.publicAnnouncementNumber],
            houseName: map[APTOptionalSupplyFields.houseName] ?? null,
            houseSectionCode: map[APTOptionalSupplyFields.houseSectionCode] ?? null,
            houseSectionName: map[APTOptionalSupplyFields.houseSectionName] ?? null, // houseSectionCodeName -> houseSectionName으로 수정
            supplyLocationZipCode: map[APTOptionalSupplyFields.supplyLocationZipCode] ?? null,
            supplyLocationAddress: map[APTOptionalSupplyFields.supplyLocationAddress] ?? null,
            totalSupplyHouseholdCount: map[APTOptionalSupplyFields.totalSupplyHouseholdCount] ?? null,
            recruitmentPublicAnnouncementDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.recruitmentPublicAnnouncementDate] as string) ?? null,
            subscriptionReceptionStartDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.subscriptionReceptionStartDate] as string) ?? null,
            subscriptionReceptionEndDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.subscriptionReceptionEndDate] as string) ?? null,
            specialSupplyReceptionStartDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.specialSupplyReceptionStartDate] as string) ?? null,
            specialSupplyReceptionEndDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.specialSupplyReceptionEndDate] as string) ?? null,
            generalSupplyReceptionStartDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.generalSupplyReceptionStartDate] as string) ?? null,
            generalSupplyReceptionEndDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.generalSupplyReceptionEndDate] as string) ?? null,
            prizeWinnerAnnouncementDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.prizeWinnerAnnouncementDate] as string) ?? null, // winnerAnnouncementDate -> prizeWinnerAnnouncementDate로 수정
            contractConclusionStartDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.contractConclusionStartDate] as string) ?? null, // contractStartDate -> contractConclusionStartDate로 수정
            contractConclusionEndDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.contractConclusionEndDate] as string) ?? null, // contractEndDate -> contractConclusionEndDate로 수정
            homepageAddress: map[APTOptionalSupplyFields.homepageAddress] ?? null,
            businessEntityName: map[APTOptionalSupplyFields.businessEntityName] ?? null,
            inquiryTelephone: map[APTOptionalSupplyFields.inquiryTelephone] ?? null, // inquiryPhoneNumber -> inquiryTelephone으로 수정
            moveInPrearrangeYearMonth: map[APTOptionalSupplyFields.moveInPrearrangeYearMonth] ?? null // moveInPlannedYearMonth -> moveInPrearrangeYearMonth으로 수정
        });
    }
}

export class AptOptionalSupplyFactory implements AptBasicInfoFactory<AptOptionalSupply>{
    fromMap(map: { [key: string]: any; }): AptOptionalSupply {
        return AptOptionalSupply.fromMap(map);
    }    

    getApiUrl(startDate: Date): string {
        return ApplyHomeApiUrls.getOptionalSupply(startDate);
    }
}