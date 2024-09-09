import { DocumentSnapshot } from "firebase-admin/firestore";
import { CommentDto } from "./comment.dto";

interface CommentProps {
  id: string;
  commentDto: CommentDto;
  likeState?: number | null;
  documentSnapshot: DocumentSnapshot;
  replyCount: number;
}

class Comment {
  id: string;
  commentDto: CommentDto;
  likeState?: number | null;
  documentSnapshot: DocumentSnapshot;
  replyCount: number;

  constructor({ id, commentDto, likeState = null, documentSnapshot, replyCount }: CommentProps) {
    this.id = id;
    this.commentDto = commentDto;
    this.likeState = likeState;
    this.documentSnapshot = documentSnapshot;
    this.replyCount = replyCount;
  }

  static fromMap({ id, map, likeState, replyCount, documentSnapshot }: { 
    id: string; 
    map: { [key: string]: any }; 
    likeState: number; replyCount: 
    number; 
    documentSnapshot: DocumentSnapshot; 
    }): 
    Comment {
    return new Comment({
      id: id,
      commentDto: CommentDto.fromMap(map),
      likeState: likeState,
      replyCount: replyCount,
      documentSnapshot: documentSnapshot,
    });
  }

  static error(documentSnapshot: DocumentSnapshot): Comment {
    return new Comment({
      id: 'error',
      commentDto: CommentDto.error(),
      likeState: null,
      replyCount: 0,
      documentSnapshot: documentSnapshot,
    });
  }

  toMap(): { [key: string]: any } {
    return {
      commentId: this.id,
      commentDto: this.commentDto.toMap(),
      likeState: this.likeState,
      replyCount: this.replyCount,
      documentSnapshot: this.documentSnapshot,
    };
  }

  isError(): boolean {
    return this.id === 'error';
  }
}

export { Comment };
