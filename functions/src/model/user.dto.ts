import { Gender } from "@/enum/gender.enum";
import { SocialProvider } from "@/enum/social-provider.enum";

export class UserDto{
    socialProvider! : SocialProvider;
    uid! : string;
    displayName : string | undefined;
    gender! : Gender
    ageRange : String;
    interestedRegions : String[];

    constructor({
        socialProvider,
        uid,
        displayName,
        gender,
        ageRange,
        interestedRegions
      }: {
        socialProvider: SocialProvider;
        uid: string;
        displayName?: string;
        birth?: string;
        gender: Gender;
        ageRange : String;
        interestedRegions : String[];
      }) {
        this.socialProvider = socialProvider;
        this.uid = uid;
        this.displayName = displayName;
        this.gender = gender;
        this.ageRange = ageRange;
        this.interestedRegions = interestedRegions;
      }

    toPlainObject() {
      return {
          socialProvider: this.socialProvider,
          uid: this.uid,
          displayName: this.displayName,
          gender: this.gender,
          ageRange: this.ageRange,
          interestedRegions: this.interestedRegions,
      };
    }
}