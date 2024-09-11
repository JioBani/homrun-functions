export class NoticeDocumentResult{
    noticeId : string;
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
            noticeId: string, 
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
}