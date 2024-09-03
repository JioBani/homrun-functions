import { Timestamp } from "firebase-admin/firestore";

export class TimeFormatter{
    static datStringToDateTime(dateString: string): Timestamp {
        
        //#. 정규식으로 0000.00.00 형식이 맞는지 확인
        const datePattern = /^\d{4}\.\d{2}\.\d{2}$/;
        if (!datePattern.test(dateString)) {
            throw new Error("Invalid date format. Expected format is yyyy.MM.dd");
        }

        //#. 문자열 분해
        const [year, month, day] = dateString.split('.').map(Number);

        //#. 변환된 year, month, day가 유효한 숫자인지 및 날짜 범위에 맞는지 확인
        if (isNaN(year) || isNaN(month) || isNaN(day) ||
            month < 1 || month > 12 || day < 1 || day > 31) {
            throw new Error("Invalid date components");
        }

        //#. Date 객체 생성 (월은 0부터 시작하므로 -1 필요)
        const date = new Date(year, month - 1, day);

        //#. Date 객체가 실제 날짜를 올바르게 나타내는지 확인
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw new Error("Invalid date");
        }

        //#.  Date 객체를 Timestamp로 변환
        return Timestamp.fromDate(date)
    }    
}