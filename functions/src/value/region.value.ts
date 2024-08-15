export const RegionValue = {
    SEOUL: '서울',
    GYEONGGI_INCHEON: '경기·인천',
    BUSAN: '부산',
    SEJONG_DAEJEON: '세종·대전',
    GANGWON: '강원',
    CHUNGBUK_CHUNGNAM: '충북·충남',
    GYEONGBUK_GYEONGNAM: '경북·경남',
    JEONBUK_JEONNAM: '전북·전남',
    JEJU: '제주'
} as const;

export type RegionValueType = typeof RegionValue[keyof typeof RegionValue];

/** 값이 RegionValueType의 리스트인지 확인*/
export function validateRegions(regions: any): boolean {
    console.log(regions);
    console.log(typeof regions);
    if (!Array.isArray(regions)) {
        console.log("배열이 아님");
        return false;
    }
    
    return regions.every(region => Object.values(RegionValue).includes(region));
}
