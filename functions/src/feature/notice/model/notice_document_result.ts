export class NoticeDocumentResult{
    noticeId : string | null;
    isSuccess : boolean;
    isGenerated : boolean;
    isUpdated : boolean;
    isByHouseTypeInfoSuccess : boolean;
    isProcessedAPTAnnouncementByHouseTypeSuccess : boolean;
    isProcessedAPTAnnouncementByHouseTypeHasCountError : boolean;
    error : any;

    constructor(
        { 
            noticeId, 
            isSuccess,
            isGenerated,
            isUpdated,
            isByHouseTypeInfoSuccess,
            isProcessedAPTAnnouncementByHouseTypeSuccess,
            isProcessedAPTAnnouncementByHouseTypeHasCountError,
            error 
        } : 
        { 
            noticeId: string | null, 
            isSuccess: boolean,
            isGenerated : boolean, 
            isUpdated : boolean , 
            isByHouseTypeInfoSuccess :boolean,
            isProcessedAPTAnnouncementByHouseTypeSuccess : boolean,
            isProcessedAPTAnnouncementByHouseTypeHasCountError : boolean
            error?: any 
        }
    ) {
        this.noticeId = noticeId;
        this.isSuccess = isSuccess;
        this.isGenerated = isGenerated;
        this.isUpdated = isUpdated;
        this.isByHouseTypeInfoSuccess = isByHouseTypeInfoSuccess;
        this.isProcessedAPTAnnouncementByHouseTypeSuccess = isProcessedAPTAnnouncementByHouseTypeSuccess;
        this.isProcessedAPTAnnouncementByHouseTypeHasCountError = isProcessedAPTAnnouncementByHouseTypeHasCountError;
        this.error = error;
    }

    static fromAllFailure(data : {noticeId : string | null , error : any}){
        return new NoticeDocumentResult({
            noticeId : data.noticeId,
            isSuccess : false,
            isGenerated : false,
            isUpdated : false,
            isByHouseTypeInfoSuccess : false,
            isProcessedAPTAnnouncementByHouseTypeSuccess : false,
            isProcessedAPTAnnouncementByHouseTypeHasCountError : false,
            error : data.error
        });  
    }
}