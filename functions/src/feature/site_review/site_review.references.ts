import { CollectionReference, DocumentReference } from "firebase-admin/firestore";
import * as firebaseAdmin from 'firebase-admin';

export class SiteReviewReferences{
    static getReviewCollection(noticeId : string) : CollectionReference{
      return firebaseAdmin.firestore().collection('site_review').doc(noticeId).collection('review');
    }

    static getReviewImagePath(noticeId : string , docId : string) : string{
        return `site_review/${noticeId}/${docId}`;
    }

    static getReviewDocument(noticeId : string , reviewId : string) : DocumentReference{
      return firebaseAdmin.firestore().collection('site_review').doc(noticeId).collection('review').doc(reviewId);
    }

    static getThumbnailImagePath(noticeId : string , reviewId : string , thumbnailImageName : string) : string{
      return `${SiteReviewReferences.getReviewImagePath(noticeId , reviewId)}/${thumbnailImageName}`
    }
}