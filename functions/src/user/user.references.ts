import * as firebaseAdmin from 'firebase-admin';
import { CollectionReference, DocumentReference } from 'firebase-admin/firestore';

export class UserReferences{
    static getUserCollection() : CollectionReference{
        return firebaseAdmin.firestore().collection('users');
    }

    static getUserDocument(uid : string) : DocumentReference{
        return firebaseAdmin.firestore().collection('users').doc(uid);
    }
}