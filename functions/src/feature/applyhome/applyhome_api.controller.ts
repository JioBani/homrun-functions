import { withApiResponseHandler } from "../../middleware/api-response-handler";
import { ApiResponse } from "../..//model/api-response";
import { Response} from 'express';
import {Request} from "firebase-functions/v2/https";
import { ApplyHommeApiService } from "./applyhome_api.service";

export class ApplyHomeApiController{

    constructor(private applyHomeApiService : ApplyHommeApiService){}

    getAPTUnrankedRemain = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 2);
        
    
        const reuslt = await this.applyHomeApiService.getAPTUnrankedRemainList(currentDate);

        return new ApiResponse({
          status : 200,
          data : reuslt
        });
    });

    getAPTUnrankedRemainDetails = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
        try{
          const currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - 2);
          
      
          const reuslt = await this.applyHomeApiService.getAPTUnrankedRemainList(currentDate);
  
          let byType; 
          if(reuslt.data![0] != null){
              byType = await this.applyHomeApiService.getAPTUnrankedRemainDetailByTypeList(reuslt.data![0].data!);
          }

          console.log(`[getAPTUnrankedRemainDetails] ${byType?.isSuccess}`);
  
  
          return new ApiResponse({
            status : 200,
            data : byType
          });
        }catch(e){
          return new ApiResponse({
            status : 500,
            data : e
          });
        }
        
    });

    getAptUnrankedRemainInfo = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 2);
      
  
      const result = await this.applyHomeApiService.getUrankedRemainInfo(currentDate);

      return new ApiResponse({
        status : 200,
        data : result
      });
    });

    
    getAPTOptionalSupply = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 2);
        
    
        const reuslt = await this.applyHomeApiService.getAPTOptionalSupplyList(currentDate);

        return new ApiResponse({
          status : 200,
          data : reuslt
        });
    });

    getAPTOptionalSupplyByTypeList = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 2);
        
        const {index} = request.body;
    
        const reuslt = await this.applyHomeApiService.getAPTOptionalSupplyList(currentDate);

        let byType; 
        if(reuslt.data![index] != null){
            byType = await this.applyHomeApiService.getAPTOptionalSupplyByTypeList(reuslt.data![index]!.data!);
            console.log(`[getAPTOptionalSupplyByTypeList] ${JSON.stringify(byType)}`);
        }

        return new ApiResponse({
          status : 200,
          data : JSON.stringify(byType)
        });
    });

    getAPTOptionalSupplyInfo = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 2);
      
  
      const reuslt = await this.applyHomeApiService.getAPTOptionalSupplyInfo(currentDate);

      return new ApiResponse({
        status : 200,
        data : reuslt
      });
  });

    getApt = withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 2);

      //const {index} = request.body;

      //const aptList = await this.applyHomeApiService.getAPTAnnouncementList(currentDate);

      // if(aptList.isSuccess){
      //   const detail = await this.applyHomeApiService.getAptAnnouncementByHouseTypeList(aptList.data![index]!);
      //   return new ApiResponse({
      //     status: 200,
      //     data: {
      //       info : aptList.data![index]!,
      //       details : detail.data
      //     }
      //   });
      // }

      return new ApiResponse({
        status: 200,
        data: null
      });
    });

    getAptAnnnouncement = withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 2);      
      return new ApiResponse({
        status: 200,
        data: (await this.applyHomeApiService.getAPTAnnouncementList(currentDate)).data
      });
    });

    getAptAnnnouncementDetails = withApiResponseHandler(async (request: Request, response: Response): Promise<ApiResponse> => {
      const {index} = request.body;

      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 2);

      const aptList = await this.applyHomeApiService.getAPTAnnouncementList(currentDate);

      if(aptList.isSuccess){
        const detail = await this.applyHomeApiService.getAptAnnouncementByHouseTypeList(aptList.data![index].data!);
        return new ApiResponse({
          status: 200,
          data: {
            info : aptList.data![index]!,
            details : detail.data
          }
        });
      }
      else{
        return new ApiResponse({
          status: 200,
          data: null
        });
      } 
    });

    getAptAnnouncementInfo = withApiResponseHandler(async (request : Request , response : Response) : Promise<ApiResponse>=>{
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 2);
      
  
      const result = await this.applyHomeApiService.getAptAnnouncementInfo(currentDate);

      return new ApiResponse({
        status : 200,
        data : result
      });
    });
}