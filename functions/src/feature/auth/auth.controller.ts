import { withApiResponseHandler, withAuthHandler } from "../../middleware/api-response-handler";
import { BadRequestError, InvalidParameterError, UnauthorizedError } from '../../error/http.error';
import { ApiResponse } from '../../model/api-response';
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";
import { SocialProvider } from "../../enum/social-provider.enum";
import { AuthService } from "./auth.service";
import { Gender } from "../../enum/gender.enum";
import { checkDisplayNameAvailability } from "../../utils/display_name_validator";
import { TimeFormatter } from "../../utils/time_formatter";
import { isString } from "../../utils/type_check";
import { validateRegions } from "../../value/region.value";

export class AuthController{

    constructor(private authService : AuthService){}

    signIn = withApiResponseHandler(async (request : Request , _ : Response) : Promise<ApiResponse>=>{
        const authHeader = request.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new UnauthorizedError();
        }
    
        const { social_provider } = request.body;
    
        if (!Object.values(SocialProvider).includes(social_provider)) {
          throw new BadRequestError({message : 'Invalid social provider'});
        }
    
        const result = await this.authService.signIn(authHeader.split(' ')[1] , social_provider);
    
        return new ApiResponse({
          status : 200,
          data : result
        });
      }
    );


    //TODO 임시로 유효성을 index 에서 처리
    signUp = withAuthHandler(async (request : Request , _ : Response) : Promise<ApiResponse>=>{
        const authHeader = request.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new UnauthorizedError();
        }
    
        const { socialProvider, displayName, gender, birth,interestedRegions} = request.body;
    
        if (!Object.values(SocialProvider).includes(socialProvider)) {
          console.log(socialProvider);
          throw InvalidParameterError.fromParameter('social provider');
        }
    
       
        if (!isString(displayName)) {
          throw InvalidParameterError.fromParameter("displayName");
        }
        else{
          //#. 닉네임 유효성 확인
          await checkDisplayNameAvailability(displayName);
        }
    
        if (gender == null || !Object.values(Gender).includes(gender)) {
          throw InvalidParameterError.fromParameter("gender");
        }
       
    
        //#. brith는 string을 TimeStamp형식으로 변환해서 전달
        //TODO 시간 범위 체크를 해야할지 결정하기(14세 이상, 1800년대, 미래 등)
        if (birth == null) {
          throw InvalidParameterError.fromParameter("birth");
        }
    
        let birthDate;
    
        try{
          birthDate = TimeFormatter.datStringToDateTime(birth);
        }catch(e){
          throw InvalidParameterError.fromParameter("birth");
        }
    
        if(!interestedRegions || !validateRegions(interestedRegions))
        {
          throw InvalidParameterError.fromParameter("interestedRegions");
        }
    
        const result = await this.authService.signUp({
          accessToken : authHeader.split(' ')[1], 
          socialProvider : socialProvider,
          displayName : displayName,
          gender : gender,
          interestedRegions : interestedRegions,
          birth : birthDate
        });
    
        return new ApiResponse({
          status : 200,
          data : result
        });
    });
}