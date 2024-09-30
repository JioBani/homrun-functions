import { Mappable } from "../../../common/mappable";
import { AptBasicInfo, AptDetailsInfo } from "./apt.model";

export class ApplyHomeDto extends Mappable{
    basicInfo : AptBasicInfo;
    detailsList : (AptDetailsInfo | null)[] | null;

    //#. 특별공급 전체 세대수
    // 일반공급이 없는 경우 -1 
    // 데이터에 오류가 있는 경우 null
    totalSpecialSupplyHouseholds: number | null;

    //#. 일반공급 전체 세대수
    // 일반공급이 없는 경우 -1 
    // 데이터에 오류가 있는 경우 null
    totalGeneralSupplyHouseholds: number | null;

    //#. 최대 공급금액
    maxSupplyPrice: number | null;

    //#. 최소 공급금액
    minSupplyPrice: number | null;

    //#. 공급 규모에 에러가 있는지 확인
    hasSupplyHouseholdsCountError : boolean;
    

    constructor(
        basicInfo : AptBasicInfo, 
        detailsList : (AptDetailsInfo | null)[] | null,
    ){
        super();

        this.basicInfo = basicInfo;
        this.detailsList = detailsList;

        let _totalSpecialSupplyHouseholds : number | null = 0;
        let _totalGeneralSupplyHouseholds  : number | null = 0;
        let _maxSupplyPrice : number | null = null;
        let _minSupplyPrice : number | null = null;

        //#. 세대수 및 최대, 최소 분양가 결정
        if(detailsList == null){
            _totalSpecialSupplyHouseholds = null;
            _totalGeneralSupplyHouseholds = null;
        }
        else{
            detailsList.forEach(e=>{    
                if(e != null){
                    //#. 일반공급 세대수 합계 계산
                    if(e.generalSupplyHouseholds === undefined){
                        //#. 일반공급 세대수 필드가 없으면 -1
                        _totalGeneralSupplyHouseholds = -1;
                    }
                    else if(e.generalSupplyHouseholds == null){
                        //#. 일반공급 세대수가 null 이면 합계를 null로
                        _totalGeneralSupplyHouseholds = null;
                    }
                    else if(_totalGeneralSupplyHouseholds != null && _totalGeneralSupplyHouseholds != -1){
                        //#. 정상인 경우 합계에 더함
                        _totalGeneralSupplyHouseholds += e.generalSupplyHouseholds;
                    }

                    //#. 특별공급 세대수 합계 계산
                    if(e.specialSupplyHouseholds === undefined){
                        //#. 특별공급 세대수 필드가 없으면 -1
                        _totalSpecialSupplyHouseholds = -1;
                    }
                    else if(e.specialSupplyHouseholds == null){
                        //#. 특별공급 세대수가 null 이면 합계를 null로
                        _totalSpecialSupplyHouseholds = null;
                    }
                    else if(_totalSpecialSupplyHouseholds != null && _totalSpecialSupplyHouseholds != -1){
                        //#. 정상인 경우 합계에 더함
                        _totalSpecialSupplyHouseholds += e.specialSupplyHouseholds;
                    }
        
                    if(e.topAmount != null){    
                        if(!isNaN(e.topAmount)){
                            //#. 최대값
                            if(_maxSupplyPrice == null || e.topAmount > _maxSupplyPrice){
                                _maxSupplyPrice = e.topAmount;
                            }
                            
                            //#. 최소값
                            if(_minSupplyPrice == null || e.topAmount < _minSupplyPrice){
                                _minSupplyPrice = e.topAmount;
                            }
                        }                
                    }
                }
                else{
                    _totalGeneralSupplyHouseholds = -1;
                    _totalSpecialSupplyHouseholds = -1;
                }
            });
        }

        //#. 공급규모 취합에 에러가 있는지(아직 공시되지 않은 정보가 있거나, 합이 다른 경우) 확인
        let hasHouseholdCountError : boolean = false;
            
        if(_totalGeneralSupplyHouseholds != null && _totalSpecialSupplyHouseholds != null && basicInfo.totalSupplyHouseholdCount != null){
            if(_totalGeneralSupplyHouseholds + _totalSpecialSupplyHouseholds !== basicInfo.totalSupplyHouseholdCount){
                hasHouseholdCountError = true;
            }
        }
        else{
            hasHouseholdCountError = true;
        }

        this.totalSpecialSupplyHouseholds = _totalSpecialSupplyHouseholds;
        this.totalGeneralSupplyHouseholds = _totalGeneralSupplyHouseholds;
        this.maxSupplyPrice = _maxSupplyPrice;
        this.minSupplyPrice = _minSupplyPrice;
        this.hasSupplyHouseholdsCountError = hasHouseholdCountError;          
    }
}