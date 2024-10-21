export enum Region {
    서울 = "Seoul",
    경기 = "Gyeonggi",
    인천 = "Incheon",
    부산 = "Busan",
    대구 = "Daegu",
    광주 = "Gwangju",
    대전_세종 = "DaejeonSejong",
    울산 = "Ulsan",
    강원 = "Gangwon",
    충북_충남 = "ChungbukChungnam",
    전북_전남 = "JeonbukJeonnam",
    경북_경남 = "GyeongbukGyeongnam",
    제주 = "Jeju"
}

export namespace Region {
    /**
     * 주어진 문자열을 Region 열거형 값으로 변환합니다.
     * @param {string} value - 문자열 값 (예: 'Seoul', 'Busan').
     * @returns {Region | undefined} - 유효한 Region 값 또는 undefined.
     */
    export function fromString(value: string): Region | undefined {
        switch (value) {
            case "Seoul":
                return Region.서울;
            case "Gyeonggi":
                return Region.경기;
            case "Incheon":
                return Region.인천;
            case "Busan":
                return Region.부산;
            case "Daegu":
                return Region.대구;
            case "Gwangju":
                return Region.광주;
            case "DaejeonSejong":
                return Region.대전_세종;
            case "Ulsan":
                return Region.울산;
            case "Gangwon":
                return Region.강원;
            case "ChungbukChungnam":
                return Region.충북_충남;
            case "JeonbukJeonnam":
                return Region.전북_전남;
            case "GyeongbukGyeongnam":
                return Region.경북_경남;
            case "Jeju":
                return Region.제주;
            default:
                return undefined; // 알 수 없는 문자열인 경우
        }
    }

    /**
     * 주어진 코드를 Region 열거형 값으로 변환합니다.
     * @param {string} code - 지역 코드 (예: '100', '200').
     * @returns {Region | undefined} - 유효한 Region 값 또는 undefined.
     */
    export function fromCode(code: string | null | undefined): Region | undefined {
        switch (code) {
            case "100":
                return Region.서울;
            case "200":
                return Region.강원;
            case "300":
            case "338":
                return Region.대전_세종;
            case "312":
            case "360":
                return Region.충북_충남;
            case "400":
                return Region.인천;
            case "410":
                return Region.경기;
            case "500":
                return Region.광주;
            case "513":
            case "560":
                return Region.전북_전남;
            case "600":
                return Region.부산;
            case "621":
            case "712":
                return Region.경북_경남;
            case "680":
                return Region.울산;
            case "690":
                return Region.제주;
            case "700":
                return Region.대구;
            default:
                return undefined; // 알 수 없는 코드인 경우
        }
    }
}
