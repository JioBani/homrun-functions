import { applyhomeInfoDetailServiceKey } from "../../../sucure/apply_home_info_detail.service_key";
import { AptInfo } from "../model/apt.model";

export class ApplyHomeApiUrls{

    static getAnnouncement(startDate : Date){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${startDate.toISOString().split('T')[0]}&` +
                `serviceKey=${applyhomeInfoDetailServiceKey}`;
    }

    static getAptAnnouncementDetails(info : AptInfo){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancMdl?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=${info.houseManageNumber}&` +
                `cond%5BPBLANC_NO%3A%3AEQ%5D=${info.publicAnnouncementNumber}&`+
                `serviceKey=${applyhomeInfoDetailServiceKey}`;  
    }

    static getUnrankedRemain(startDate : Date){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getRemndrLttotPblancDetail?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${startDate.toISOString().split('T')[0]}&` +
                `serviceKey=${applyhomeInfoDetailServiceKey}`;
    }

    static getUnrankedRemainDetailByType(info : AptInfo){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getRemndrLttotPblancMdl?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=${info.houseManageNumber}&` +
                `cond%5BPBLANC_NO%3A%3AEQ%5D=${info.publicAnnouncementNumber}&`+
                `serviceKey=${applyhomeInfoDetailServiceKey}`
    }

    static getOptionalSupply(startDate : Date){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getOPTLttotPblancDetail?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=${startDate.toISOString().split('T')[0]}&` +
                `serviceKey=${applyhomeInfoDetailServiceKey}`;
    }
 
    static getOptionalSupplyDetails(info : AptInfo){
        return  `https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getOPTLttotPblancMdl?` +
                `page=1&` +
                `perPage=500&` +
                `cond%5BHOUSE_MANAGE_NO%3A%3AEQ%5D=${info.houseManageNumber}&` +
                `cond%5BPBLANC_NO%3A%3AEQ%5D=${info.publicAnnouncementNumber}&`+
                `serviceKey=${applyhomeInfoDetailServiceKey}`;     
    }
}