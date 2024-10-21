export class ParsedAddress{
    시도? : string;
    시군구? : string;

    constructor(prams : {
        시도? : string,
        시군구? : string
    }){
        this.시도 = prams.시도;
        this.시군구 = prams.시군구;
    }
}