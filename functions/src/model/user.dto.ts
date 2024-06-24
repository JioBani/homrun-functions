import { Gender } from "@/enum/gender.enum";
import { SocialProvider } from "@/enum/social-provider.enum";

export class UserDto{
    socialProvider! : SocialProvider;
    uid! : string;
    displayName : string | undefined;
    birth : string | undefined;
    gender! : Gender

    constructor({
        socialProvider,
        uid,
        displayName,
        birth,
        gender,
      }: {
        socialProvider: SocialProvider;
        uid: string;
        displayName?: string;
        birth?: string;
        gender: Gender;
      }) {
        this.socialProvider = socialProvider;
        this.uid = uid;
        this.displayName = displayName;
        this.birth = birth;
        this.gender = gender;
      }
}