import { CollectionReference } from "firebase-admin/firestore";
import * as firebaseAdmin from 'firebase-admin';

export class SiteReviewReferences{
    static getReviewCollection(noticeId : string) : CollectionReference{
      return firebaseAdmin.firestore().collection('site_review').doc(noticeId).collection('review');
    }

    static getReviewImagePath(noticeId : string , docId : string) : string{
        return `site_review/${noticeId}/${docId}/`;
    }
}