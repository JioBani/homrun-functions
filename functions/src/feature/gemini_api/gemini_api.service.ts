import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GOOGLE_AI_STUDIO_API_KEY } from "../../secure/gogle_ai_studio_api.key";
import { Result } from "../../common/result";
import { ParsedAddress } from "../../model/parsed_address";
import { makePrompt } from "../../secure/parsing_address.prompt";

export class GeminiApiService{
    constructor(){
        const genAI = new GoogleGenerativeAI(GOOGLE_AI_STUDIO_API_KEY);
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    private model : GenerativeModel; 

    async generateGemeniResponse(msg : string) : Promise<string>{
        return (await this.model.generateContent(msg)).response.text();
    }

    async parseAddressList(addressList : string[]) : Promise<Result<Array<ParsedAddress>>>{
        let text;

        try{
            text = await this.generateGemeniResponse(makePrompt(addressList));
        }catch(e){
            return Result.failure(e);
        }

        try{
            // 1. 불필요한 ```json 마크다운 구문 제거
            const cleanedResponse = text.replace(/```json\s*|\s*```/g, '').trim();
            
            // 2. JSON 파싱
            const parsedData = JSON.parse(cleanedResponse);

            const addresses: ParsedAddress[] = parsedData.address.map((addr: any) => {
                return new ParsedAddress({
                    시도: addr.시도,
                    시군구: addr.시군구,
                });
            });
     
            return Result.success(addresses);
        }catch(e){
            return Result.failure(new Error(`파싱 실패 : ${e}`));
        }
    }
}