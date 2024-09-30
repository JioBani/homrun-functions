import { Timestamp } from "firebase-admin/firestore";
import { TimeFormatter } from "../../../utils/time_formatter";
import { APTOptionalSupplyFields } from "../value/apt_optional_supply.fields";
import { AptBasicInfo } from "./apt.model";
import { AptBasicInfoFactory } from "../factory/apply_heme.factory";
import { ApplyHomeApiUrls } from "../value/apply_home_api_urls";

/**
 * APT 임의공급 분양정보 상세정보를 나타내는 클래스.
 */
export class APTOptionalSupply implements AptBasicInfo{
    /**
     * 주택 관리 번호 (주택관리번호).
     * 항목구분: 옵션(0)
     */
    houseManageNumber: string;

    /**
     * 공고 번호 (공고번호).
     * 항목구분: 옵션(0)
     */
    publicNoticeNumber: string;

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
    houseSectionCodeName: string | null;

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
    generalSupplyReceptionStartDate: Timestamp | null;

    /**
     * 일반 공급 접수 종료일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    generalSupplyReceptionEndDate: Timestamp | null;

    /**
     * 당첨자 발표일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    winnerAnnouncementDate: Timestamp | null;

    /**
     * 계약 시작일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    contractStartDate: Timestamp | null;

    /**
     * 계약 종료일 (Firebase Timestamp).
     * 항목구분: 옵션(0)
     */
    contractEndDate: Timestamp | null;

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
    inquiryPhoneNumber: string | null;

    /**
     * 입주 예정월 (입주예정월).
     * 항목구분: 옵션(0)
     */
    moveInPlannedYearMonth: string | null;

    constructor(data: {
        houseManageNumber: string,
        publicAnnouncementNumber: string,
        houseName: string | null,
        houseSectionCode: string | null,
        houseSectionCodeName: string | null,
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
        winnerAnnouncementDate: Timestamp | null,
        contractStartDate: Timestamp | null,
        contractEndDate: Timestamp | null,
        homepageAddress: string | null,
        businessEntityName: string | null,
        inquiryPhoneNumber: string | null,
        moveInPlannedYearMonth: string | null,
    }) {
        this.houseManageNumber = data.houseManageNumber;
        this.publicNoticeNumber = data.publicAnnouncementNumber;
        this.houseName = data.houseName;
        this.houseSectionCode = data.houseSectionCode;
        this.houseSectionCodeName = data.houseSectionCodeName;
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
        this.winnerAnnouncementDate = data.winnerAnnouncementDate;
        this.contractStartDate = data.contractStartDate;
        this.contractEndDate = data.contractEndDate;
        this.homepageAddress = data.homepageAddress;
        this.businessEntityName = data.businessEntityName;
        this.inquiryPhoneNumber = data.inquiryPhoneNumber;
        this.moveInPlannedYearMonth = data.moveInPlannedYearMonth;
    }

    /**
     * 주어진 객체로부터 APTOptionalSupplyDetail 객체를 생성합니다.
     * Firebase Timestamp로 변환할 수 있는 필드들은 TimeFormatter를 이용해 변환합니다.
     * @param map 객체로부터 데이터를 읽어와서 APTOptionalSupplyDetail 인스턴스를 생성합니다.
     * @returns APTOptionalSupplyDetail 인스턴스
     */
    static fromMap(map: { [key: string]: any }): APTOptionalSupply {
        return new APTOptionalSupply({
            houseManageNumber: map[APTOptionalSupplyFields.houseManageNumber],
            publicAnnouncementNumber: map[APTOptionalSupplyFields.publicAnnouncementNumber],
            houseName: map[APTOptionalSupplyFields.houseName] ?? null,
            houseSectionCode: map[APTOptionalSupplyFields.houseSectionCode] ?? null,
            houseSectionCodeName: map[APTOptionalSupplyFields.houseSectionCodeName] ?? null,
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
            winnerAnnouncementDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.winnerAnnouncementDate] as string) ?? null,
            contractStartDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.contractStartDate] as string) ?? null,
            contractEndDate: TimeFormatter.tryStringToFirebaseTimestamp(map[APTOptionalSupplyFields.contractEndDate] as string) ?? null,
            homepageAddress: map[APTOptionalSupplyFields.homepageAddress] ?? null,
            businessEntityName: map[APTOptionalSupplyFields.businessEntityName] ?? null,
            inquiryPhoneNumber: map[APTOptionalSupplyFields.inquiryPhoneNumber] ?? null,
            moveInPlannedYearMonth: map[APTOptionalSupplyFields.moveInPlannedYearMonth] ?? null,
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
            moveInPlannedYearMonth: this.moveInPlannedYearMonth
        };
    }
}

export class APTOptionalSupplyFactory implements AptBasicInfoFactory<APTOptionalSupply>{
    fromMap(map: { [key: string]: any; }): APTOptionalSupply {
        return APTOptionalSupply.fromMap(map);
    }    

    getApiUrl(startDate: Date): string {
        return ApplyHomeApiUrls.getOptionalSupply(startDate);
    }
}