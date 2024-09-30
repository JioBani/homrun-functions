import { AptDetailsInfoFactory } from "../factory/apply_heme.factory";
import { ApplyHomeApiUrls } from "../value/apply_home_api_urls";
import { APTOptionalSupplyDetailByTypeFields as APTOptionalSupplyDetailsFields } from "../value/apt_optional_supply_detail_by_type.fields";
import { AptBasicInfo, AptDetailsInfo } from "./apt.model";

/**
 * APT 임의공급 분양정보 주택형별 정보를 나타내는 클래스.
 */
export class APTOptionalSupplyDetails implements AptDetailsInfo{
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
     * 주택형 (주택형).
     * 항목구분: 옵션(0)
     */
    houseType: string | null;

    /**
     * 일반 공급 세대수 (일반공급세대수).
     * 항목구분: 옵션(0)
     */
    generalSupplyHouseholds: number | null;

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
        generalSupplyHouseholds: number | null,
        topAmount: number | null,
    }) {
        this.houseManageNumber = data.houseManageNumber;
        this.publicNoticeNumber = data.publicAnnouncementNumber;
        this.modelNumber = data.modelNumber;
        this.houseType = data.houseType;
        this.generalSupplyHouseholds = data.generalSupplyHouseholds;
        this.topAmount = data.topAmount;
    }

    /**
     * 주어진 객체로부터 APTOptionalSupplyByType 객체를 생성합니다.
     * @param map 객체로부터 데이터를 읽어와서 APTOptionalSupplyByType 인스턴스를 생성합니다.
     * @returns APTOptionalSupplyByType 인스턴스
     */
    static fromMap(map: { [key: string]: any }): APTOptionalSupplyDetails {
        return new APTOptionalSupplyDetails({
            houseManageNumber: map[APTOptionalSupplyDetailsFields.houseManageNumber],
            publicAnnouncementNumber: map[APTOptionalSupplyDetailsFields.publicAnnouncementNumber],
            modelNumber: map[APTOptionalSupplyDetailsFields.modelNumber] ?? null,
            houseType: map[APTOptionalSupplyDetailsFields.houseType] ?? null,
            generalSupplyHouseholds: map[APTOptionalSupplyDetailsFields.generalSupplyHouseholds] ?? null,
            topAmount: map[APTOptionalSupplyDetailsFields.topAmount] ?? null,
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
            generalSupplyHouseholds: this.generalSupplyHouseholds,
            topSupplyAmount: this.topAmount
        };
    }
}

export class APTOptionalSupplyDetailsFactory implements AptDetailsInfoFactory<APTOptionalSupplyDetails>{
    fromMap(map: { [key: string]: any; }): APTOptionalSupplyDetails {
        return APTOptionalSupplyDetails.fromMap(map);
    }    

    getApiUrl(basicInfo: AptBasicInfo): string {
        return ApplyHomeApiUrls.getOptionalSupplyDetails(basicInfo);
    }
}