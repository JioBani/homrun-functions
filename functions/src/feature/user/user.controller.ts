import { InvalidParameterError } from "../../error/http.error";
import { withAuthHandler, withApiResponseHandler } from "../../middleware/api-response-handler";
import { ApiResponse } from "../../model/api-response";
import { checkDisplayNameAvailability } from "../../utils/display_name_validator";
import { TimeFormatter } from "../../utils/time_formatter";
import { DecodedIdToken } from "firebase-admin/auth";
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";
import { UserService } from "./user.service";

export class UserController{

    constructor(private userService : UserService){}

    updateUserInfo = withAuthHandler(async (
        request: Request, 
        response: Response, 
        decodedIdToken: DecodedIdToken
    ): Promise<ApiResponse> => {
      
        const {displayName, gender, birth,interestedRegions} = request.body;
    
        if(displayName){
          await checkDisplayNameAvailability(displayName);
        }
    
        //#. brith는 string을 TimeStamp형식으로 변환해서 전달
        //TODO 시간 범위 체크를 해야할지 결정하기(14세 이상, 1800년대, 미래 등)
        let birthDate = undefined;
        if(birth){
          try{
            birthDate = TimeFormatter.datStringToDateTime(birth);
          }catch(e){
            throw InvalidParameterError.fromParameter("birth");
          }
        }  
    
        await this.userService.updateUserInfo({
          uid : decodedIdToken.uid,
          displayName : displayName,
          gender : gender,
          birth : birthDate,
          interestedRegions : interestedRegions
        });
    
        return new ApiResponse({
          status: 200,
          data: null
        });
      });
      
      //#. 닉네임
      checkDisplayName = withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
        const {displayName} =request.body;
    
        //#. 닉네임 유효성 검사
        await checkDisplayNameAvailability(displayName);   
    
        return new ApiResponse({
          status: 200,
          data: null
        });
      });
}