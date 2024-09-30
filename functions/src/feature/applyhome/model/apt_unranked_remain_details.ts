import { AptDetailsInfoFactory } from "../factory/apply_heme.factory";
import { ApplyHomeApiUrls } from "../value/apply_home_api_urls";
import { APTUnrankedRemainDetailByTypeFields as APTUnrankedRemainDetailsFields } from "../value/apt_unranked_remain__detail_by_type.fields";
import { AptBasicInfo, AptDetailsInfo} from "./apt.model";

/**
 * APT 무순위/잔여세대 분양정보 주택형별 상세정보를 나타내는 클래스.
 */
export class APTUnrankedRemainDetails implements AptDetailsInfo{
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
     * 모델 번호 (모델번호).
     * 항목구분: 옵션(0)
     */
    modelNumber: string | null;

    /**
     * 모델 타입 (모델타입).
     * 항목구분: 옵션(0)
     */
    houseType: string | null;

    /**
     * 공급 면적 (공급면적).
     * 항목구분: 옵션(0)
     */
    supplyArea: string | null;

    /**
     * 일반 공급 세대수 (일반공급세대수).
     * 항목구분: 옵션(0)
     */
    generalSupplyHouseholds: number | null;

    /**
     * 특별 공급 세대수 (특별공급세대수).
     * 항목구분: 옵션(0)
     */
    specialSupplyHouseholds: number | null;

    /**
     * 공급 금액 (분양최고금액) (단위: 만원).
     * 항목구분: 옵션(0)
     */
    topAmount: number | null;

    constructor(data: {
        houseManageNumber: string,
        publicAnnouncementNumber: string,
        modelNumber: string | null,
        houseType: string | null,
        supplyArea: string | null,
        generalSupplyHouseholds: number | null,
        specialSupplyHouseholds: number | null,
        topAmount: number | null,
    }) {
        this.houseManageNumber = data.houseManageNumber;
        this.publicNoticeNumber = data.publicAnnouncementNumber;
        this.modelNumber = data.modelNumber;
        this.houseType = data.houseType;
        this.supplyArea = data.supplyArea;
        this.generalSupplyHouseholds = data.generalSupplyHouseholds;
        this.specialSupplyHouseholds = data.specialSupplyHouseholds;
        this.topAmount = data.topAmount;
    }

    /**
     * 주어진 객체로부터 APTUnrankedRemainDetailByType 객체를 생성합니다.
     * @param map 객체로부터 데이터를 읽어와서 APTUnrankedRemainDetailByType 인스턴스를 생성합니다.
     * @returns APTUnrankedRemainDetailByType 인스턴스
     */
    static fromMap(map: { [key: string]: any }): APTUnrankedRemainDetails {
        return new APTUnrankedRemainDetails({
            houseManageNumber: map[APTUnrankedRemainDetailsFields.houseManageNumber],
            publicAnnouncementNumber: map[APTUnrankedRemainDetailsFields.publicAnnouncementNumber],
            modelNumber: map[APTUnrankedRemainDetailsFields.modelNumber] ?? null,
            houseType: map[APTUnrankedRemainDetailsFields.houseType] ?? null,
            supplyArea: map[APTUnrankedRemainDetailsFields.supplyArea] ?? null,
            generalSupplyHouseholds: map[APTUnrankedRemainDetailsFields.generalSupplyHouseholds] ?? null,
            specialSupplyHouseholds: map[APTUnrankedRemainDetailsFields.specialSupplyHouseholds] ?? null,
            topAmount: map[APTUnrankedRemainDetailsFields.topAmount] ?? null,
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
            modelNumber: this.modelNumber,
            houseType: this.houseType,
            supplyArea: this.supplyArea,
            generalSupplyHouseholds: this.generalSupplyHouseholds,
            specialSupplyHouseholds: this.specialSupplyHouseholds,
            topSupplyAmount: this.topAmount
        };
    }
}

export class APTUnrankedRemainDetailByTypeFactory implements AptDetailsInfoFactory<APTUnrankedRemainDetails>{
    fromMap(map: { [key: string]: any; }): APTUnrankedRemainDetails {
        return APTUnrankedRemainDetails.fromMap(map);
    }    

    getApiUrl(basicInfo: AptBasicInfo): string {
        return ApplyHomeApiUrls.getUnrankedRemainDetailByType(basicInfo);
    }
}