import { CollectionReference, DocumentReference } from "firebase-admin/firestore";
import * as firebaseAdmin from 'firebase-admin';
import { NoticeDtoFields } from "./value/notice_dto.fields";

export class NoticeReferences{
    static getNoticeDocument(noticeId : string) : DocumentReference{
      return firebaseAdmin.firestore().collection('notice').doc(noticeId);
    }

    static getNoticeLikeCollection(noticeId : string) : CollectionReference{
        return firebaseAdmin.firestore().collection('notice').doc(noticeId).collection(NoticeDtoFields.like);
    }

    static getNoticeCollection() : CollectionReference{
        return firebaseAdmin.firestore().collection('notice');
    }
}