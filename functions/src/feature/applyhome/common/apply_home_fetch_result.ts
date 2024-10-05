import { Result } from "../../../common/result";
import { ApplyHomeResultType } from "../type/apply_home_api.type";
import { ApplyHomeParsingResult } from "./apply_home_parsing_result";
import { AptInfo } from "../model/apt.model";

/**
 * 청약 결과를 나타내는 클래스입니다.
 */
export class ApplyHomeFetchResult {
    name : string; // 청약 이름
    isSuccess: boolean; // 성공 여부
    error: unknown; // 에러 정보
    parsingResults: ApplyHomeParsingResult[] | null; // 파싱 결과

    /**
     * 청약 결과 생성자입니다.
     * 
     * @param params 청약 결과에 대한 매개변수
     */
    constructor(params : {
        name : string,
        isSuccess: boolean, 
        error: unknown, 
        parsingResults: ApplyHomeParsingResult[] | null
    }) {
        this.name = params.name;
        this.isSuccess = params.isSuccess;
        this.error = params.error;
        this.parsingResults = params.parsingResults;
    }

    /**
     * 실패한 청약 결과를 반환합니다.
     * 
     * @param name 청약 이름
     * @param error 에러 정보
     * @returns ApplyHomeResult 객체
     */
    static fromFailure(name : string, error : unknown) : ApplyHomeFetchResult{
        return new ApplyHomeFetchResult({
            name : name,
            isSuccess : false,
            error : error,
            parsingResults : null
        });
    }

    /**
     * 성공한 청약 결과를 반환합니다.
     * 
     * @param name 청약 이름
     * @param parsingResults 파싱 결과 배열
     * @returns ApplyHomeResult 객체
     */
    static fromSuccess(name : string ,parsingResults : ApplyHomeParsingResult[]) : ApplyHomeFetchResult{
        return new ApplyHomeFetchResult({
            name : name,
            isSuccess : true,
            error : null,
            parsingResults : parsingResults
        });
    }
    
    static fromResult(result : Result<ApplyHomeResultType<AptInfo , AptInfo>>) : ApplyHomeFetchResult{
        //#1. 기본 정보를 가져오는데 성공했는지
        if(!result.isSuccess){
            return ApplyHomeFetchResult.fromFailure("root" , result.error);
        }
        
        const parsingResults : ApplyHomeParsingResult[] = [];
        
        //#2. 기본정보를 파싱하는데 성공했는지
        let i = 0;
        result.data!.forEach((value,key)=>{
            //#. 각 기본 정보마다 파싱 성공 여부확인
            if(key?.hasError){ 
                parsingResults.push(ApplyHomeParsingResult.fromFailure(`root : ${i}` , key.error))
            }
            else{ 
                //#. 성공했다면
                let detail : ApplyHomeFetchResult;

                //#. 상세정보를 가져오는데 성공했는지 확인
                if(value?.isSuccess){
                    //#. 상세 정보를 가져오는데 성공했다면
                    let j = -1;

                    //#. 각 상세정보의 파싱 오류를 확인
                    const detailParsingResults : ApplyHomeParsingResult[] = value.data!.map((entity)=>{
                        j++;
                        if(entity.hasError){
                            return ApplyHomeParsingResult.fromFailure(
                                `${key.data!.houseManageNumber} details : ${j}` , 
                                entity.error
                            );
                        }
                        else{
                            return ApplyHomeParsingResult.fromSuccess(
                                `${key.data!.houseManageNumber} details : ${j}` , 
                                null
                            );
                        }
                    });
                    
                    //#. 기본정보의 details에 추가
                    detail = ApplyHomeFetchResult.fromSuccess(`${key.data!.houseManageNumber} : details`, detailParsingResults);
                }
                else{
                    detail = ApplyHomeFetchResult.fromFailure(`${key.data!.houseManageNumber} : details`, value?.error);
                }

                parsingResults.push(ApplyHomeParsingResult.fromSuccess(key.data!.houseManageNumber , detail))
            }
            i++;
        });

        return ApplyHomeFetchResult.fromSuccess("root" , parsingResults);
    }
}
