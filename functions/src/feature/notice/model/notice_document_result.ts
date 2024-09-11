export class NoticeDocumentResult{
    noticeId : string;
    isSuccess : boolean;
    isGenerated : boolean;
    isUpdated : boolean;
    isByHouseTypeInfoSuccess : boolean;
    error : any;

    constructor(
        { noticeId, isSuccess,isGenerated,isUpdated,isByHouseTypeInfoSuccess,error } : 
        { noticeId: string; isSuccess: boolean; isGenerated : boolean , isUpdated : boolean , isByHouseTypeInfoSuccess : boolean,error?: any }
    ) {
        this.noticeId = noticeId;
        this.isSuccess = isSuccess;
        this.isGenerated = isGenerated;
        this.isUpdated = isUpdated;
        this.isByHouseTypeInfoSuccess = isByHouseTypeInfoSuccess;
        this.error = error;
    }
}