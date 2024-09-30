import { AptBasicInfo, AptDetailsInfo } from "./apt.model";
import { AptAnnouncementByHouseTypeField } from "../value/apt_announcement_by_house_type.field";
import { AptDetailsInfoFactory } from "../factory/apply_heme.factory";
import { ApplyHomeApiUrls } from "../value/apply_home_api_urls";

/**
 * 주택형별 분양정보를 나타내는 클래스.
 * 각 필드는 API 응답에 맞게 타입이 정의되며, null 가능성도 반영됩니다.
 */
export class AptAnnouncementDetails implements AptDetailsInfo{
    /**
     * 주택 관리 번호 (주택관리번호).
     */
    houseManageNumber: string;

    /**
     * 공고 번호 (공고번호).
     */
    publicNoticeNumber: string;

    /**
     * 모델 번호 (모델번호).
     */
    modelNumber: string | null;

    /**
     * 주택 형 (주택형).
     */
    houseType: string | null;

    /**
     * 공급 면적 (공급면적).
     */
    supplyArea: string | null;

    /**
     * 일반 공급 세대 수 (일반공급세대수).
     */
    generalSupplyHouseholds: number | null;

    /**
     * 특별 공급 세대 수 (특별공급세대수).
     */
    specialSupplyHouseholds: number | null;

    /**
     * 특별 공급 - 다자녀 가구 세대 수 (특별공급-다자녀가구 세대수).
     */
    multiChildHouseholds: number | null;

    /**
     * 특별 공급 - 신혼부부 세대 수 (특별공급-신혼부부 세대수).
     */
    newlywedHouseholds: number | null;

    /**
     * 특별 공급 - 생애 최초 세대 수 (특별공급-생애최초 세대수).
     */
    firstTimeHouseholds: number | null;

    /**
     * 특별 공급 - 노부모 부양 세대 수 (특별공급-노부모부양 세대수).
     */
    elderlyParentSupportHouseholds: number | null;

    /**
     * 특별 공급 - 기관 추천 세대 수 (특별공급-기관추천 세대수).
     */
    institutionRecommendedHouseholds: number | null;

    /**
     * 특별 공급 - 기타 세대 수 (특별공급-기타 세대수).
     */
    otherSpecialHouseholds: number | null;

    /**
     * 특별 공급 - 이전 기관 세대 수 (특별공급-이전기관 세대수).
     */
    relocatedInstitutionHouseholds: number | null;

    /**
     * 특별 공급 - 청년 세대 수 (특별공급-청년 세대수).
     */
    youthHouseholds: number | null;

    /**
     * 특별 공급 - 신생아 세대 수 (특별공급-신생아 세대수).
     */
    newbornHouseholds: number | null;

    /**
     * 공급 금액 (분양최고금액) (단위: 만원).
     */
    topAmount: number | null;

    

    constructor(
        houseManageNumber: string,
        publicNoticeNumber: string,
        modelNumber: string | null,
        houseType: string | null,
        supplyArea: string | null,
        generalSupplyHouseholds: number | null,
        specialSupplyHouseholds: number | null,
        multiChildHouseholds: number | null,
        newlywedHouseholds: number | null,
        firstTimeHouseholds: number | null,
        elderlyParentSupportHouseholds: number | null,
        institutionRecommendedHouseholds: number | null,
        otherSpecialHouseholds: number | null,
        relocatedInstitutionHouseholds: number | null,
        youthHouseholds: number | null,
        newbornHouseholds: number | null,
        topAmount: number | null
    ) {
        this.houseManageNumber = houseManageNumber;
        this.publicNoticeNumber = publicNoticeNumber;
        this.modelNumber = modelNumber;
        this.houseType = houseType;
        this.supplyArea = supplyArea;
        this.generalSupplyHouseholds = generalSupplyHouseholds;
        this.specialSupplyHouseholds = specialSupplyHouseholds;
        this.multiChildHouseholds = multiChildHouseholds;
        this.newlywedHouseholds = newlywedHouseholds;
        this.firstTimeHouseholds = firstTimeHouseholds;
        this.elderlyParentSupportHouseholds = elderlyParentSupportHouseholds;
        this.institutionRecommendedHouseholds = institutionRecommendedHouseholds;
        this.otherSpecialHouseholds = otherSpecialHouseholds;
        this.relocatedInstitutionHouseholds = relocatedInstitutionHouseholds;
        this.youthHouseholds = youthHouseholds;
        this.newbornHouseholds = newbornHouseholds;
        this.topAmount = topAmount;
    }

    
    /**
     * 주어진 객체로부터 AptAnnouncementByHouseType 객체를 생성합니다.
     * @param map 객체로부터 데이터를 읽어와서 AptAnnouncementByHouseType 인스턴스를 생성합니다.
     * @returns AptAnnouncementByHouseType 인스턴스
     */
    static fromMap(map: { [key: string]: any }): AptAnnouncementDetails {
        return new AptAnnouncementDetails(
            map[AptAnnouncementByHouseTypeField.houseManageNumber] ?? null,
            map[AptAnnouncementByHouseTypeField.publicNoticeNumber] ?? null,
            map[AptAnnouncementByHouseTypeField.modelNumber] ?? null,
            map[AptAnnouncementByHouseTypeField.houseType] ?? null,
            map[AptAnnouncementByHouseTypeField.supplyArea] ?? null,
            map[AptAnnouncementByHouseTypeField.generalSupplyHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.specialSupplyHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.multiChildHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.newlywedHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.firstTimeHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.elderlyParentSupportHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.institutionRecommendedHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.otherSpecialHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.relocatedInstitutionHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.youthHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.newbornHouseholds] ?? null,
            map[AptAnnouncementByHouseTypeField.topAmount] ?? null
        );
    }

    
    /**
     * AptAnnouncementByHouseType 객체를 맵 형태로 변환합니다.
     * @returns 필드명이 키로, 값이 해당 필드의 값으로 구성된 객체
     */
    toMap(): { [key: string]: any } {
        return {
            houseManageNumber: this.houseManageNumber,
            publicNoticeNumber: this.publicNoticeNumber,
            modelNumber: this.modelNumber,
            houseType: this.houseType,
            supplyArea: this.supplyArea,
            generalSupplyHouseholds: this.generalSupplyHouseholds,
            specialSupplyHouseholds: this.specialSupplyHouseholds,
            multiChildHouseholds: this.multiChildHouseholds,
            newlywedHouseholds: this.newlywedHouseholds,
            firstTimeHouseholds: this.firstTimeHouseholds,
            elderlyParentSupportHouseholds: this.elderlyParentSupportHouseholds,
            institutionRecommendedHouseholds: this.institutionRecommendedHouseholds,
            otherSpecialHouseholds: this.otherSpecialHouseholds,
            relocatedInstitutionHouseholds: this.relocatedInstitutionHouseholds,
            youthHouseholds: this.youthHouseholds,
            newbornHouseholds: this.newbornHouseholds,
            highestSupplyPrice: this.topAmount,
        };
    }
}

export class AptAnnouncementDetailsFactory implements AptDetailsInfoFactory<AptAnnouncementDetails>{
    fromMap(map: { [key: string]: any; }): AptAnnouncementDetails {
        return AptAnnouncementDetails.fromMap(map);
    }    

    getApiUrl(basicInfo: AptBasicInfo): string {
        return ApplyHomeApiUrls.getAptAnnouncementDetails(basicInfo);
    }
}
