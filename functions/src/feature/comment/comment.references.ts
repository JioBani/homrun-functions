import { DocumentReference } from "firebase-admin/firestore";

export class CommentReferences{
    static getCommentLikeDocument(commentRef : DocumentReference , userId : string) : DocumentReference{
      return commentRef.collection('likes').doc(userId);
    }
}