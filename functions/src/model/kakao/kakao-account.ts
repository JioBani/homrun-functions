import { Profile } from "./profile";

export class KakaoAccount {
    profile_needs_agreement?: boolean; // 사용자 동의 시 프로필 정보 제공 가능 여부
    profile_nickname_needs_agreement?: boolean; // 사용자 동의 시 닉네임 제공 가능 여부
    profile_image_needs_agreement?: boolean; // 사용자 동의 시 프로필 사진 제공 가능 여부
    profile?: Profile; // 프로필 정보
    name_needs_agreement?: boolean; // 사용자 동의 시 카카오계정 이름 제공 가능 여부
    name?: string; // 카카오계정 이름
    email_needs_agreement?: boolean; // 사용자 동의 시 카카오계정 대표 이메일 제공 가능 여부
    is_email_valid?: boolean; // 이메일 유효 여부 (true: 유효한 이메일, false: 만료된 이메일)
    is_email_verified?: boolean; // 이메일 인증 여부 (true: 인증된 이메일, false: 인증되지 않은 이메일)
    email?: string; // 카카오계정 대표 이메일
    age_range_needs_agreement?: boolean; // 사용자 동의 시 연령대 제공 가능 여부
    age_range?: string; // 연령대
    birthyear_needs_agreement?: boolean; // 사용자 동의 시 출생 연도 제공 가능 여부
    birthyear?: string; // 출생 연도 (YYYY 형식)
    birthday_needs_agreement?: boolean; // 사용자 동의 시 생일 제공 가능 여부
    birthday?: string; // 생일 (MMDD 형식)
    birthday_type?: string; // 생일 타입 (SOLAR: 양력, LUNAR: 음력)
    gender_needs_agreement?: boolean; // 사용자 동의 시 성별 제공 가능 여부
    gender?: string; // 성별 (female: 여성, male: 남성)
    phone_number_needs_agreement?: boolean; // 사용자 동의 시 전화번호 제공 가능 여부
    phone_number?: string; // 카카오계정의 전화번호
    ci_needs_agreement?: boolean; // 사용자 동의 시 CI 제공 가능 여부
    ci?: string; // 연계정보 (CI)
    ci_authenticated_at?: string; // CI 발급 시각, UTC
}