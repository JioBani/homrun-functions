export class NoticeDocumentResult{
    noticeId : string;
    isSuccess : boolean;
    isGenerated : boolean;
    error : any;

    constructor({ noticeId, isSuccess,isGenerated,error } : { noticeId: string; isSuccess: boolean; isGenerated : boolean,error?: any }) {
        this.noticeId = noticeId;
        this.isSuccess = isSuccess;
        this.isGenerated = isGenerated;
        this.error = error;
    }
}