import * as dotenv from 'dotenv';
import * as firebaseAdmin from 'firebase-admin';
import axios, { AxiosResponse } from 'axios';
import { SocialProvider } from '../enum/social-provider.enum';
import {KakaoUserResponse} from '../model/kakao/kakao-user-resonse'
import { NaverProfileResponse } from '../model/naver/naver-profile-response';
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '../error/http.error';
import { UserService } from '../user/user.service';
import { Gender } from '../enum/gender.enum';
import { Timestamp } from 'firebase-admin/firestore';

//TODO error 코드

dotenv.config();

export class AuthService {    

  constructor(
    private userService : UserService,
  ){}
    
   
    //TODO 이미 회원가입 되어있는지 확인하고 displayName 바꾸지 않기
    //TODO 소셜 프로바이더 회원가입이 맞게 적용
    async signIn(accessToken : string, provider : SocialProvider) : Promise<string | undefined>{

        //#1. 토큰 검증 및 uid생성
        var uid = await this.#verifyTokenAndCreateUid(accessToken , provider);

        //#2. 유저가 있는지 확인
        if(!await this.userService.isUserExist(uid)){
          throw UnauthorizedError.UserNotFoundError();
        }
  
        //#3. 커스텀 토큰 생성
        let token;
        try{   
            token = await firebaseAdmin.auth().createCustomToken(uid);
            console.log(`[AuthService.signIn()] : ${token}`);
        }catch(error){
            console.log(`[AuthService.signIn()] 커스텀 토큰 제작중 오류 발생 : ${error}`);
            throw new InternalServerError({message : 'An unexpected error occurred during create custom token.'});
        }   

        console.log(`[AuthService.signIn()] 로그인 완료 : ${uid}}`)
        return token;
    }

    async getKakaoUserInfo(accessToken : string) : Promise<KakaoUserResponse>{
        const url = 'https://kapi.kakao.com/v2/user/me';

        try {
            const response: AxiosResponse<KakaoUserResponse> = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                console.error(`HTTP error! status: ${error.response.status}, data: ${JSON.stringify(error.response.data)}`);
                switch (error.response.status) {
                  case 400:
                    throw new BadRequestError({ code: 40000, message: 'Kakao API: Bad Request' });
                  case 401:
                    throw new UnauthorizedError({ code: 40100, message: 'Kakao API: Unauthorized' });
                  case 403:
                    throw new ForbiddenError({ code: 40300, message: 'Kakao API: Forbidden' });
                  case 404:
                    throw new NotFoundError({ code: 40400, message: 'Kakao API: Not Found' });
                  case 500:
                    throw new InternalServerError({ code: 50000, message: 'Kakao API: Internal Server Error' });
                  default:
                    throw new InternalServerError({ code: 50000, message: `Kakao API: Unexpected error with status ${error.response.status}` });
                }
              } else if (error.request) {
                console.error('No response received:', error.request);
                throw new InternalServerError({ code: 50000, message: 'Kakao API: No response received from the server.' });
              } else {
                console.error('Error in setting up request:', error.message);
                throw new InternalServerError({ code: 50000, message: 'Kakao API: Error in setting up request.' });
              }
            } else {
              console.error('Unexpected error:', error);
              throw new Error('An unexpected error occurred.');
            }
          }
    }

    async getNaverUserInfo(accessToken: string): Promise<NaverProfileResponse> {
        const url = 'https://openapi.naver.com/v1/nid/me';
    
        try {
            const response: AxiosResponse<NaverProfileResponse> = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID as string,
                    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET as string
                },
            });
    
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                console.error(`HTTP error! status: ${error.response.status}, data: ${JSON.stringify(error.response.data)}`);
                switch (error.response.status) {
                  case 400:
                    throw new BadRequestError({ code: 40000, message: 'Naver API: Bad Request' });
                  case 401:
                    throw new UnauthorizedError({ code: 40100, message: 'Naver API: Unauthorized' });
                  case 403:
                    throw new ForbiddenError({ code: 40300, message: 'Naver API: Forbidden' });
                  case 404:
                    throw new NotFoundError({ code: 40400, message: 'Naver API: Not Found' });
                  case 500:
                    throw new InternalServerError({ code: 50000, message: 'Naver API: Internal Server Error' });
                  default:
                    throw new InternalServerError({ code: 50000, message: `Naver API: Unexpected error with status ${error.response.status}` });
                }
              } else if (error.request) {
                console.error('No response received:', error.request);
                throw new InternalServerError({ code: 50000, message: 'Naver API: No response received from the server.' });
              } else {
                console.error('Error in setting up request:', error.message);
                throw new InternalServerError({ code: 50000, message: 'Naver API: Error in setting up request.' });
              }
            } else {
              console.error('Unexpected error:', error);
              throw new Error('An unexpected error occurred.');
            }
          }
    }

    async signUp(data : {
      accessToken : string, 
      socialProvider : SocialProvider,
      displayName : string,
      gender : Gender,
      birth : Timestamp
    }) : Promise<string | undefined>{

      //#1. 토큰 검증 및 uid 만들기
      const uid = await this.#verifyTokenAndCreateUid(data.accessToken , data.socialProvider);

      //#2. user 만들기
      await this.userService.createUser({
        uid : uid,
        socialProvider : data.socialProvider,
        displayName : data.displayName,
        gender : data.gender,
        birth : data.birth
      });

      //#3. 커스텀 토큰 생성
      let token;
      try{   
          token = await firebaseAdmin.auth().createCustomToken(uid);
          console.log(`[AuthService.signIn()] : ${token}`);
      }catch(error){
          console.log(`[AuthService.signIn()] 커스텀 토큰 제작중 오류 발생 : ${error}`);
          throw new InternalServerError({message : 'An unexpected error occurred during create custom token.'});
      }   

      console.log(`[AuthService.signIn()] 회원가입 완료 : ${uid}`)
      return token;
    }

    //#. 각 소셜에 token을 검증하고 uid를 가져옴
    async #verifyTokenAndCreateUid(accessToken : string, socialProvider : SocialProvider) : Promise<string>{
      let uid : string;

      if(socialProvider === SocialProvider.KAKAO){
          let KakaoUserResponse : KakaoUserResponse = await this.getKakaoUserInfo(accessToken);
          uid = `kakao:${KakaoUserResponse.id}`;
      }
      else if(socialProvider === SocialProvider.NAVER){
          let naverProfileResponse : NaverProfileResponse = await this.getNaverUserInfo(accessToken);
          uid =  `naver:${naverProfileResponse.response.id}`;
      }
      else{
          throw new BadRequestError({message : 'Incorrect social provider'})
      }

      return uid;
    }
}
