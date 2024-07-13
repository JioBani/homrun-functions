import { DocumentReference, Timestamp } from 'firebase-admin/firestore';
import { CommentFields } from '../values/comment.fields.value';

interface CommentDtoProps {
  content: string;
  uid: string;
  date: Timestamp;
  replyTarget?: DocumentReference | null;
  likes?: number | null;
  dislikes?: number | null;
}

export class CommentDto {
  content: string;
  uid: string;
  date: Timestamp;
  replyTarget?: DocumentReference | null;
  likes?: number | null;
  dislikes?: number | null;

  constructor({ content, uid, date, replyTarget = null, likes = null, dislikes = null }: CommentDtoProps) {
    this.content = content;
    this.uid = uid;
    this.date = date;
    this.replyTarget = replyTarget;
    this.likes = likes;
    this.dislikes = dislikes;
  }

  static fromMap(map: { [key: string]: any }): CommentDto {
    return new CommentDto({
      date: map[CommentFields.date],
      likes: map[CommentFields.likes],
      replyTarget: map[CommentFields.replyTarget],
      dislikes: map[CommentFields.dislikes],
      content: map[CommentFields.content],
      uid: map[CommentFields.uid],
    });
  }

  static error(): CommentDto {
    return new CommentDto({
      date: Timestamp.now(),
      likes: null,
      dislikes: null,
      content: '',
      uid: '',
    });
  }

  static test(): CommentDto {
    return new CommentDto({
      date: Timestamp.now(),
      likes: 0,
      dislikes: 0,
      replyTarget: null,
      content: '청년특공 어떻게 될까요? 부모님과 함께 살고 있는데도 가능할까요? 부린이라 모르는게 너무 많아요....ㅠ_ㅠ',
      uid: 'test',
    });
  }

  toMap(): { [key: string]: any } {
    return {
      [CommentFields.content]: this.content,
      [CommentFields.uid]: this.uid,
      [CommentFields.date]: this.date,
      [CommentFields.likes]: this.likes,
      [CommentFields.dislikes]: this.dislikes,
      [CommentFields.replyTarget]: this.replyTarget,
    };
  }
}