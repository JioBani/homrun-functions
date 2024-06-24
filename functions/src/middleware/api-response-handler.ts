import { HttpError, InternalServerError } from '../error/http.error';
import { ApiResponse } from '../model/api-response';
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";

export const withApiResponseHandler = (handler: (req: Request, res: Response) => Promise<ApiResponse>) => {
    return async (req: Request, res: Response) => {
      try {
        const result = await handler(req, res);
        res.status(result.status).send(result.toJSON());
      } catch (error) {
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