/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { AuthService } from "./auth/auth.service";
import * as dotenv from 'dotenv';

//import * as serviceAccount from "@/homerun-3e122-firebase-adminsdk-up403-843b4f161f.json";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
dotenv.config();

var serviceAccount = require(process.env.FB_SERVICE_ACCOUNT as string);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),  
    databaseURL: "https://homerun-3e122-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export const signIn = onRequest(async (request, response) => {
  //logger.info("Hello signIn!", {structuredData: true});
  //response.send("Hello from Firebase!");

  const result = await new AuthService().signIn("",request.body);
  response.send(result);
});


