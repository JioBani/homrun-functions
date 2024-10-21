import { AptAnnouncement, AptAnnouncementFactory } from "./model/apt_announcement";
import { AptAnnouncementDetails, AptAnnouncementDetailsFactory } from "./model/apt_announcement_details";
import axios from "axios";
import { AptUnrankedRemain, AptUnrankedRemainFactory } from "./model/apt_unranked_remain";
import { AptOptionalSupply, AptOptionalSupplyFactory } from "./model/apt_optional_supply";
import { AptUnrankedRemainDetails, AptUnrankedRemainDetailByTypeFactory } from "./model/apt_unranked_remain_details";
import { AptOptionalSupplyDetails, AptOptionalSupplyDetailsFactory } from "./model/apt_optional_supply_details";
import { Result } from "../../common/result";
import { ParsingEntity } from "../../common/parsing_result";
import { AptBasicInfo, AptDetailsInfo, AptInfo } from "./model/apt.model";
import { AptBasicInfoFactory, AptDetailsInfoFactory, AptFactory } from "./factory/apply_heme.factory";
import { ApplyHomeDto } from "./model/apply_home.dto";
import { ApplyHomeFetchResult } from "./common/apply_home_fetch_result";
import { ApplyHomeResult } from "./common/apply_home_result";
import { ApplyHomeResultStatistics } from "./common/apply_home_result_statistics";
import { logger } from "firebase-functions/v1";

export class ApplyHommeApiService{

    announcementFactory = new AptAnnouncementFactory();
    announcementDetailsFactory = new AptAnnouncementDetailsFactory();

    unrankedRemainFactory = new AptUnrankedRemainFactory();
    unrankedRemainDetailsFactory = new AptUnrankedRemainDetailByTypeFactory();

    optionalSupplyFactory = new AptOptionalSupplyFactory();
    optionalSupplyDetailsFactory = new AptOptionalSupplyDetailsFactory();   


    //#. 일반 아파트 정보
    async getAptAnnouncementInfo(currentDate : Date) : Promise<ApplyHomeResult>{
        return this.getAptInfo(
            this.announcementFactory,
            this.announcementDetailsFactory,
            currentDate
        );
    }
    
    //#. 무순위/잔여세대 정보
    async getUrankedRemainInfo(currentDate : Date) : Promise<ApplyHomeResult>{
        return this.getAptInfo(
            this.unrankedRemainFactory,
            this.unrankedRemainDetailsFactory,
            currentDate
        );
    }

    //#. 임의 공급 정보
    async getAPTOptionalSupplyInfo(currentDate : Date) : Promise<ApplyHomeResult>{
        return this.getAptInfo(
            this.optionalSupplyFactory,
            this.optionalSupplyDetailsFactory,
            currentDate
        );
    }       


    //#. url 위치의 API에서 정보를 가져와 객체로 반환
    async getApiData<T extends AptInfo>(factory : AptFactory<AptInfo>, url : string) : Promise<Result<ParsingEntity<T>[]>>{
        return Result.executeAsync<ParsingEntity<T>[]>(async ()=>{

            const response = await axios.get(url);
            
            //#. 상태 코드가 200이 아닌 경우
            if(response.status != 200){
                throw new Error(`청약홈 API 통신 오류: 상태 코드 ${response.status}`);
            }
    
            //#. 가져온 데이터가 배열이 아닌 경우
            if (!Array.isArray(response.data.data)) {
                throw  new Error(`청약홈 API 데이터 오류: data가 Array가 아님 ${response.data.data}`);
            }     
            
            const list : ParsingEntity<T>[] = response.data.data.map((item : any)=>{
                return ParsingEntity.fromParsing(
                    ()=>factory.fromMap(item)
                );
            });

            return list;
        });
    }   

    //#. 공급 방식에 따라 API에서 정보를 가져와 ApplyHomeResult로 반환
    async getAptInfo(
        basicfactory : AptBasicInfoFactory<AptBasicInfo>,
        detailsFactory : AptDetailsInfoFactory<AptDetailsInfo>,
        startDate : Date
    ) : Promise<ApplyHomeResult>{
        try{            
            //#. 기본정보 가져오기
            const basicInfo  : Result<ParsingEntity<AptBasicInfo>[]> = await this.getApiData(
                basicfactory,
                basicfactory.getApiUrl(startDate),
            ); 

            //#. 기본정보를 가져오는데에 실패했을 경우
            if(!basicInfo.isSuccess){
                return new ApplyHomeResult({
                    name : "",
                    data : null,
                    startDate : startDate,
                    statistics : new ApplyHomeResultStatistics(
                        ApplyHomeFetchResult.fromFailure("root" , basicInfo.error)
                    )
                });
            }

            //#. 상세정보 가져오기                 
            const unrankRemainMap : Map<
                ParsingEntity<AptBasicInfo> , 
                Result<ParsingEntity<AptDetailsInfo>[]> | null
            > = new Map();     
            
            //#. DTO 만들기
            const dtoList : ApplyHomeDto[] = [];
        
            for (const item of basicInfo.data!) {
                if (item.data != null) {
                    const detailsResult = await this.getApiData<AptDetailsInfo>(
                        detailsFactory,
                        detailsFactory.getApiUrl(item.data),
                    );
                    unrankRemainMap.set(item, detailsResult);
                    dtoList.push(new ApplyHomeDto(
                        item.data!, 
                        detailsResult.data?.map(e=>e.data) ?? null
                    ));
                } else {
                    unrankRemainMap.set(item, null);
                }
            }
                        
            //#. fetchResult 만들기
            const fetchResult = ApplyHomeFetchResult.fromResult(Result.success(unrankRemainMap));

            return new ApplyHomeResult({
                name : "",
                data : dtoList,
                startDate : startDate,
                statistics : new ApplyHomeResultStatistics(fetchResult)
            });
            
        }catch(e){
            logger.error(`[getAptInfo] ${e}`);
            throw e;
        }
        
    }

    /**
     * 	청약홈 분양정보 조회 서비스 API의 [APT 분양정보 상세조회] 로부터 APTAnnouncement : null 객체의 배열을 가져옵니다.
     *
     * 참고: API 응답 데이터의 개별 항목 처리 중 오류가 발생한 경우, 해당 항목에 대해서는 `null`이 반환됩니다.
     * 전체 함수의 예외 처리는 외부에서 처리해야 합니다.
     * 
     * @param {Date} startDate - 데이터 조회를 시작할 시각.
     * @returns {Promise<Array<AptAnnouncement | null>>} APTAnnouncement 객체 배열 또는 항목 처리 중 오류가 발생한 경우 `null`이 포함된 배열을 반환합니다.
     * 
     */
    async getAPTAnnouncementList(startDate: Date): Promise<Result<ParsingEntity<AptAnnouncement>[]>> {
        return this.getApiData(
            this.announcementFactory,
            this.announcementFactory.getApiUrl(startDate),
        ); 
    }

    
    /**
     * 청약홈 분양정보 조회 서비스 API의 [APT 분양정보 주택형별 상세조회] 로부터 AptAnnouncementByHouseType | null 객체를 가져옵니다.
     * @param houseNumber 주택관리번호
     * @param announcementNumber 공고번호
     */
    async getAptAnnouncementByHouseTypeList(
        announcement : AptAnnouncement
    ) : Promise<Result<ParsingEntity<AptAnnouncementDetails>[]>> {
        return this.getApiData(
            this.announcementDetailsFactory,
            this.announcementDetailsFactory.getApiUrl(announcement),
        ); 
    }

    
    //#. 무순위/잔여세대 정보
    async getAPTUnrankedRemainList(startDate: Date) : Promise<Result<ParsingEntity<AptUnrankedRemain>[]>>{    
        return this.getApiData<AptUnrankedRemain>(
            this.unrankedRemainFactory,
            this.unrankedRemainFactory.getApiUrl(startDate),
        ); 
     }

    //#. 주택형별 무순위/잔여세대 상세정보
    async getAPTUnrankedRemainDetailByTypeList(
        aPTUnrankedRemain : AptUnrankedRemain
    ) : Promise<Result<ParsingEntity<AptUnrankedRemainDetails>[]>> {
        
        return this.getApiData<AptUnrankedRemainDetails>(
            this.unrankedRemainDetailsFactory,
            this.unrankedRemainDetailsFactory.getApiUrl(aPTUnrankedRemain),
        );      
    }

    //#. 임의공급 정보
    async getAPTOptionalSupplyList(startDate: Date) :  Promise<Result<ParsingEntity<AptOptionalSupply>[]>> {
        return this.getApiData(
            this.optionalSupplyFactory,
            this.optionalSupplyFactory.getApiUrl(startDate),
        );  
    }

    //#. 주택형별 임의공급 상세정보
    async getAPTOptionalSupplyByTypeList(
        aPTOptionalSupply : AptOptionalSupply
    ) : Promise<Result<ParsingEntity<AptOptionalSupplyDetails>[]>>{

        return this.getApiData<AptOptionalSupplyDetails>(
            this.optionalSupplyDetailsFactory,
            this.optionalSupplyDetailsFactory.getApiUrl(aPTOptionalSupply),
        ); 
    }

    
}