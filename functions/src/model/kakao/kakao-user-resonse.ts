import { KakaoAccount } from "./kakao-account";

export class KakaoUserResponse{
    id!: number; // 회원번호
    connected_at?: string; // 서비스에 연결 완료된 시각, UTC
    properties?: Record<string, any>; // 사용자 프로퍼티
    kakao_account?: KakaoAccount; // 카카오계정 정보
}