import { logger } from "firebase-functions/v1";
import { Region } from "../../value/region.value";
import { RegionGyeonggi } from "../../value/region_gyeonggi.value";
import { RegionSeoul} from "../../value/region_seoul.value";
import * as firebaseAdmin from "firebase-admin";

export class PushNotificationService{
    async sendNotifictionWithInfo(param : {
        region : Region,
        regionDetails : RegionSeoul | RegionGyeonggi | null, 
        houseType : string,
        title : string,
        content : string,
    }){

        //#. 서울인 경우 서울전지역으로 발송
        if(param.region == Region.서울){
            await this.sendNotificationWithCondition({
                condition : this.makeTopicString(Region.서울, param.houseType),
                title : "서울지역 공고입니다.",
                content : "서울지역 공고입니다.",
            });
        }
        else if(param.region == Region.경기){ //TODO 경기로 분리
            await this.sendNotificationWithCondition({
                condition : this.makeTopicString(Region.경기, param.houseType),
                title : "경기지역 공고입니다.",
                content : "경기지역 공고입니다.",
            });
        }
        else{
            //#. 지역 알림 발송
            await this.sendNotificationWithCondition({
                condition : this.makeTopicString(param.region, param.houseType),
                title : `${param.region}지역 공고입니다.`,
                content :  `${param.region}지역 공고입니다.`,
            });
        }        

        //#. 서울 또는 경기면 세부 지역 전송
        if((param.region == Region.서울 || param.region == Region.경기) && param.regionDetails != null){
            await this.sendNotificationWithCondition({
                condition : this.makeTopicString(param.regionDetails, param.houseType),
                title :  `${param.regionDetails}지역 공고입니다.`,
                content :  `${param.regionDetails}지역 공고입니다.`,
            });
        } 
    }

    private makeTopicString(region : string, houseType : string) : string{
        return `'${region}' in topics && '${houseType}' in topics`;
    }

    //#. 알림 보내기 함수
    private async sendNotificationWithCondition(param : {
        condition : string, 
        title : string, 
        content : string,
    }) : Promise<void>{
        try{
            await firebaseAdmin.messaging().send({
                condition : param.condition,
                notification: {
                  title: param.title,
                  body: param.content,
                },
                android:{
                  priority:"high",
                  notification: {
                    channelId: "homerun"
                  }
                },
                apns: {
                  payload: {
                      aps: {
                        badge: 2.0,
                        "apns-priority": 5,
                          sound: 'default'
                      },
                  },
                },
            });
        }
        catch(e){
            throw Error(`[PushNotificationService.sendNotification()] ${param.condition} 발송오류\n${e}`);
        }       

        logger.log(`
        [PushNotificationService.sendNotification()] 
        알림 발송
        topic : ${param.condition}
        title : ${param.title}
        content : ${param.content}
        `)
    }

    async sendNotifiction(param : {
        topic : string, 
        title : string, 
        content : string,
    }) : Promise<void>{
        try{
            await firebaseAdmin.messaging().send({
                topic : param.topic,
                notification: {
                  title: param.title,
                  body: param.content,
                },
                android:{
                  priority:"high",
                  notification: {
                    channelId: "homerun"
                  }
                },
                apns: {
                  payload: {
                      aps: {
                        badge: 2.0,
                        "apns-priority": 5,
                          sound: 'default'
                      },
                  },
                },
            });
        }
        catch(e){
            throw Error(`[PushNotificationService.sendNotification()] ${param.topic} 발송오류\n${e}`);
        }       

        logger.log(`
        [PushNotificationService.sendNotification()] 
        알림 발송
        topic : ${param.topic}
        title : ${param.title}
        content : ${param.content}
        `)
    }
}
