import { ApplyHomeDto } from "../model/apply_home.dto";
import { ApplyHomeResultStatistics } from "./apply_home_result_statistics";

/**
 *  한국부동산원 청약홈 API 서비스 수신 결과 
 */
export class ApplyHomeResult {
    /**
     * 청약 결과 데이터 배열
     */
    data: (ApplyHomeDto | null)[] | null;

    /**
     * 청약 결과 통계
     */
    statistics: ApplyHomeResultStatistics;

    /**
     * 시작 날짜
     */
    startDate: Date;

    name: string;

    constructor(params: {
        data: (ApplyHomeDto | null)[] | null,
        statistics: ApplyHomeResultStatistics,
        startDate: Date,
        name: string
    }) {
        this.data = params.data;
        this.statistics = params.statistics;
        this.startDate = params.startDate;
        this.name = params.name;
    }
}
