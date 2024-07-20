import { DecodedIdToken } from 'firebase-admin/auth';
import { HttpError, InternalServerError, UnauthorizedError } from '../error/http.error';
import { ApiResponse } from '../model/api-response';
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";
import * as firebaseAdmin from 'firebase-admin';

export const withApiResponseHandler = (handler: (req: Request, res: Response) => Promise<ApiResponse>) => {
    return async (req: Request, res: Response) => {
      try {
        const result = await handler(req, res);
        res.status(result.status).send(result.toJSON());
      } catch (error) {
        console.log(error);
        if(error instanceof HttpError){
            res.status(error.status).send(
              new ApiResponse({
                status : error.status,
                error : error
              }).toJSON()
            );
          }
          else{
            res.status(500).send(
              new ApiResponse({
                status : 500,
                error : new InternalServerError()
              }).toJSON()
            );
          }
      }
    };
  };

  export const withAuthHandler = (handler: (req: Request, res: Response , decodedIdToken : DecodedIdToken) => Promise<ApiResponse>) => {
    return async (req: Request, res: Response) => {    
  
      try {
        const authHeader = req.headers.authorization;
  
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw UnauthorizedError.MissingTokenError();
        }
    
        var _decodedIdToken : DecodedIdToken;
            
        try{
          _decodedIdToken = await firebaseAdmin.auth().verifyIdToken(authHeader.split(' ')[1],);
        }catch(e){
            throw UnauthorizedError.InvalidTokenError();
        }

        const result = await handler(req, res , _decodedIdToken);

        res.status(result.status).send(result.toJSON());
      } catch (error) {
        console.log(error);
        if(error instanceof HttpError){
            res.status(error.status).send(
              new ApiResponse({
                status : error.status,
                error : error
              }).toJSON()
            );
          }
          else{
            res.status(500).send(
              new ApiResponse({
                status : 500,
                error : new InternalServerError()
              }).toJSON()
            );
          }
      }
    };
  };