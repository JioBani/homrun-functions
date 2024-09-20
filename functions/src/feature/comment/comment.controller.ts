import { UnauthorizedError, InvalidParameterError } from "../..//error/http.error";
import { withApiResponseHandler } from "../..//middleware/api-response-handler";
import { ApiResponse } from "../../model/api-response";
import { isString, isNumber } from "../../utils/type_check";
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { CommentService } from "./comment.service";

export class CommentController{

    constructor(private commentService : CommentService){}
    
    updateLikeState = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
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
    
        const result = await this.commentService.updateLikeState(
          authHeader.split(' ')[1],
          docRef,
          state
        );
    
        return new ApiResponse({
          status : 200,
          data : result
        });
      })
}