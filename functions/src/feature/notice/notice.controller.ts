import { InvalidParameterError } from "../../error/http.error";
import { withApiResponseHandler, withAuthHandler } from "../../middleware/api-response-handler";
import { ApiResponse } from "../../model/api-response";
import { isString, isBoolean } from "../../utils/type_check";
import { DecodedIdToken } from "firebase-admin/auth";
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";
import { NoticeService } from "./notice.service";
import { ScrapService } from "../scrap/scrap.service";

export class NoticeController{

    constructor(
        private noticeService : NoticeService,
        private scrapService : ScrapService
    ){}


    increaseNoticeViewCount = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
        const {noticeId} = request.body;
    
        if(!isString(noticeId)) {
          throw InvalidParameterError.fromParameter("noticeId");
        }
    
        const result = await this.noticeService.increaseViewCount(noticeId);
    
        return new ApiResponse({
          status : 200,
          data : result
        });
      });
            
      likeNotice = withAuthHandler(async (request: Request, response: Response, decodedIdToken: DecodedIdToken): Promise<ApiResponse> => {
        const { noticeId, like} = request.body;
    
        if (typeof noticeId !== "string") {
          throw InvalidParameterError.fromParameter("noticeId");
        }
    
        if (typeof like !== "boolean") {
          throw InvalidParameterError.fromParameter("like");
        }
    
        const result = await this.noticeService.like(decodedIdToken , noticeId , like);
    
        return new ApiResponse({
          status: 200,
          data: result
        });
      });
      
      
      updateNoticeScrapCount = withAuthHandler(async (request: Request, response: Response, decodedIdToken: DecodedIdToken): Promise<ApiResponse> => {
        const { noticeId, up} = request.body;
    
        if (!isString(noticeId)) {
          throw InvalidParameterError.fromParameter("noticeId");
        }
    
        if (!isBoolean(up)) {
          throw InvalidParameterError.fromParameter("up");
        }
    
        const result = await this.noticeService.updateNoticeScrapCount(noticeId, up);
    
        return new ApiResponse({
          status: 200,
          data: result
        });
    });
      
    deleteAllNoticeScrap = withAuthHandler(async (
        request: Request, 
        response: Response, 
        decodedIdToken: DecodedIdToken
    ): Promise<ApiResponse> => {
        const result = await this.scrapService.deleteAllNoticeScarp(decodedIdToken);

        return new ApiResponse({
            status: 200,
            data: result
        });
    });

    updateAptInfo = withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
      const result = await this.noticeService.updateAptInfo();
      return new ApiResponse({
        status: 200,
        data: result
      });
    });

    // updateUnrankedRemainDocument = withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
    //   const result = await this.noticeService.updateUrankedRemainDocument();
    //   return new ApiResponse({
    //     status: 200,
    //     data: result
    //   });
    // });
}