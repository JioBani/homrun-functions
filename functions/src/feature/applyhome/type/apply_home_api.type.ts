import { Result } from "@/common/result";
import { ParsingEntity } from "../../../common/parsing_result";

export type ApplyHomeResultType<T1,T2> = Map<
    ParsingEntity<T1> , 
    Result<ParsingEntity<T2>[]> | null
>