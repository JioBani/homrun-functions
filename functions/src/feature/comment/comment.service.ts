import * as dotenv from 'dotenv';
import * as firebaseAdmin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import { DocumentReference} from 'firebase-admin/firestore';
import { LikeFields } from './values/like.fields.value';
import { CommentFields } from './values/comment.fields.value';
import { InvalidParameterError, UnauthorizedError } from '../../error/http.error';
import { CommentReferences } from './comment.references';

//TODO error 코드

dotenv.config();

export class CommentService {    

    async updateLikeState(customToken : string, doc : DocumentReference, state : number){

        var uid : DecodedIdToken;
        

        if(!(state === -1 || state === 0 || state === 1)){
            throw InvalidParameterError.fromParameter('state');
        }

        try{
            uid = await firebaseAdmin.auth().verifyIdToken(customToken);
        }catch(e){
            throw UnauthorizedError.InvalidTokenError();
        }

        try{
            uid = await firebaseAdmin.auth().verifyIdToken(customToken);

            let likeChange = 0;
            let dislikeChange = 0;

        await firebaseAdmin.firestore().runTransaction(async (transaction) => {
            const likeRef = CommentReferences.getCommentLikeDocument(doc , uid.uid);
            const likeSnapshot = await transaction.get(likeRef);    

            let previousLikeValue = 0;
            if (likeSnapshot.exists) {
                previousLikeValue = likeSnapshot.data()?.[LikeFields.value];
            }

            if (previousLikeValue !== state) {
                if (state === 0) {
                    transaction.delete(likeRef);
                } else {
                    transaction.set(likeRef, {
                        [LikeFields.value]: state,
                        [LikeFields.timestamp]: firebaseAdmin.firestore.Timestamp.now()
                    });
                }

                if (previousLikeValue === 1) likeChange -= 1;
                if (previousLikeValue === -1) dislikeChange -= 1;
                if (state === 1) likeChange += 1;
                if (state === -1) dislikeChange += 1;

                transaction.update(doc, {
                    [CommentFields.likes]: firebaseAdmin.firestore.FieldValue.increment(likeChange),
                    [CommentFields.dislikes]: firebaseAdmin.firestore.FieldValue.increment(dislikeChange),
                });
            }
        });  

        return {
            'likeState' : state,
            'likeChange' : likeChange,
            'dislikeChange' : dislikeChange
        }
        }catch(e){
            console.log(e);
            throw e;
        }
    }

}
