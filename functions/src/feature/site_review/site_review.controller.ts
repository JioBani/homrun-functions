import { UnauthorizedError, InvalidParameterError } from "../../error/http.error";
import { withApiResponseHandler, withAuthHandler } from "../../middleware/api-response-handler";
import { ApiResponse } from "../../model/api-response";
import { isString } from "../../utils/type_check";
import { SiteReviewService } from "./site_review.service";
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";
import { DecodedIdToken } from "firebase-admin/auth";

export class SiteReviewController{
    constructor(private siteReviewService : SiteReviewService){}

    //#. 현장 리뷰 문서 제작
    makeSiteReviewDocument = withApiResponseHandler(async (
        request : Request , 
        response : Response
    ) : Promise<ApiResponse>=>{
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
    
        const result = await this.siteReviewService.makeDocument(
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
    });

    //#. 현장 리뷰 삭제
    deleteSiteReview = withAuthHandler(async (
        request : Request , 
        response : Response , 
        decodedIdToken : DecodedIdToken
    ) : Promise<ApiResponse>=>{
        const authHeader = request.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          console.log("!authHeader || !authHeader.startsWith('Bearer ')");
          throw UnauthorizedError.MissingTokenError();
        }
    
        const {path} = request.body;
    
        if (!isString(path)) {
          throw InvalidParameterError.fromParameter("path");
        }
        const result = await this.siteReviewService.deleteReview(
          decodedIdToken,
          path
        );
    
        return new ApiResponse({
          status : 200,
          data : result
        });
    });

    //#. 현장 리뷰 업데이트
    updateSiteReview = withAuthHandler(async (
        request: Request, 
        response: Response, 
        decodedIdToken: DecodedIdToken
    ): Promise<ApiResponse> => {
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
        
            const result = await this.siteReviewService.updateReview({
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
        });


    //#. 현장 리뷰 조회수 증가
    increaseSiteReviewView = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
      const {noticeId , siteReviewId} = request.body;
  
      if (!isString(noticeId)) {
        throw InvalidParameterError.fromParameter("noticeId");
      }
  
      if (!isString(siteReviewId)) {
        throw InvalidParameterError.fromParameter("siteReviewId");
      }
  
      const result = await this.siteReviewService.increaseReviewViewCount(
        noticeId,
        siteReviewId
      );
  
      return new ApiResponse({
        status : 200,
        data : result
      });
    });
}