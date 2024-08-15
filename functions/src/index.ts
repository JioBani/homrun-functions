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
import { AuthService } from "./auth/auth.service";

import { SocialProvider } from "./enum/social-provider.enum";
import { ApiResponse } from "./model/api-response";
import { BadRequestError, UnauthorizedError } from "./error/http.error";
import { withApiResponseHandler, withAuthHandler } from './middleware/api-response-handler';

import * as functions from "firebase-functions";
import { CommentService } from './comment/comment.service';
import { SiteReviewService } from './site_review/site_review.service';
import { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseValue } from './value/firebase.value';
import { NoticeService } from './notice/notice.service';
import { UserService } from './user/user.service';
import { Gender } from './enum/gender.enum';
import { ScrapService } from './scrap/scrap.service';
import { validateRegions } from './value/region.value';
import { validateAgeRange } from './value/age_range.value';

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
export const sign_up = functions.region("asia-northeast3").https.onRequest(
  withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError();
    }

    const { social_provider, displayName, gender, ageRange,interestedRegions} = request.body;

    if (!Object.values(SocialProvider).includes(social_provider)) {
      console.log(social_provider);
      throw new BadRequestError({message : 'Invalid social provider'});
    }

   
    if (!displayName) {
      throw BadRequestError.InvalidParameterError("displayName");
    }

    if (!gender || !Object.values(Gender).includes(gender)) {
      throw BadRequestError.InvalidParameterError("gender");
    }

    if (!ageRange || !validateAgeRange(ageRange)) {
      throw BadRequestError.InvalidParameterError("ageRange");
    }

    if(!interestedRegions || !validateRegions(interestedRegions))
    {
      throw BadRequestError.InvalidParameterError("interestedRegions");
    }

    const result = await authService.signUp({
      accessToken : authHeader.split(' ')[1], 
      socialProvider : social_provider,
      displayName : displayName,
      gender : gender,
      ageRange : ageRange,
      interestedRegions : interestedRegions,
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

    if (!doc || typeof state !== 'number') {
      throw BadRequestError.InvalidParameterError("state");
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

    if (!noticeId) {
      throw BadRequestError.InvalidParameterError("noticeId");
    }

    if (!title) {
      throw BadRequestError.InvalidParameterError("title");
    }

     if (!content) {
      throw BadRequestError.InvalidParameterError("content");
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

    if (!path) {
      throw BadRequestError.InvalidParameterError("path");
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

export const update_site_review = functions.region("asia-northeast3").https.onRequest(
  withAuthHandler(async (request: Request, response: Response, decodedIdToken: DecodedIdToken): Promise<ApiResponse> => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("!authHeader || !authHeader.startsWith('Bearer ')");
      throw UnauthorizedError.MissingTokenError();
    }

    const { noticeId, reviewId, title, content, thumbnailImageName} = request.body;

    if (!noticeId) {
      throw BadRequestError.InvalidParameterError("noticeId");
    }

    if (!reviewId) {
      throw BadRequestError.InvalidParameterError("reviewId");
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

    if (!noticeId) {
      throw BadRequestError.InvalidParameterError("noticeId");
    }

    if (!siteReviewId) {
      throw BadRequestError.InvalidParameterError("siteReviewId");
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

    if (!noticeId) {
      throw BadRequestError.InvalidParameterError("noticeId");
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

    if (!noticeId) {
      throw BadRequestError.InvalidParameterError("noticeId");
    }

    if (!like && !(typeof like === "boolean")) {
      throw BadRequestError.InvalidParameterError("like");
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

    if (!noticeId) {
      throw BadRequestError.InvalidParameterError("noticeId");
    }

    if (!up && !(typeof up === "boolean")) {
      throw BadRequestError.InvalidParameterError("up");
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

// export const make_notice_documents_force = functions.region("asia-northeast3").https.onRequest(
//   withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
//     await noticeService.makeNoticeDocuments();
//     return new ApiResponse({
//       status: 200,
//       data: null
//     });
//   })
// );