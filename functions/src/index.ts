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
import { withApiResponseHandler } from './middleware/api-response-handler';

import * as functions from "firebase-functions";

dotenv.config();

var serviceAccount = require(process.env.FB_SERVICE_ACCOUNT as string);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),  
    databaseURL: "https://homerun-3e122-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const authService = new AuthService();

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


