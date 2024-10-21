import { Gender } from "../enum/gender.enum";
import { SocialProvider } from "../enum/social-provider.enum";
import { Timestamp } from "firebase-admin/firestore";

export class UserDto{
    socialProvider! : SocialProvider;
    uid! : string;
    displayName : string | undefined;
    gender! : Gender
    birth : Timestamp;
    interestedRegions : String[];

    constructor({
        socialProvider,
        uid,
        displayName,
        birth,
        gender,
        interestedRegions
      }: {
        socialProvider: SocialProvider;
        uid: string;
        displayName?: string;
        birth: Timestamp;
        gender: Gender;
        interestedRegions : String[];
      }) {
        this.socialProvider = socialProvider;
        this.uid = uid;
        this.displayName = displayName;
        this.gender = gender;
        this.birth = birth;
        this.interestedRegions = interestedRegions;
      }

    toPlainObject() {
      return {
          socialProvider: this.socialProvider,
          uid: this.uid,
          displayName: this.displayName,
          gender: this.gender,
          birth : this.birth,
          interestedRegions: this.interestedRegions,
      };
    }
}