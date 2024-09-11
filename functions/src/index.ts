/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as dotenv from 'dotenv';
import { Response} from 'express';

import {Request} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { AuthService } from "./feature/auth/auth.service";

import { SocialProvider } from "./enum/social-provider.enum";
import { ApiResponse } from "./model/api-response";
import { BadRequestError, InvalidParameterError, UnauthorizedError } from "./error/http.error";
import { withApiResponseHandler, withAuthHandler } from './middleware/api-response-handler';

import * as functions from "firebase-functions";
import { CommentService } from './feature/comment/comment.service';
import { SiteReviewService } from './feature/site_review/site_review.service';
import { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseValue } from './value/firebase.value';
import { NoticeService } from './feature/notice/notice.service';
import { UserService } from './feature/user/user.service';
import { Gender } from './enum/gender.enum';
import { ScrapService } from './feature/scrap/scrap.service';
import { validateRegions } from './value/region.value';
import { TimeFormatter } from './utils/time_formatter';
import { checkDisplayNameAvailability } from './utils/display_name_validator';
import { isBoolean, isNumber, isString } from './utils/type_check';

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

const authService = new AuthService(new UserService);
const commentService = new CommentService();
const siteReviewService = new SiteReviewService();
const noticeService = new NoticeService();
const scrapService = new ScrapService();
const userService = new UserService();  


//소셜 로그인
export const sign_in = functions.region("asia-northeast3").https.onRequest(
  withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError();
    }

    const { social_provider } = request.body;

    if (!Object.values(SocialProvider).includes(social_provider)) {
      throw new BadRequestError({message : 'Invalid social provider'});
    }

    const result = await authService.signIn(authHeader.split(' ')[1] , social_provider);

    return new ApiResponse({
      status : 200,
      data : result
    });
  })
);


//#. 소셜 회원가입
//TODO 임시로 유효성을 index 에서 처리
export const sign_up = functions.region("asia-northeast3").https.onRequest(
  withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError();
    }

    const { socialProvider, displayName, gender, birth,interestedRegions} = request.body;

    if (!Object.values(SocialProvider).includes(socialProvider)) {
      console.log(socialProvider);
      throw InvalidParameterError.fromParameter('social provider');
    }

   
    if (!isString(displayName)) {
      throw InvalidParameterError.fromParameter("displayName");
    }
    else{
      //#. 닉네임 유효성 확인
      await checkDisplayNameAvailability(displayName);
    }

    if (gender == null || !Object.values(Gender).includes(gender)) {
      throw InvalidParameterError.fromParameter("gender");
    }
   

    //#. brith는 string을 TimeStamp형식으로 변환해서 전달
    //TODO 시간 범위 체크를 해야할지 결정하기(14세 이상, 1800년대, 미래 등)
    if (birth == null) {
      throw InvalidParameterError.fromParameter("birth");
    }

    let birthDate;

    try{
      birthDate = TimeFormatter.datStringToDateTime(birth);
    }catch(e){
      throw InvalidParameterError.fromParameter("birth");
    }

    if(!interestedRegions || !validateRegions(interestedRegions))
    {
      throw InvalidParameterError.fromParameter("interestedRegions");
    }

    const result = await authService.signUp({
      accessToken : authHeader.split(' ')[1], 
      socialProvider : socialProvider,
      displayName : displayName,
      gender : gender,
      interestedRegions : interestedRegions,
      birth : birthDate
    });

    return new ApiResponse({
      status : 200,
      data : result
    });
  })
);

export const update_like_state = functions.region("asia-northeast3").https.onRequest(
  withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("!authHeader || !authHeader.startsWith('Bearer ')");
      throw UnauthorizedError.MissingTokenError();
    }

    const { doc, state } = request.body;

    if(!isString(doc)){
      throw InvalidParameterError.fromParameter("doc");
    }

    if (!isNumber(state)) {
      throw InvalidParameterError.fromParameter("state");
    }

    const docRef = admin.firestore().doc(doc);

    const result = await commentService.updateLikeState(
      authHeader.split(' ')[1],
      docRef,
      state
    );

    return new ApiResponse({
      status : 200,
      data : result
    });
  })
);

export const make_site_review_doc = functions.region("asia-northeast3").https.onRequest(
  withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("!authHeader || !authHeader.startsWith('Bearer ')");
      throw UnauthorizedError.MissingTokenError();
    }

    const { noticeId, title, content ,thumbnailImageName} = request.body;

    if (!isString(noticeId) ) {
      throw InvalidParameterError.fromParameter("noticeId");
    }

    if (!isString(title)) {
      throw InvalidParameterError.fromParameter("title");
    }

     if (!isString(content)) {
      throw InvalidParameterError.fromParameter("content");
    }

    const result = await siteReviewService.makeDocument(
      authHeader.split(' ')[1],
      noticeId,
      title,
      content,
      thumbnailImageName
    );

    return new ApiResponse({
      status : 200,
      data : result
    });
  })
);

export const delete_site_review = functions.region("asia-northeast3").https.onRequest(
  withAuthHandler(async (request : Request , response : Response , decodedIdToken : DecodedIdToken) : Promise<ApiResponse>=>{
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("!authHeader || !authHeader.startsWith('Bearer ')");
      throw UnauthorizedError.MissingTokenError();
    }

    const {path} = request.body;

    if (!isString(path)) {
      throw InvalidParameterError.fromParameter("path");
    }
    const result = await siteReviewService.deleteReview(
      decodedIdToken,
      path
    );

    return new ApiResponse({
      status : 200,
      data : result
    });
  })
);

//TODO title, content, 썸네일 타입검사 필요
export const update_site_review = functions.region("asia-northeast3").https.onRequest(
  withAuthHandler(async (request: Request, response: Response, decodedIdToken: DecodedIdToken): Promise<ApiResponse> => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("!authHeader || !authHeader.startsWith('Bearer ')");
      throw UnauthorizedError.MissingTokenError();
    }

    const { noticeId, reviewId, title, content, thumbnailImageName} = request.body;

    if (!isString(noticeId)) {
      throw InvalidParameterError.fromParameter("noticeId");
    }

    if (!isString(reviewId)) {
      throw InvalidParameterError.fromParameter("reviewId");
    }

    if(!isString(title)){
      throw InvalidParameterError.fromParameter("title");
    }

    if(!isString(content)){
      throw InvalidParameterError.fromParameter("content");
    }

    if(!isString(thumbnailImageName)){
      throw InvalidParameterError.fromParameter("thumbnailImageName");
    }

    const result = await siteReviewService.updateReview({
      token: decodedIdToken,
      noticeId : noticeId,
      reviewId : reviewId,
      title : title,
      content : content,
      thumbnailImageName : thumbnailImageName
    });

    return new ApiResponse({
      status: 200,
      data: result
    });
  })
);


export const increase_site_review_view = functions.region("asia-northeast3").https.onRequest(
  withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
    const {noticeId , siteReviewId} = request.body;

    if (!isString(noticeId)) {
      throw InvalidParameterError.fromParameter("noticeId");
    }

    if (!isString(siteReviewId)) {
      throw InvalidParameterError.fromParameter("siteReviewId");
    }

    const result = await siteReviewService.increaseReviewViewCount(
      noticeId,
      siteReviewId
    );

    return new ApiResponse({
      status : 200,
      data : result
    });
  })
);

export const increase_notice_view_count = functions.region("asia-northeast3").https.onRequest(
  withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
    const {noticeId} = request.body;

    if(!isString(noticeId)) {
      throw InvalidParameterError.fromParameter("noticeId");
    }

    const result = await noticeService.increaseViewCount(noticeId);

    return new ApiResponse({
      status : 200,
      data : result
    });
  })
);

export const like_notice = functions.region("asia-northeast3").https.onRequest(
  withAuthHandler(async (request: Request, response: Response, decodedIdToken: DecodedIdToken): Promise<ApiResponse> => {
    const { noticeId, like} = request.body;

    if (typeof noticeId !== "string") {
      throw InvalidParameterError.fromParameter("noticeId");
    }

    if (typeof like !== "boolean") {
      throw InvalidParameterError.fromParameter("like");
    }

    const result = await noticeService.like(decodedIdToken , noticeId , like);

    return new ApiResponse({
      status: 200,
      data: result
    });
  })
);

export const make_notice_documents = functions
  .region("asia-northeast3")
  .pubsub.schedule("every day 00:00")
  .timeZone("Asia/Seoul")
  .onRun(async (_) => {
  	noticeService.makeNoticeDocuments();
});

export const update_notice_scrap_count = functions.region("asia-northeast3").https.onRequest(
  withAuthHandler(async (request: Request, response: Response, decodedIdToken: DecodedIdToken): Promise<ApiResponse> => {
    const { noticeId, up} = request.body;

    if (!isString(noticeId)) {
      throw InvalidParameterError.fromParameter("noticeId");
    }

    if (!isBoolean(up)) {
      throw InvalidParameterError.fromParameter("up");
    }

    const result = await noticeService.updateNoticeScrapCount(noticeId, up);

    return new ApiResponse({
      status: 200,
      data: result
    });
  })
);

export const delete_all_notice_scrap = functions.region("asia-northeast3").https.onRequest(
  withAuthHandler(async (request: Request, response: Response, decodedIdToken: DecodedIdToken): Promise<ApiResponse> => {
    const result = await scrapService.deleteAllNoticeScarp(decodedIdToken);

    return new ApiResponse({
      status: 200,
      data: result
    });
  })
);

export const update_user_info = functions.region("asia-northeast3").https.onRequest(
  withAuthHandler(async (request: Request, response: Response, decodedIdToken: DecodedIdToken): Promise<ApiResponse> => {

    const {displayName, gender, birth,interestedRegions} = request.body;

    if(displayName){
      await checkDisplayNameAvailability(displayName);
    }

    //#. brith는 string을 TimeStamp형식으로 변환해서 전달
    //TODO 시간 범위 체크를 해야할지 결정하기(14세 이상, 1800년대, 미래 등)
    let birthDate = undefined;
    if(birth){
      try{
        birthDate = TimeFormatter.datStringToDateTime(birth);
      }catch(e){
        throw InvalidParameterError.fromParameter("birth");
      }
    }  

    await userService.updateUserInfo({
      uid : decodedIdToken.uid,
      displayName : displayName,
      gender : gender,
      birth : birthDate,
      interestedRegions : interestedRegions
    });

    return new ApiResponse({
      status: 200,
      data: null
    });
  })
);

//#. 닉네임
export const check_display_name = functions.region("asia-northeast3").https.onRequest(
  withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
    const {displayName} =request.body;

    //#. 닉네임 유효성 검사
    await checkDisplayNameAvailability(displayName);   

    return new ApiResponse({
      status: 200,
      data: null
    });
  })
);

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


// export const make_notice_documents_force = functions.region("asia-northeast3").https.onRequest(
//   withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
//     const result = await noticeService.makeNoticeDocuments();
//     return new ApiResponse({
//       status: 200,
//       data: result
//     });
//   })
// );