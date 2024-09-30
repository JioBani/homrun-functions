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

//TODO 클라이언트의 요청 파라미터를 어디서 검증 할 것인지
//TODO 파라미터가 null일때 
//TODO 파라미터 타입검사하기
//TODO 컨트롤러로 라우터 분리

dotenv.config();

const serviceAccount = require(process.env.FB_SERVICE_ACCOUNT as string);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),  
    storageBucket : `${FirebaseValue.storage_bucket_name}.appspot.com`
});

const commentService = new CommentService();
const siteReviewService = new SiteReviewService();
const applyHomeApiService = new ApplyHomeApiService()
const noticeService = new NoticeService(applyHomeApiService);
const scrapService = new ScrapService();
const userService = new UserService();  
const authService = new AuthService(userService);

const authController = new AuthController(authService);
const commentController = new CommentController(commentService);
const siteReviewController = new SiteReviewController(siteReviewService);
const noticeController = new NoticeController(noticeService,scrapService);
const userController  = new UserController(userService)

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


//#. 아파트 공고 업데이트
export const update_apt_info = functions
  .region("asia-northeast3")
  .pubsub.schedule("every day 00:00")
  .timeZone("Asia/Seoul")
  .onRun(async (_) => {
  	noticeService.updateAptInfo();
});


// export const get_house_type_announcement = functions.region("asia-northeast3").https.onRequest(
//   withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
//     const {houseNumber , pbNumber} = request.body;

//     const result =  await noticeService.getAptAnnouncementByHouseType(houseNumber , pbNumber);
//     return new ApiResponse({
//       status: 200,
//       data: result?.toMap()
//     });
//   })
// );

