import { ApplyHomeFetchResult } from "./apply_home_fetch_result";

/**
 * 청약 파싱 결과를 나타내는 클래스입니다.
 */
export class ApplyHomeParsingResult {
    name: string; // 청약 이름
    isSuccess: boolean; // 성공 여부
    error: unknown; // 에러 정보
    detail : ApplyHomeFetchResult | null; // 상세 청약 결과

    /**
     * 청약 파싱 결과 생성자입니다.
     * 
     * @param params 청약 파싱 결과에 대한 매개변수
     */
    constructor(params : {name: string, isSuccess: boolean, error: unknown, detail: ApplyHomeFetchResult | null}) {
        this.name = params.name;
        this.isSuccess = params.isSuccess;
        this.error = params.error;
        this.detail = params.detail;
    }

    /**
     * 실패한 파싱 결과를 반환합니다.
     * 
     * @param name 청약 이름
     * @param error 에러 정보
     * @returns ApplyHomeParsingResult 객체
     */
    static fromFailure(name : string ,error : unknown){
        return new ApplyHomeParsingResult({
            name : name,
            isSuccess : false,
            error : error,
            detail : null
        });
    }

    /**
     * 성공한 파싱 결과를 반환합니다.
     * 
     * @param name 청약 이름
     * @param detail 상세 청약 결과
     * @returns ApplyHomeParsingResult 객체
     */
    static fromSuccess(name : string , detail : ApplyHomeFetchResult | null){
        return new ApplyHomeParsingResult({
            name : name,
            isSuccess : true,
            error : null,
            detail : detail
        });
    }
}