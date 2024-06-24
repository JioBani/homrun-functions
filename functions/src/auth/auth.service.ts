import * as dotenv from 'dotenv';
import * as firebaseAdmin from 'firebase-admin';
import axios, { AxiosResponse } from 'axios';
import { SocialProvider } from '../enum/social-provider.enum';
import { UserDto } from '../model/user.dto';
import { Gender } from '../enum/gender.enum';
import {KakaoUserResponse} from '../model/kakao/kakao-user-resonse'
import { NaverProfileResponse } from '../model/naver/naver-profile-response';
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } from '../error/http.error';

//TODO error 코드

dotenv.config();

export class AuthService {    
   
    async signIn(accessToken : string, provider : SocialProvider) : Promise<string | undefined>{
        var user : UserDto;

        if(provider === SocialProvider.KAKAO){
            var KakaoUserResponse : KakaoUserResponse = await this.getKakaoUserInfo(accessToken);
            user = new UserDto({
                socialProvider: SocialProvider.KAKAO,
                uid: `kakao:${KakaoUserResponse.id}`,
                displayName: this.#createDisplayName(),
                birth: '2000-01-01',
                gender: Gender.MALE,
            });    
        }
        else if(provider === SocialProvider.NAVER){
            var naverProfileResponse : NaverProfileResponse = await this.getNaverUserInfo(accessToken);
            user = new UserDto({
                socialProvider: SocialProvider.KAKAO,
                uid: `naver:${naverProfileResponse.response.id}`,
                displayName: this.#createDisplayName(),
                birth: '2000-01-01',
                gender: Gender.MALE,
            });   
        }
        else{
            throw new BadRequestError({message : 'Incorrect social provider'})
        }

        //#1. 유저 제작
        var uid = await this.#createUser(user);  

        //#2. 커스텀 토큰 생성
        let token;
        try{   
            token = await firebaseAdmin.auth().createCustomToken(user.uid);
            console.log(`[AuthService.signIn()] : ${token}`);
        }catch(error){
            console.log(`[AuthService.signIn()] 커스텀 토큰 제작중 오류 발생 : ${error}`);
            throw new InternalServerError({message : 'An unexpected error occurred during create custom token.'});
        }   

        console.log(`[AuthService.signIn()] 로그인 완료 : ${user.socialProvider} , ${uid} , ${user.displayName} , ${token}}`)
        return token;
    }

    async #createUser(userDto : UserDto) : Promise<string>{

        let userInfo = {
            uid: userDto.uid,
            socialProvider : userDto.socialProvider,
            displayName: userDto.displayName,
            userType: 'commom',
            birth: userDto.birth,
            gender: userDto.gender,
        }
    
        try{
            try {
                await firebaseAdmin.auth().updateUser(userDto.uid, userInfo);
                console.log(`[AuthService.createUser()] ${userInfo.socialProvider} 유저 업데이트 : ${userInfo.uid} , ${userInfo.displayName}`)
            } catch (e) {
                await firebaseAdmin.auth().createUser(userInfo);
                console.log(`[AuthService.createUser()] ${userInfo.socialProvider} 유저 회원가입 : ${userInfo.uid} , ${userInfo.displayName}`)
            }
        }catch(e){
            console.log(`유저 업데이트 및 회원가입중 오류 : ${e}`);
            throw new InternalServerError({message : 'Error updating or creating user.'});
        }
       
        try{
            const userDocRef = firebaseAdmin.firestore().collection('users').doc(userDto.uid);
            await userDocRef.set(userInfo, { merge: true });  

        }catch(e){
            console.log(`유저 정보 저장중 오류 : ${e}`);
            throw new InternalServerError({message : 'Error setting user document.'});
        }
    
        return userDto.uid;
    }

    #createDisplayName() : string {
        const adjectives = [
            "춤추는", "용감한", "조용한", "신비한", "반짝이는",
            "사나운", "온화한", "빛나는", "속삭이는", "기쁜",
            "환한", "그림자", "황금빛", "마법의", "방랑하는",
            "활기찬", "얼어붙은", "장난기 많은", "평온한", "웅장한"
        ];
    
        const nouns = [
            "딸기", "사자", "강", "유령", "은하",
            "불사조", "나비", "산", "고래", "유니콘",
            "용", "숲", "별", "신비", "오아시스",
            "호랑이", "오로라", "스핑크스", "파도", "성"
        ];
    
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
        return `${randomAdjective} ${randomNoun}`;
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
}
