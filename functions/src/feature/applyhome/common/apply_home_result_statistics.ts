import { Mappable } from "../../../common/mappable";
import { logger } from "firebase-functions/v1";
import { SupplyMethod } from "../value/supply_method.enum";
import { ApplyHomeFetchResult } from "./apply_home_fetch_result";

/**
 * 청약 결과 통계를 나타내는 클래스입니다.
 */
export class ApplyHomeResultStatistics extends Mappable{
    supplyMethod : SupplyMethod;

    //#. 통계
    basicFetchSuccess : boolean; // 기본 정보 fetch 성공 여부

    basicParsingCount : number = 0; // 기본 파싱 시도 횟수
    basicParsingSuccessCount : number = 0; // 기본 파싱 성공 횟수

    detailsFetchCount : number = 0; // 상세 정보 fetch 시도 횟수
    detailsFetchSuccessCount : number = 0; // 상세 정보 fetch 성공 횟수

    detailsTotalParsingCount : number = 0; // 상세 정보 파싱 시도 횟수
    detailsTotalParsingSuccessCount : number = 0; // 상세 정보 파싱 성공 횟수
    
    
    //#. error
    basicParsingErorrs : string[] = []; // 기본 파싱 에러 목록
    detailsFetchErorrs : string[] =  []; // 상세 정보 fetch 에러 목록
    detailsParsingErorrs : string[] = []; // 상세 정보 파싱 에러 목록
    

    /**
     * ApplyHomeResult로부터 통계를 생성하는 생성자입니다.
     * 
     * @param result 청약 결과
     */
    constructor(supplyMethod :SupplyMethod, result : ApplyHomeFetchResult){
        super();

        this.supplyMethod = supplyMethod;
        this.basicFetchSuccess = result.isSuccess;
        if(result.isSuccess){
            //#. 기본 정보 파싱 순회
            result.parsingResults?.forEach(parsingResult=>{
                this.basicParsingCount++;
                
                if(parsingResult.isSuccess){ 
                    //#. 기본정보 파싱 성공

                    //#. 기본정보 성공 파싱 카운트 증가
                    this.basicParsingSuccessCount++;

                     //#. 상세 정보 확인
                    if(parsingResult.detail != null){
                        this.detailsFetchCount++;

                        if(parsingResult.detail!.isSuccess){
                            //#. 상세 정보 fetch 성공
                            this.detailsFetchSuccessCount++;

                            //#. 상세정보 파싱 검사
                            parsingResult.detail!.parsingResults?.forEach(detailParsing =>{
                                this.detailsTotalParsingCount++;
                                
                                if(detailParsing.isSuccess){
                                    this.detailsTotalParsingSuccessCount++;
                                    
                                }
                                else{
                                    this.detailsParsingErorrs.push(detailParsing.name);
                                }
                            });
                        }
                        else{
                            //#. 상세 정보 fetch 실패
                            this.detailsFetchErorrs.push(`${parsingResult.detail!.name} => ${parsingResult.detail!.error}`);
                        }
                    }
                    else{
                        logger.error(`[ApplyHomeResultStatics] ${parsingResult.name} : details result is null`);
                    }                    
                }    
                else{
                    //#. 기본정보 파싱 실패
                    this.basicParsingErorrs.push(parsingResult.name);
                }           
            });
        }
    }
}