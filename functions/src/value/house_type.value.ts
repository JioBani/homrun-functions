export enum HouseType {
    국민주택 = "NationalHousing",
    민영주택 = "PrivateHousing",
    신혼희망타운 = "NewlywedsHopeTown",
    분양전환임대주택 = "ConvertibleLeaseHousing",
}

export namespace HouseType {
    export function fromString(value: string): HouseType | undefined{
        switch (value) {
            case "NationalHousing":
                return HouseType.국민주택;
            case "PrivateHousing":
                return HouseType.민영주택;
            case "NewlywedsHopeTown":
                return HouseType.신혼희망타운;
            case "ConvertibleLeaseHousing":
                return HouseType.분양전환임대주택;
            default:
                return undefined; // 알 수 없는 문자열인 경우
        }
    }
}