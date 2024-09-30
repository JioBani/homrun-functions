export class ParsingEntity<T>{
    data : T | null;
    hasError : boolean;
    error : unknown;

    constructor(params : {
        data :  T | null,
        hasError : boolean,
        error : unknown,
    }){
        this.data = params.data;
        this.hasError = params.hasError;
        this.error = params.error;
    }

    static fromParsing<T>(action : ()=>T){
        try{
            return new ParsingEntity({
                data : action(),
                hasError : false,
                error : null
            });
        }catch(e){
            return new ParsingEntity({
                data : null,
                hasError : true,
                error : e
            });
        }
    }
}