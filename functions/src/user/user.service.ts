import * as firebaseAdmin from 'firebase-admin';
import { SocialProvider } from "../enum/social-provider.enum";
import { UserReferences } from "./user.references";
import { UserDto } from "../model/user.dto";
import { Gender } from "../enum/gender.enum";
import { ConflictError, InternalServerError,} from '../error/http.error';
import { Transaction } from 'firebase-admin/firestore';

export class UserService{
  
    //#. 유저 있는지 확인
    async isUserExist(uid: string) : Promise<boolean>{
        //#. uid
        try{
            await firebaseAdmin.auth().getUser(uid);
        }catch(e){
            return false;
        }

        //#. user doc
        const userDoc = await UserReferences.getUserDocument(uid).get();

        if (!userDoc.exists) {
            return false;
        }
        else{
            return true;
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
            ageRange: data.ageRange,
            interestedRegions: data.interestedRegions
          });
        } else {
            return undefined;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    }

    async createUser(data : {
        uid : string, 
        socialProvider : SocialProvider,
        displayName : string,
        gender : Gender,
        ageRange : String,
        interestedRegions : String[]
      }) : Promise<UserDto>{

        //#1. uid가 있는지 확인하고 만들기        
        if(await this.isUserExist(data.uid)){
            throw ConflictError.UserAlreadyExistsError();
        }
        
        await this.#createUid(data.uid);        

        //#2. user document 만들기        
        try{
            const userDto = await this.#createUserDocument({
                uid : data.uid, 
                socialProvider : data.socialProvider,
                displayName : data.displayName,
                gender : data.gender,
                ageRange : data.ageRange,
                interestedRegions : data.interestedRegions
            });    

            console.log(`[UserService.ensureUser()] ${userDto.socialProvider} 유저 회원가입 : ${userDto.uid} , ${userDto.displayName}`);

            return userDto; 
        }catch(e){
            //#. 문서 제작 실패시 유저 삭제
            firebaseAdmin.auth().deleteUser(data.uid);
            throw e;
        }   
           
    }

    //#. 유저 만들기
    async #createUid(uid : string){
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
    async #createUserDocument(data : {
        uid : string, 
        socialProvider : SocialProvider,
        displayName : string,
        gender : Gender,
        ageRange : String,
        interestedRegions : String[]
      }) : Promise<UserDto>{

        //#. 회원가입이 동시에 진행 될 수도 있기 때문에 트랜잭션 사용
        return firebaseAdmin.firestore().runTransaction(async (transaction) => {
            //#. 닉네임 중복 체크
            const isDuplicated = await this.#isDisplayNameDuplicated(transaction , data.displayName);

            if(isDuplicated){
                throw ConflictError.DisplayNameAlreadyExistsError();
            }

            console.log("[UserService.createUserDocument] 유저 만들기 시작")
            //#. 유저 만들기
            const userDto = new UserDto({
                uid: data.uid,
                socialProvider : data.socialProvider,
                displayName: data.displayName,
                gender: data.gender,
                ageRange : data.ageRange,
                interestedRegions :data.interestedRegions
            }); 

            await transaction.set(UserReferences.getUserDocument(data.uid),userDto.toPlainObject());

            return userDto;
        });
    }

    //#. 닉네임 중복 검사
    async #isDisplayNameDuplicated(transaction : Transaction , newName : String) : Promise<boolean>{
        const snapshot = await transaction.get(UserReferences.getUserCollection().where('displayName' , '==' ,newName));

        if(snapshot.empty){
            return false;
        }
        else{
            return true;
        }
    }
}

