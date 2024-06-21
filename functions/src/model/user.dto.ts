import { Gender } from "@/enum/gender.enum";
import { SocialProvider } from "@/enum/social-provider.enum";

export class UserDto{
    socialProvider! : SocialProvider;
    uid! : string;
    displayName : string | undefined;
    birth : string | undefined;
    gender! : Gender
}