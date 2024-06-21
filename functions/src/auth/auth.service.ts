//import { SocialProvider } from 'src/enum/social-provider.enum';
//import { UserDto  } from 'src/model/user.dto';
import { SocialProvider } from '../enum/social-provider.enum';
import { UserDto } from '../model/user.dto';
import * as firebaseAdmin from 'firebase-admin';

export class AuthService {
   
    async signIn(accessToken : string, userDto : UserDto) : Promise<string | undefined>{
        //TODO 유저 정보 유효성 및 엑세스 토큰 체크 할지

        //#1. 유저 제작
        var uid = await this.#createUser(userDto);

        //#2. 커스텀 토큰 생성
        let token;
        try{   
            token = await firebaseAdmin.auth().createCustomToken(uid);
            console.log(`[AuthService.signIn()] : ${token}`);
        }catch(error){
            console.log(`[AuthService.signIn()] 커스텀 토큰 제작중 오류 발생 : ${error}`);
            //throw new InternalServerErrorException('An unexpected error occurred during create custom token.');
        }   
        
        
        console.log(`[AuthService.signIn()] 로그인 완료 : ${userDto.socialProvider} , ${uid} , ${userDto.displayName} , ${token}}`)
        return token;
    }

    /// userDto의 uid가 변형됨
    async #createUser(userDto : UserDto) : Promise<string>{
        let uid : string;

        if(userDto.socialProvider === SocialProvider.KAKAO){
            uid = `kakao:${userDto.uid}`;
        }
        else if(userDto.socialProvider === SocialProvider.NAVER){
            uid = `naver:${userDto.uid}`;
        }
        else{
            uid = `other:${userDto.uid}`; 
        }

        let userInfo = {
            uid: uid,
            socialProvider : userDto.socialProvider,
            displayName: this.#createDisplayName(),
            userType: 'commom',
            birth: userDto.birth,
            gender: userDto.gender,
        }

        userDto.uid = uid;
    
        try{
            try {
                await firebaseAdmin.auth().updateUser(uid, userInfo);
                console.log(`[AuthService.createUser()] ${userInfo.socialProvider} 유저 업데이트 : ${userInfo.uid} , ${userInfo.displayName}`)
            } catch (e) {
                await firebaseAdmin.auth().createUser(userInfo);
                console.log(`[AuthService.createUser()] ${userInfo.socialProvider} 유저 회원가입 : ${userInfo.uid} , ${userInfo.displayName}`)
            }
        }catch(e){
            //this.logger.error(`유저 업데이트 및 회원가입중 오류 : ${e}`);
            console.log(`유저 업데이트 및 회원가입중 오류 : ${e}`);
            //throw new InternalServerErrorException('Error updating or creating user.');
        }
       
        try{
            const userDocRef = firebaseAdmin.firestore().collection('users').doc(uid);
            //await userDocRef.set(userDto, { merge: true });  

            await userDocRef.set(userInfo, { merge: true });  

        }catch(e){
            //this.logger.error(`유저 정보 저장중 오류 : ${e}`);
            console.log(`유저 정보 저장중 오류 : ${e}`);
            //throw new InternalServerErrorException('Error setting user document.');
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

}
