import { AptAnnouncementByHouseType } from "./apt_announcement_by_house_type";


//TODO 성공 통계 구현?
export class ProcessedAPTAnnouncementByHouseType{
    //#. 특별공급 전체 세대수
    totalSpecialSupplyHouseholds: number | null;

    //#. 일반공급 전체 세대수
    totalGeneralSupplyHouseholds: number | null;

    //#. 최대 공급금액
    maxSupplyPrice: number | null;

    //#. 최소 공급금액
    minSupplyPrice: number | null;

    //#. 공급 규모에 에러가 있는지 확인
    hasSupplyHouseholdsCountError : boolean;


    static fromData(data : {
        announcementByHouseTypeList : (AptAnnouncementByHouseType | null)[],
        totalSupplyHouseholdCount? : number | null
    }){
        /**
         * 세대수가 null 인 경우 예외를 던질지 아니면 0으로 처리할지 선택
         * 
         * 0으로 처리하고 전체 공급 규모랑 맞지 않으면 null로 처리하도록 -> 취합이 필요함
         *  */ 

        /** */
        let _totalSpecialSupplyHouseholds : number | null = 0;
        let _totalGeneralSupplyHouseholds  : number | null= 0;
        let _maxSupplyPrice : number | null = null;
        let _minSupplyPrice : number | null = null;

        data.announcementByHouseTypeList.forEach(e=>{
            if(e == null){
                throw Error('[ProcessedAPTAnnouncementByHouseType.fromData()] 데이터가 null 입니다.')
            }

            if(e.specialSupplyHouseholds !== null){
                _totalSpecialSupplyHouseholds! += e.specialSupplyHouseholds;
            }

            if(e.generalSupplyHouseholds !== null){
                _totalGeneralSupplyHouseholds! += e.generalSupplyHouseholds;
            }

            if(e.highestSupplyPrice != null){
                //#. 숫자로 변경
                const price = Number(e.highestSupplyPrice);

                if(!isNaN(price)){
                    //#. 최대값
                    if(_maxSupplyPrice == null || price > _maxSupplyPrice){
                        _maxSupplyPrice = price;
                    }
                    
                    //#. 최소값
                    if(_minSupplyPrice == null || price < _minSupplyPrice){
                        _minSupplyPrice = price;
                    }
                }                
            }
        });


        //#. 공급규모 취합에 에러가 있는지(아직 공시되지 않은 정보가 있거나, 합이 다른 경우) 확인
        let hasHouseholdCountError : boolean = false;
        
        if(_totalGeneralSupplyHouseholds != null && _totalSpecialSupplyHouseholds != null && data.totalSupplyHouseholdCount != null){
            if(_totalGeneralSupplyHouseholds + _totalSpecialSupplyHouseholds !== data.totalSupplyHouseholdCount){
                hasHouseholdCountError = true;
            }
        }
        else{
            hasHouseholdCountError = true;
        }

        return new ProcessedAPTAnnouncementByHouseType({
            totalSpecialSupplyHouseholds : _totalSpecialSupplyHouseholds,
            totalGeneralSupplyHouseholds : _totalGeneralSupplyHouseholds,
            maxSupplyPrice : _maxSupplyPrice,
            minSupplyPrice : _minSupplyPrice,
            hasSupplyHouseholdsCountError : hasHouseholdCountError
        });
    }

    constructor(data : {
        totalSpecialSupplyHouseholds: number | null,
        totalGeneralSupplyHouseholds: number | null,
        maxSupplyPrice: number | null,
        minSupplyPrice: number | null,
        hasSupplyHouseholdsCountError : boolean
    }) {
        this.totalSpecialSupplyHouseholds = data.totalSpecialSupplyHouseholds;
        this.totalGeneralSupplyHouseholds = data.totalGeneralSupplyHouseholds;
        this.maxSupplyPrice = data.maxSupplyPrice;
        this.minSupplyPrice = data.minSupplyPrice;
        this.hasSupplyHouseholdsCountError = data.hasSupplyHouseholdsCountError;
    }
    

    toMap() {
        return {
            totalSpecialSupplyHouseholds: this.totalSpecialSupplyHouseholds,
            totalGeneralSupplyHouseholds: this.totalGeneralSupplyHouseholds,
            maxSupplyPrice: this.maxSupplyPrice,
            minSupplyPrice: this.minSupplyPrice,
            hasSupplyHouseholdsCountError: this.hasSupplyHouseholdsCountError
        };
    }
}