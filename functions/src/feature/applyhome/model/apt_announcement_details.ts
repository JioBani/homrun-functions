import { AptBasicInfo, AptDetailsInfo } from "./apt.model";
import { AptAnnouncementDetailsField } from "../value/apt_announcement_details.field";
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
    publicAnnouncementNumber: string;

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
        publicAnnouncementNumber: string,
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
        this.publicAnnouncementNumber = publicAnnouncementNumber;
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
            map[AptAnnouncementDetailsField.houseManageNumber] ?? null,
            map[AptAnnouncementDetailsField.publicAnnouncementNumber] ?? null,
            map[AptAnnouncementDetailsField.modelNumber] ?? null,
            map[AptAnnouncementDetailsField.houseType] ?? null,
            map[AptAnnouncementDetailsField.supplyArea] ?? null,
            map[AptAnnouncementDetailsField.generalSupplyHouseholds] ?? null,
            map[AptAnnouncementDetailsField.specialSupplyHouseholds] ?? null,
            map[AptAnnouncementDetailsField.multiChildHouseholds] ?? null,
            map[AptAnnouncementDetailsField.newlywedHouseholds] ?? null,
            map[AptAnnouncementDetailsField.firstTimeHouseholds] ?? null,
            map[AptAnnouncementDetailsField.elderlyParentSupportHouseholds] ?? null,
            map[AptAnnouncementDetailsField.institutionRecommendedHouseholds] ?? null,
            map[AptAnnouncementDetailsField.otherSpecialHouseholds] ?? null,
            map[AptAnnouncementDetailsField.relocatedInstitutionHouseholds] ?? null,
            map[AptAnnouncementDetailsField.youthHouseholds] ?? null,
            map[AptAnnouncementDetailsField.newbornHouseholds] ?? null,
            map[AptAnnouncementDetailsField.topAmount] != null ?
                 Number(map[AptAnnouncementDetailsField.topAmount]) : null
        );
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
