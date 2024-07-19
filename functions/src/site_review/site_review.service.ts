import { DecodedIdToken } from "firebase-admin/auth";
import * as firebaseAdmin from 'firebase-admin';
import { UnauthorizedError } from '../error/http.error';
import { SiteReviewReferences } from "./site_review.references";
import { DocumentReference } from "firebase-admin/firestore";

export class SiteReviewService{
    async makeDocument(token : string, noticeId : string, title : string , content : string) : Promise<String>{
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
        });

        //#2.3. 이미지 경로 업데이트 하기

        await docRef.update({imagesRefPath : SiteReviewReferences.getReviewImagePath(noticeId , docRef.id)});

        //#3. 문서 ref 반환
        return docRef.path;
    }
}