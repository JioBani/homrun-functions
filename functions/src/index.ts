/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as dotenv from 'dotenv';
import * as admin from "firebase-admin";
import { AuthService } from "./feature/auth/auth.service";
import * as functions from "firebase-functions";
import { CommentService } from './feature/comment/comment.service';
import { SiteReviewService } from './feature/site_review/site_review.service';
import { FirebaseValue } from './value/firebase.value';
import { NoticeService } from './feature/notice/notice.service';
import { UserService } from './feature/user/user.service';
import { ScrapService } from './feature/scrap/scrap.service';
import { AuthController } from './feature/auth/auth.controller';
import { CommentController } from './feature/comment/comment.controller';
import { SiteReviewController } from './feature/site_review/site_review.controller';
import { NoticeController } from './feature/notice/notice.controller';
import { UserController } from './feature/user/user.controller';
import { ApplyHommeApiService as ApplyHomeApiService } from './feature/applyhome/applyhome_api.service';
import { GeminiApiService } from './feature/gemini_api/gemini_api.service';

// import { logger } from 'firebase-functions';
// import { withApiResponseHandler } from './middleware/api-response-handler';
// import { Response} from 'express';
// import {Request} from "firebase-functions/v2/https";
// import { ApiResponse } from './model/api-response';
//import { PushNotificationService } from './feature/notification/push_notification.service';
//import { PushNotificationController } from './feature/notification/push_notification.controller';

dotenv.config();

const serviceAccount = require(process.env.FB_SERVICE_ACCOUNT as string);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),  
    storageBucket : `${FirebaseValue.storage_bucket_name}.appspot.com`
});

const commentService = new CommentService();
const siteReviewService = new SiteReviewService();
const applyHomeApiService = new ApplyHomeApiService();
const gemeniApiService = new GeminiApiService();
const noticeService = new NoticeService(applyHomeApiService , gemeniApiService);
const scrapService = new ScrapService();
const userService = new UserService();  
const authService = new AuthService(userService);
//const pushNotificationService = new PushNotificationService();

const authController = new AuthController(authService);
const commentController = new CommentController(commentService);
const siteReviewController = new SiteReviewController(siteReviewService);
const noticeController = new NoticeController(noticeService,scrapService);
const userController  = new UserController(userService)
//const pushNotificationController = new PushNotificationController(pushNotificationService);

export const sign_in = functions.region("asia-northeast3").https.onRequest(authController.signIn);

//#. 소셜 회원가입
export const sign_up = functions.region("asia-northeast3").https.onRequest(authController.signUp);

//#. 댓글 좋아요 싫어요 상태 변경
//TODO 이름 바꿔야 할듯
export const update_like_state = functions.region("asia-northeast3").https.onRequest(commentController.updateLikeState);

//#. 현장리뷰
export const make_site_review_doc = functions.region("asia-northeast3").https.onRequest(siteReviewController.makeSiteReviewDocument);

export const delete_site_review = functions.region("asia-northeast3").https.onRequest(siteReviewController.deleteSiteReview);

//TODO title, content, 썸네일 타입검사 필요
export const update_site_review = functions.region("asia-northeast3").https.onRequest(siteReviewController.updateSiteReview);

export const increase_site_review_view = functions.region("asia-northeast3").https.onRequest(siteReviewController.increaseSiteReviewView);


//#. 공고
export const increase_notice_view_count = functions.region("asia-northeast3").https.onRequest(noticeController.increaseNoticeViewCount);

export const like_notice = functions.region("asia-northeast3").https.onRequest(noticeController.likeNotice);

export const update_notice_scrap_count = functions.region("asia-northeast3").https.onRequest(noticeController.updateNoticeScrapCount);

export const delete_all_notice_scrap = functions.region("asia-northeast3").https.onRequest(noticeController.deleteAllNoticeScrap);

//#. 유저
export const update_user_info = functions.region("asia-northeast3").https.onRequest(userController.updateUserInfo);

//#. 닉네임
export const check_display_name = functions.region("asia-northeast3").https.onRequest(userController.updateUserInfo);


// 아파트 공고 업데이트
export const update_apt_info = functions.region('asia-northeast3')
  .runWith({ timeoutSeconds: 540 })
  .pubsub
  .schedule('30 20 * * *') // 매일 18:30 실행
  .timeZone('Asia/Seoul') // 타임존 설정
  .onRun(async (context) => noticeService.updateAptInfo());

// 아파트 공고 업데이트 직후 주소 업데이트
export const update_apt_address = functions.region('asia-northeast3')
  .runWith({ timeoutSeconds: 540 })
  .pubsub
  .schedule('40 20 * * *') // 매일 18:30 실행
  .timeZone('Asia/Seoul') // 타임존 설정
  .onRun(async (context) => noticeService.updateAddress());
  
// export const update_apt_info_force = functions.region("asia-northeast3").runWith({timeoutSeconds : 540, memory:'1GB'}).https.onRequest(
//   withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
//     return new ApiResponse({
//       status: 200,
//       data: await noticeService.updateAptInfoForce()
//     });
//   })
// );

// export const update_address_force = functions.region("asia-northeast3").runWith({timeoutSeconds : 540, memory:'1GB'}).https.onRequest(
//   withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
//     return new ApiResponse({
//       status: 200,
//       data: await noticeService.updateAddress()
//     });
//   })
// );
