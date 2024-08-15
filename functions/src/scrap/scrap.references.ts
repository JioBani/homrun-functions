import { CollectionReference} from "firebase-admin/firestore";
import * as firebaseAdmin from 'firebase-admin';

export class ScrapReferences{
    static getNoticeScrapCollection( uid : string) : CollectionReference{
        return  firebaseAdmin.firestore()
            .collection('users')
            .doc(uid)
            .collection('scrap')
            .doc('notice')
            .collection('content');
    }
}