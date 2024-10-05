import { TimeFormatter } from "../../../utils/time_formatter";
import { APTUnrankedRemainFields as APTUnrankedRemainFields } from "../value/apt_unranked_remain.fields";
import { Timestamp } from "firebase-admin/firestore";
import { AptBasicInfo} from "./apt.model";
import { ApplyHomeApiUrls } from "../value/apply_home_api_urls";
import { AptBasicInfoFactory } from "../factory/apply_heme.factory";

export class AptUnrankedRemain implements AptBasicInfo {
    /**
     * 주택 관리 번호 (주택관리번호).
     */
    houseManageNumber: string;

    /**
     * 공고 번호 (공고번호).
     */
    publicAnnouncementNumber: string;

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
    houseSectionName: string | null;

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
    totalSupplyHouseholdCount: number | null;

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
     */
    prizeWinnerAnnouncementDate: Timestamp | null;

    /**
     * 계약 시작일 (Firebase Timestamp).
     */
    contractConclusionStartDate: Timestamp | null;

    /**
     * 계약 종료일 (Firebase Timestamp).
     */
    contractConclusionEndDate: Timestamp | null;

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
    inquiryTelephone: string | null;

    /**
     * 입주 예정월 (입주예정월).
     */
    moveInPrearrangeYearMonth: string | null;

    /**
     * 분양정보 URL (분양정보 URL).
     */
    publicAnnouncementUrl: string | null;

    constructor(data: {
        houseManageNumber: string,
        publicAnnouncementNumber: string,
        totalSupplyHouseholdCount: number,
        houseName: string | null,
        houseSectionCode: string | null,
        houseSectionName: string | null,
        supplyLocationZipCode: string | null,
        supplyLocationAddress: string | null,
        recruitmentPublicAnnouncementDate: Timestamp | null,
        subscriptionReceptionStartDate: Timestamp | null,
        subscriptionReceptionEndDate: Timestamp | null,
        specialSupplyReceptionStartDate: Timestamp | null,
        specialSupplyReceptionEndDate: Timestamp | null,
        generalSupplyReceptionStartDate : Timestamp | null,
        generalSupplyReceptionEndDate : Timestamp| null,
        prizeWinnerAnnouncementDate: Timestamp | null,
        contractConclusionStartDate: Timestamp | null,
        contractConclusionEndDate: Timestamp | null,
        homepageAddress: string | null,
        businessEntityName: string | null,
        inquiryTelephone: string | null,
        moveInPrearrangeYearMonth: string | null,
        publicAnnouncementUrl: string | null
    }) {
        this.houseManageNumber = data.houseManageNumber;
        this.publicAnnouncementNumber = data.publicAnnouncementNumber;
        this.totalSupplyHouseholdCount = data.totalSupplyHouseholdCount;
        this.houseName = data.houseName;
        this.houseSectionCode = data.houseSectionCode;
        this.houseSectionName = data.houseSectionName;
        this.supplyLocationZipCode = data.supplyLocationZipCode;
        this.supplyLocationAddress = data.supplyLocationAddress;
        this.recruitmentPublicAnnouncementDate = data.recruitmentPublicAnnouncementDate;
        this.subscriptionReceptionStartDate = data.subscriptionReceptionStartDate;
        this.subscriptionReceptionEndDate = data.subscriptionReceptionEndDate;
        this.specialSupplyReceptionStartDate = data.specialSupplyReceptionStartDate;
        this.specialSupplyReceptionEndDate = data.specialSupplyReceptionEndDate;
        this.generalSupplyReceptionStartDate = data.generalSupplyReceptionStartDate;
        this.generalSupplyReceptionEndDate = data.generalSupplyReceptionEndDate;
        this.prizeWinnerAnnouncementDate = data.prizeWinnerAnnouncementDate;
        this.contractConclusionStartDate = data.contractConclusionStartDate;
        this.contractConclusionEndDate = data.contractConclusionEndDate;
        this.homepageAddress = data.homepageAddress;
        this.businessEntityName = data.businessEntityName;
        this.inquiryTelephone = data.inquiryTelephone;
        this.moveInPrearrangeYearMonth = data.moveInPrearrangeYearMonth;
        this.publicAnnouncementUrl = data.publicAnnouncementUrl;
    }

    static fromMap(map: { [key: string]: any }): AptUnrankedRemain {
        return new AptUnrankedRemain({
            houseManageNumber: map[APTUnrankedRemainFields.houseManageNumber],
            publicAnnouncementNumber: map[APTUnrankedRemainFields.publicAnnouncementNumber],
            houseName: map[APTUnrankedRemainFields.houseName] ?? null,
            houseSectionCode: map[APTUnrankedRemainFields.houseSectionCode] ?? null,
            houseSectionName: map[APTUnrankedRemainFields.houseSectionName] ?? null,
            supplyLocationZipCode: map[APTUnrankedRemainFields.supplyLocationZipCode] ?? null,
            supplyLocationAddress: map[APTUnrankedRemainFields.supplyLocationAddress] ?? null,
            totalSupplyHouseholdCount: map[APTUnrankedRemainFields.totalSupplyHouseholdCount] ?? null,
            recruitmentPublicAnnouncementDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.recruitmentPublicAnnouncementDate] as string) ?? null,
            subscriptionReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.subscriptionReceptionStartDate] as string) ?? null,
            subscriptionReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.subscriptionReceptionEndDate] as string) ?? null,
            specialSupplyReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.specialSupplyReceptionStartDate] as string) ?? null,
            specialSupplyReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.specialSupplyReceptionEndDate] as string) ?? null,
            generalSupplyReceptionStartDate : TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.generalSupplyReceptionStartDate] as string) ?? null,
            generalSupplyReceptionEndDate : TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.generalSupplyReceptionEndDate] as string) ?? null,
            prizeWinnerAnnouncementDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.prizeWinnerAnnouncementDate] as string) ?? null,
            contractConclusionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.contractConclusionStartDate] as string) ?? null,
            contractConclusionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTUnrankedRemainFields.contractConclusionEndDate] as string) ?? null,
            homepageAddress: map[APTUnrankedRemainFields.homepageAddress] ?? null,
            businessEntityName: map[APTUnrankedRemainFields.businessEntityName] ?? null,
            inquiryTelephone: map[APTUnrankedRemainFields.inquiryTelephone] ?? null,
            moveInPrearrangeYearMonth: map[APTUnrankedRemainFields.moveInPrearrangeYearMonth] ?? null,
            publicAnnouncementUrl: map[APTUnrankedRemainFields.publicAnnouncementUrl] ?? null,
        });
    }
}

export class AptUnrankedRemainFactory implements AptBasicInfoFactory<AptUnrankedRemain> {
    fromMap(map: { [key: string]: any }): AptUnrankedRemain {
        return AptUnrankedRemain.fromMap(map);
    }

    getApiUrl(startDate: Date): string {
        return ApplyHomeApiUrls.getUnrankedRemain(startDate);
    }
}
