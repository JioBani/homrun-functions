import { AptBasicInfo, AptDetailsInfo, APTInfo } from "../model/apt.model";
import { MappableFactory } from "../../../common/mappable.factory";

/**
 * 아파트 정보 팩토리 인터페이스
 * @template T 아파트 정보 타입 (APTInfo를 상속)
 */
export interface AptFactory<T extends APTInfo> extends MappableFactory<T> {

}

/**
 * 기본 아파트 정보 팩토리 인터페이스
 * @template T 기본 아파트 정보 타입 (AptBasicInfo를 상속)
 */
export interface AptBasicInfoFactory<T extends AptBasicInfo> extends AptFactory<T> {
    /**
     * 시작 날짜를 기반으로 API URL을 반환하는 메서드
     * @param startDate 시작 날짜
     * @returns API URL 문자열
     */
    getApiUrl(startDate: Date): string;
}

/**
 * 세부 아파트 정보 팩토리 인터페이스
 * @template T 세부 아파트 정보 타입 (AptDetailsInfo를 상속)
 */
export interface AptDetailsInfoFactory<T extends AptDetailsInfo> extends AptFactory<T> {
    /**
     * 기본 아파트 정보를 기반으로 API URL을 반환하는 메서드
     * @param basicInfo 기본 아파트 정보
     * @returns API URL 문자열
     */
    getApiUrl(basicInfo: AptBasicInfo): string;
}
