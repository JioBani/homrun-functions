import * as firebaseAdmin from 'firebase-admin';
import { SocialProvider } from "../enum/social-provider.enum";
import { UserReferences } from "./user.references";
import { UserDto } from "../model/user.dto";
import { Gender } from "../enum/gender.enum";
import { InternalServerError } from '../error/http.error';

export class UserService{
  
    //#. 유저 있는지 확인
    async isUserExist(uid: string): Promise<boolean> {
      try {
        const userDoc = await UserReferences.getUserDocument(uid).get();
        return userDoc.exists;
      } catch (error) {
        console.error("Error checking if user exists:", error);
        throw error;
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

    //#. 유저 제작
    async createUser(uid : string,  socialProvider : SocialProvider) : Promise<UserDto>{
      //TODO 회원가입시 uid 암호화 필요함

      var userDto = new UserDto({
        uid: uid,
        socialProvider : socialProvider,
        displayName: this.#createDisplayName(),
        birth: "2000-01-01",
        gender: Gender.MALE,
      });      
        
      try{
        await firebaseAdmin.auth().createUser({
            uid : uid,
            displayName : userDto.displayName
        });
        console.log(`[AuthService.createUser()] ${userDto.socialProvider} 유저 회원가입 : ${userDto.uid} , ${userDto.displayName}`)
      }catch(e){
          console.log(`유저 업데이트 및 회원가입중 오류 : ${e}`);
          throw new InternalServerError({message : 'Error updating or creating user.'});
      }
     
      try{
          const userDocRef = UserReferences.getUserDocument(uid);
          await userDocRef.set(userDto, { merge: true });  

      }catch(e){
          console.log(`유저 정보 저장중 오류 : ${e}`);
          await firebaseAdmin.auth().deleteUser(uid);
          throw new InternalServerError({message : 'Error setting user document.'});
      }
  
      return userDto;
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

