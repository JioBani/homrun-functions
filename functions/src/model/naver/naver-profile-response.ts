export class NaverProfileResponse {
    resultcode: string;
    message: string;
    response: ResponseData;

    constructor(resultcode: string, message: string, response: ResponseData) {
        this.resultcode = resultcode;
        this.message = message;
        this.response = response;
    }
}

class ResponseData {
    id: string;
    nickname: string;
    name: string;
    email: string;
    gender?: string;
    age?: string;
    birthday?: string;
    profile_image?: string;
    birthyear?: string;
    mobile?: string;

    constructor(
        id: string,
        nickname: string,
        name: string,
        email: string,
        gender: string,
        age: string,
        birthday: string,
        profile_image: string,
        birthyear: string,
        mobile: string
    ) {
        this.id = id;
        this.nickname = nickname;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.age = age;
        this.birthday = birthday;
        this.profile_image = profile_image;
        this.birthyear = birthyear;
        this.mobile = mobile;
    }
}
