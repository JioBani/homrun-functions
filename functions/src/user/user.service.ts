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
    async createUser(userDto : UserDto) : Promise<UserDto>{
      //TODO 회원가입시 uid 암호화 필요함
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
  
      return userDto;
  }
}

