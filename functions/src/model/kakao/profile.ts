export class Profile{
    nickname?: string; // 닉네임
    thumbnail_image_url?: string; // 프로필 미리보기 이미지 URL (110px * 110px 또는 100px * 100px)
    profile_image_url?: string; // 프로필 사진 URL (640px * 640px 또는 480px * 480px)
    is_default_image?: boolean; // 프로필 사진 URL이 기본 프로필 사진인지 여부
    is_default_nickname?: boolean; // 닉네임이 기본 닉네임인지 여부
}