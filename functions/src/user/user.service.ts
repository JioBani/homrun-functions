import * as firebaseAdmin from 'firebase-admin';
import { SocialProvider } from "../enum/social-provider.enum";
import { UserReferences } from "./user.references";
import { UserDto } from "../model/user.dto";
import { Gender } from "../enum/gender.enum";
import { InternalServerError } from '../error/http.error';
import { logger } from 'firebase-functions/v1';

export class UserService{
  
    //#. 유저 있는지 확인
    async isUidExist(uid: string): Promise<boolean> {
        try{
            await firebaseAdmin.auth().getUser(uid);
            return true;
        }catch(e){
            return false;
        }
    }    

    //#. 유저 가져오기
    async getUser(uid: string): Promise<UserDto | undefined> {
      try {
        const userDoc = await UserReferences.getUserDocument(uid).get();
        if (!userDoc.exists) {
            return undefined;
        }

        const data = userDoc.data();
        if (data) {
          return new UserDto({
            socialProvider: data.socialProvider as SocialProvider,
            uid: data.uid,
            displayName: data.displayName,
            birth: data.birth,
            gender: data.gender as Gender,
          });
        } else {
            return undefined;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    }

    //#. 유저 만들기
    async #createUser(uid : string){
        try{
            await firebaseAdmin.auth().createUser({
                uid : uid,
            });
            console.log(`[UserService.createUser()] uid 생성 : ${uid}`)
        }catch(e){
            try{
            await firebaseAdmin.auth().updateUser(uid , {});
            }catch(e){
            console.log(`[UserService.createUser()] 유저 회원가입중 오류 : ${e}`);
            throw new InternalServerError({message : 'Error updating or creating user.'});
            }       
        }
    }

    //#. 유저 문서 만들기
    async #createUserDocument(uid : string,  socialProvider : SocialProvider) : Promise<UserDto>{
        var userDto = new UserDto({
            uid: uid,
            socialProvider : socialProvider,
            displayName: this.#createDisplayName(),
            birth: "2000-01-01",
            gender: Gender.MALE,
        }); 

        await  UserReferences.getUserDocument(uid).set(userDto.toPlainObject(), { merge: true });  
        
        return userDto;
    }

    //#. 유저가 있는지 확인하고 없으면 회원가입
    async ensureUser(uid : string,  socialProvider : SocialProvider) : Promise<UserDto>{
        var isUidExist = await this.isUidExist(uid);        
        var userDto : UserDto | undefined = await this.getUser(uid);
        
        if(!isUidExist){
            await this.#createUser(uid);
        }
        
        if(!userDto){
            try{
                userDto = await this.#createUserDocument(uid , socialProvider);
                console.log(`[UserService.ensureUser()] ${userDto.socialProvider} 유저 회원가입 : ${userDto.uid} , ${userDto.displayName}`);
                return userDto;
            }catch(e){
                logger.error(`[UserService.ensureUser()] 유저 정보 문서 생성중 오류 : ${e}`);
                await firebaseAdmin.auth().deleteUser(uid);
                throw new InternalServerError({message : 'Error setting user document.'});
            }
        }
        else{
            return userDto;
        }           
    }

    //#. 유저 이름 만들기
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

