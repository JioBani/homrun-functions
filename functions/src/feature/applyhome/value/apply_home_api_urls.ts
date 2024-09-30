import { applyhomeInfoDetailServiceKey } from "../../../sucure/apply_home_info_detail.service_key";
import { APTInfo } from "../model/apt.model";

export class ApplyHomeApiUrls{

    static getAnnouncement(startDate : Date){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${startDate.toISOString().split('T')[0]}&` +
                `serviceKey=${applyhomeInfoDetailServiceKey}`;
    }

    static getAptAnnouncementDetails(info : APTInfo){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancMdl?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=${info.houseManageNumber}&` +
                `cond%5BPBLANC_NO%3A%3AEQ%5D=${info.publicNoticeNumber}&`+
                `serviceKey=${applyhomeInfoDetailServiceKey}`;  
    }

    static getUnrankedRemain(startDate : Date){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getRemndrLttotPblancDetail?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${startDate.toISOString().split('T')[0]}&` +
                `serviceKey=${applyhomeInfoDetailServiceKey}`;
    }

    static getUnrankedRemainDetailByType(info : APTInfo){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getRemndrLttotPblancMdl?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=${info.houseManageNumber}&` +
                `cond%5BPBLANC_NO%3A%3AEQ%5D=${info.publicNoticeNumber}&`+
                `serviceKey=${applyhomeInfoDetailServiceKey}`
    }

    static getOptionalSupply(startDate : Date){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getOPTLttotPblancDetail?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${startDate.toISOString().split('T')[0]}&` +
                `serviceKey=${applyhomeInfoDetailServiceKey}`;
    }
 
    static getOptionalSupplyDetails(info : APTInfo){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getOPTLttotPblancMdl?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=${info.houseManageNumber}&` +
                `cond%5BPBLANC_NO%3A%3AEQ%5D=${info.publicNoticeNumber}&`+
                `serviceKey=${applyhomeInfoDetailServiceKey}`;     
    }

    static getApiUrl(name : ApplyHomeApiName , startDate : Date){
        switch(name){
            case ApplyHomeApiName.AptDetail : return this.getAnnouncement(startDate);
            case ApplyHomeApiName.UnrankedRemainDetail : return this.getUnrankedRemain(startDate);
            case ApplyHomeApiName.OptionalSupplyDetail : return this.getOptionalSupply(startDate);
            default : throw Error(`[ApplyHomeApiUrls.getApiUrl()] 올바르지 않은 api 이름입니다. : ${name}`);
        }
    }
    
    static getDetailApiUrl(name : ApplyHomeApiName, aptModel : APTInfo){
        switch(name){
            case ApplyHomeApiName.AptDetail : return this.getAptAnnouncementDetails(aptModel);
            case ApplyHomeApiName.UnrankedRemainDetail : return this.getUnrankedRemainDetailByType(aptModel);
            case ApplyHomeApiName.OptionalSupplyDetail : return this.getOptionalSupplyDetails(aptModel);
            default : throw Error(`[ApplyHomeApiUrls.getDetailApiUrl()] 올바르지 않은 api 이름입니다. : ${name}`);
        }
    }
}

export enum ApplyHomeApiName{
    Apt,
    AptDetail,
    UnrankedRemain,
    UnrankedRemainDetail,
    OptionalSupply,
    OptionalSupplyDetail
}