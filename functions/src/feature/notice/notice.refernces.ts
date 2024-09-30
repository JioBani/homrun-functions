import { CollectionReference, DocumentReference} from "firebase-admin/firestore";
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

    static getNoticeScrapCollection(noticeId : string , uid : string) : CollectionReference{
        return  firebaseAdmin.firestore()
            .collection('notice')
            .doc(noticeId)
            .collection('scrap')
            .doc('notice')
            .collection('content');
    }

    static getAptInfoUploadResultCollection() : CollectionReference{
        return  firebaseAdmin.firestore().collection('apt_info_upload_result');
    }
}