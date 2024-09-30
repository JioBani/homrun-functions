export class Result<T = void>{
    data? : T;
    error : unknown;
    isSuccess : boolean;

    constructor(parms : {
        data : T | undefined,
        error : unknown,
        isSuccess : boolean
    }){
        this.data = parms.data;
        this.error = parms.error;
        this.isSuccess = parms.isSuccess;
    }

    static success<T>(data : T) : Result<T>{
        return new Result<T>({
            data : data,
            error : undefined,
            isSuccess : true
        });
    }

    static failure<T>(error : unknown) : Result<T>{
        return new Result<T>({
            data : undefined,
            error : error,
            isSuccess : false
        });
    }

    static execute<T>(action : ()=>T) : Result<T>{
        try{
            return Result.success<T>(action());
        }catch(e){
            return Result.failure<T>(e);
        }
    }

    static async executeAsync<T>(action : ()=>Promise<T>) : Promise<Result<T>>{
        try{
            return Result.success<T>(await action());
        }catch(e){
            console.error(e);
            return Result.failure<T>(e);
        }
    }
}