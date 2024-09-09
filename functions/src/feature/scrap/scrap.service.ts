import { DecodedIdToken } from "firebase-admin/auth";
import { ScrapReferences } from "./scrap.references";

export class ScrapService{
       
    //#. 공고 스크랩 전부 삭제
    async deleteAllNoticeScarp(token: DecodedIdToken) {  
        //#. 스크랩 컬렉션 가져오기
        const collection = ScrapReferences.getNoticeScrapCollection(token.uid);
        const snapshots = await collection.get();
    
        //#. batch로 모든 스크랩 삭제하기
        const batch = collection.firestore.batch();
    
        snapshots.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
    
        //#. batch 커밋
        await batch.commit();
    }    

}