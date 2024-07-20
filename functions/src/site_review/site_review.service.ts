import { DecodedIdToken } from "firebase-admin/auth";
import * as firebaseAdmin from 'firebase-admin';
import { ForbiddenError, UnauthorizedError } from '../error/http.error';
import { SiteReviewReferences } from "./site_review.references";
import { DocumentReference } from "firebase-admin/firestore";
import { SiteReviewFields } from "./value/site_review.fields";

export class SiteReviewService{
    async makeDocument(
        token : string, 
        noticeId : string, 
        title : string , 
        content : string , 
        thumbnailImageName : string | undefined
    ) : Promise<String>{
        //#1. 유저 확인
        var uid : DecodedIdToken;
        
        try{
            uid = await firebaseAdmin.auth().verifyIdToken(token);
        }catch(e){
            throw UnauthorizedError.InvalidTokenError();
        }

        //#2. 문서 만들기

        //#2.1. 컬렉션 가져오기
        var collection = SiteReviewReferences.getReviewCollection(noticeId);
    
        //#2.2. 문서 만들기
        var docRef : DocumentReference = await collection.add({
            noticeId: noticeId,
            title: title,
            content: content,
            writer: uid.uid,
            view: 0,
            imagesRefPath: "",
            thumbnailRefPath : "",
        });

        //#2.3. 이미지 경로 업데이트 하기

        if(thumbnailImageName){
            await docRef.update({
                imagesRefPath : SiteReviewReferences.getReviewImagePath(noticeId , docRef.id),
                thumbnailRefPath : `${SiteReviewReferences.getReviewImagePath(noticeId , docRef.id)}/${thumbnailImageName}`
            });
        }
        else{
            await docRef.update({
                imagesRefPath : SiteReviewReferences.getReviewImagePath(noticeId , docRef.id),
            });
        }

        
        //#3. 문서 ref 반환
        return docRef.path;
    }

    async deleteReview(token : DecodedIdToken, path : string) : Promise<void>{
        //TODO 이미 삭제된 문서인지 예외를 던지도록
        
        //#. 리뷰 문서 가져오기
        const doc = await firebaseAdmin.firestore().doc(path).get();       
    
        //#. 리뷰 소유권 확인
        if(doc.data()?.[SiteReviewFields.writer] !== token.uid){
            throw ForbiddenError.UnauthorizedResourceError();
        }

        //#. 리뷰 문서 삭제하기
        await firebaseAdmin.firestore().doc(path).delete();

        //#. 이미지 삭제하기
        const imagePath = doc.data()?.[SiteReviewFields.imagesRefPath];

        if (imagePath) {
            const bucket = firebaseAdmin.storage().bucket();
            const [files] = await bucket.getFiles({ prefix: imagePath });
    
            const deletePromises = files.map(file => file.delete());
            Promise.all(deletePromises).catch(error=>{
                console.error("Error deleting images:", error);
            });
        }      
    }
}