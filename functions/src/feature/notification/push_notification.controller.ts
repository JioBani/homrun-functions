import { withApiResponseHandler } from "../../middleware/api-response-handler";
import { ApiResponse } from "../../model/api-response";
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";
import { PushNotificationService } from "./push_notification.service";
import { HouseType } from "../../value/house_type.value";
import { InvalidParameterError } from "../../error/http.error";
import { Region } from "../../value/region.value";
import { RegionSeoul } from "../../value/region_seoul.value";
import { RegionGyeonggi } from "../../value/region_gyeonggi.value";
import { fiterNull } from "../../common/fiter_null.utility";

export class PushNotificationController{
    
    constructor(private pushNotificationService : PushNotificationService){}

     //#. 현장 리뷰 문서 제작
     send = withApiResponseHandler(async (
        request : Request , 
        response : Response
    ) : Promise<ApiResponse>=>{    
        const { region, regionDetails, houseType ,title, content} = request.body;       
        
        let regionDetailsType = null;

        if(regionDetails != null){
            regionDetailsType = RegionSeoul.fromString(regionDetails);

            if(regionDetailsType === undefined){
                regionDetailsType = RegionGyeonggi.fromString(regionDetails);

                if(regionDetailsType === undefined){
                    throw new InvalidParameterError(`Invalue regionDetails : ${regionDetails}`);
                }
            }
        }

        await this.pushNotificationService.sendNotifictionWithInfo({
            region : fiterNull(
                Region.fromString(region), 
                () => { throw new InvalidParameterError(`Invalue region : ${region}`); 
            }),
            regionDetails : regionDetailsType,
            houseType :  fiterNull(
                HouseType.fromString(houseType), 
                () => { throw new InvalidParameterError(`Invalue houseType : ${houseType}`); 
            }),
            title : title,
            content : content
        });
    
        return new ApiResponse({
          status : 200,
          data : null
        });
    });

    sendTest = withApiResponseHandler(async (
        request : Request , 
        response : Response
    ) : Promise<ApiResponse>=>{    
        const {topic} = request.body;       

        await this.pushNotificationService.sendNotifiction({
            topic : topic,
            title : topic,
            content : topic
        });
    
        return new ApiResponse({
          status : 200,
          data : null
        });
    });
}