import { TimeFormatter } from "../../utils/time_formatter";
import { Timestamp } from "firebase-admin/firestore";
import { APTAnnouncementFields } from "./apt_announcement.fields";

//TODO string | null 형 필드에 undefind가 들어갔을때 정상적으로 firebase에 저장되는지 확인 필요함
export class APTAnnouncement {
  /**
   * 주택관리번호
   * @type {string}
   */
  houseManageNumber: string;

  /**
   * 공고번호
   * @type {string}
   */
  publicAnnouncementNumber: string;

  /**
   * 주택 구분 코드
   * @type { string | null;}
   */
  houseSectionCode?: string | null;

  /**
   * 공급 지역명
   * @type { string | null;}
   */
  subscriptionAreaName?:  string | null;

  /**
   * 모집 공고일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  recruitmentPublicAnnouncementDate?: Timestamp | null;

  /**
   * 주택명
   * @type { string | null}
   */
  houseName?:  string | null;

  /**
   * 주택 구분 코드명
   * @type { string | null}
   */
  houseSectionName?:  string | null;

  /**
   * 주택 상세 구분 코드
   * @type { string | null}
   */
  houseDetailSectionCode?:  string | null;

  /**
   * 주택 상세 구분 코드명
   * @type { string | null}
   */
  houseDetailSectionName?:  string | null;

  /**
   * 분양 구분 코드
   * @type { string | null}
   */
  rentalSectionCode?:  string | null;

  /**
   * 분양 구분 코드명
   * @type { string | null}
   */
  rentalSectionName?:  string | null;

  /**
   * 공급 지역 코드
   * @type { string | null}
   */
  subscriptionAreaCode?:  string | null;

  /**
   * 공급 위치 우편번호
   * @type { string | null}
   */
  supplyLocationZipCode?:  string | null;

  /**
   * 공급 위치 주소
   * @type { string | null}
   */
  supplyLocationAddress?:  string | null;;

  /**
   * 공급 규모 (가구 수)
   * @type {number | null}
   */
  totalSupplyHouseholdCount?: number | null;

  /**
   * 청약 접수 시작일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  applicationReceptionStartDate?: Timestamp | null;

  /**
   * 청약 접수 종료일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  applicationReceptionEndDate?: Timestamp | null;

  /**
   * 특별 공급 접수 시작일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  specialSupplyReceptionStartDate?: Timestamp | null;

  /**
   * 특별 공급 접수 종료일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  specialSupplyReceptionEndDate?: Timestamp | null;

  /**
   * 1순위 해당지역 접수 시작일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  generalRank1CorrespondingAreaReceptionStartDate?: Timestamp | null;

  /**
   * 1순위 해당지역 접수 종료일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  generalRank1CorrespondingAreaReceptionEndDate?: Timestamp | null;

  /**
   * 1순위 기타지역 접수 시작일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  generalRank1OtherAreaReceptionStartDate?: Timestamp | null;

  /**
   * 1순위 기타지역 접수 종료일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  generalRank1OtherAreaReceptionEndDate?: Timestamp | null;

  /**
   * 2순위 해당지역 접수 시작일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  generalRank2CorrespondingAreaReceptionStartDate?: Timestamp | null;

  /**
   * 2순위 해당지역 접수 종료일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  generalRank2CorrespondingAreaReceptionEndDate?: Timestamp | null;

  /**
   * 당첨자 발표일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  prizeWinnerAnnouncementDate?: Timestamp | null;

  /**
   * 계약 시작일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  contractConclusionStartDate?: Timestamp | null;

  /**
   * 계약 종료일 (Firebase Timestamp)
   * @type {Timestamp | null}
   */
  contractConclusionEndDate?: Timestamp | null;

  /**
   * 홈페이지 주소
   * @type { string | null}
   */
  homepageAddress?:  string | null;

  /**
   * 건설업체명 (시공사)
   * @type { string | null}
   */
  constructionEnterpriseName?:  string | null;

  /**
   * 문의처 전화번호
   * @type { string | null}
   */
  inquiryTelephone?:  string | null;

  /**
   * 사업주체명 (시행사)
   * @type { string | null}
   */
  businessEntityName?:  string | null;

  /**
   * 입주 예정 월
   * @type { string | null}
   */
  moveInPrearrangeYearMonth?:  string | null;

  /**
   * 투기 과열 지구 여부
   * @type { string | null}
   */
  speculationOverheatedDistrict?:  string | null;

  /**
   * 조정 대상 지역 여부
   * @type { string | null}
   */
  marketAdjustmentTargetAreaSection?:  string | null;

  /**
   * 분양가 상한제 여부
   * @type { string | null}
   */
  priceCapApplication?:  string | null;

  /**
   * 정비 사업 여부
   * @type { string | null}
   */
  redevelopmentBusiness?:  string | null;

  /**
   * 공공 주택 지구 여부
   * @type { string | null}
   */
  publicHousingDistrict?:  string | null;

  /**
   * 대규모 택지 개발 지구 여부
   * @type { string | null}
   */
  largeScaleDevelopmentDistrict?:  string | null;

  /**
   * 수도권 내 민영 공공주택지구 여부
   * @type { string | null}
   */
  capitalRegionPrivatePublicHousingDistrict?:  string | null;

  /**
   * 공공주택 특별법 적용 여부
   * @type { string | null}
   */
  publicHousingSpecialLawApplication?:  string | null;

  /**
   * 분양 정보 URL
   * @type { string | null}
   */
  publicAnnouncementUrl?:  string | null;

  constructor(data: Partial<APTAnnouncement>) {
    Object.assign(this, data);
    this.houseManageNumber = data.houseManageNumber as string;
    this.publicAnnouncementNumber = data.publicAnnouncementNumber as string;
  }

  static fromMap(map: { [key: string]: any }): APTAnnouncement {
    const houseManageNumber = map[APTAnnouncementFields.houseManageNumber] as string;

    if(houseManageNumber == null){
      throw Error('[APTAnnouncement.fromMap()] houseManageNumber 가 null 또는 undefind 입니다.');
    }

    const publicAnnouncementNumber = map[APTAnnouncementFields.publicAnnouncementNumber] as string;

    if(publicAnnouncementNumber == null){
      throw Error('[APTAnnouncement.fromMap()] publicAnnouncementNumber 가 null 또는 undefind 입니다.');
    }
    
    return new APTAnnouncement(
      {
      houseManageNumber: houseManageNumber,
      publicAnnouncementNumber: publicAnnouncementNumber!,
      houseSectionCode: map[APTAnnouncementFields.houseSectionCode] as string,
      subscriptionAreaName: map[APTAnnouncementFields.subscriptionAreaName] as string,
      recruitmentPublicAnnouncementDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.recruitmentPublicAnnouncementDate] as string),
      houseName: map[APTAnnouncementFields.houseName] as string,
      houseSectionName: map[APTAnnouncementFields.houseSectionName] as string,
      houseDetailSectionCode: map[APTAnnouncementFields.houseDetailSectionCode] as string,
      houseDetailSectionName: map[APTAnnouncementFields.houseDetailSectionName] as string,
      rentalSectionCode: map[APTAnnouncementFields.rentalSectionCode] as string,
      rentalSectionName: map[APTAnnouncementFields.rentalSectionName] as string,
      subscriptionAreaCode: map[APTAnnouncementFields.subscriptionAreaCode] as string,
      supplyLocationZipCode: map[APTAnnouncementFields.supplyLocationZipCode] as string,
      supplyLocationAddress: map[APTAnnouncementFields.supplyLocationAddress] as string,
      totalSupplyHouseholdCount: map[APTAnnouncementFields.totalSupplyHouseholdCount] as number,
      applicationReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.applicationReceptionStartDate] as string),
      applicationReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.applicationReceptionEndDate] as string),
      specialSupplyReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.specialSupplyReceptionStartDate] as string),
      specialSupplyReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.specialSupplyReceptionEndDate] as string),
      generalRank1CorrespondingAreaReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.generalRank1CorrespondingAreaReceptionStartDate] as string),
      generalRank1CorrespondingAreaReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.generalRank1CorrespondingAreaReceptionEndDate] as string),
      generalRank1OtherAreaReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.generalRank1OtherAreaReceptionStartDate] as string),
      generalRank1OtherAreaReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.generalRank1OtherAreaReceptionEndDate] as string),
      generalRank2CorrespondingAreaReceptionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.generalRank2CorrespondingAreaReceptionStartDate] as string),
      generalRank2CorrespondingAreaReceptionEndDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.generalRank2CorrespondingAreaReceptionEndDate] as string),
      prizeWinnerAnnouncementDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.prizeWinnerAnnouncementDate] as string),
      contractConclusionStartDate: TimeFormatter.trySleshStringToFirebaseTimestamp(map[APTAnnouncementFields.contractConclusionStartDate] as string),
      contractConclusionEndDate: TimeFormatter.sleshStringToFirebaseTimestamp(map[APTAnnouncementFields.contractConclusionEndDate] as string),
      homepageAddress: map[APTAnnouncementFields.homepageAddress] as string,
      constructionEnterpriseName: map[APTAnnouncementFields.constructionEnterpriseName] as string,
      inquiryTelephone: map[APTAnnouncementFields.inquiryTelephone] as string,
      businessEntityName: map[APTAnnouncementFields.businessEntityName] as string,
      moveInPrearrangeYearMonth: map[APTAnnouncementFields.moveInPrearrangeYearMonth] as string,
      speculationOverheatedDistrict: map[APTAnnouncementFields.speculationOverheatedDistrict] as string,
      marketAdjustmentTargetAreaSection: map[APTAnnouncementFields.marketAdjustmentTargetAreaSection] as string,
      priceCapApplication: map[APTAnnouncementFields.priceCapApplication] as string,
      redevelopmentBusiness: map[APTAnnouncementFields.redevelopmentBusiness] as string,
      publicHousingDistrict: map[APTAnnouncementFields.publicHousingDistrict] as string,
      largeScaleDevelopmentDistrict: map[APTAnnouncementFields.largeScaleDevelopmentDistrict] as string,
      capitalRegionPrivatePublicHousingDistrict: map[APTAnnouncementFields.capitalRegionPrivatePublicHousingDistrict] as string,
      publicHousingSpecialLawApplication: map[APTAnnouncementFields.publicHousingSpecialLawApplication] as string,
      publicAnnouncementUrl: map[APTAnnouncementFields.publicAnnouncementUrl] as string,
    });
  }

  toMap(): { [key: string]: any } {
    return {
      [APTAnnouncementFields.houseManageNumber]: this.houseManageNumber,
      [APTAnnouncementFields.publicAnnouncementNumber]: this.publicAnnouncementNumber,
      [APTAnnouncementFields.houseSectionCode]: this.houseSectionCode,
      [APTAnnouncementFields.subscriptionAreaName]: this.subscriptionAreaName,
      [APTAnnouncementFields.recruitmentPublicAnnouncementDate]: this.recruitmentPublicAnnouncementDate,
      [APTAnnouncementFields.houseName]: this.houseName,
      [APTAnnouncementFields.houseSectionName]: this.houseSectionName,
      [APTAnnouncementFields.houseDetailSectionCode]: this.houseDetailSectionCode,
      [APTAnnouncementFields.houseDetailSectionName]: this.houseDetailSectionName,
      [APTAnnouncementFields.rentalSectionCode]: this.rentalSectionCode,
      [APTAnnouncementFields.rentalSectionName]: this.rentalSectionName,
      [APTAnnouncementFields.subscriptionAreaCode]: this.subscriptionAreaCode,
      [APTAnnouncementFields.supplyLocationZipCode]: this.supplyLocationZipCode,
      [APTAnnouncementFields.supplyLocationAddress]: this.supplyLocationAddress,
      [APTAnnouncementFields.totalSupplyHouseholdCount]: this.totalSupplyHouseholdCount,
      [APTAnnouncementFields.applicationReceptionStartDate]: this.applicationReceptionStartDate,
      [APTAnnouncementFields.applicationReceptionEndDate]: this.applicationReceptionEndDate,
      [APTAnnouncementFields.specialSupplyReceptionStartDate]: this.specialSupplyReceptionStartDate,
      [APTAnnouncementFields.specialSupplyReceptionEndDate]: this.specialSupplyReceptionEndDate,
      [APTAnnouncementFields.generalRank1CorrespondingAreaReceptionStartDate]: this.generalRank1CorrespondingAreaReceptionStartDate,
      [APTAnnouncementFields.generalRank1CorrespondingAreaReceptionEndDate]: this.generalRank1CorrespondingAreaReceptionEndDate,
      [APTAnnouncementFields.generalRank1OtherAreaReceptionStartDate]: this.generalRank1OtherAreaReceptionStartDate,
      [APTAnnouncementFields.generalRank1OtherAreaReceptionEndDate]: this.generalRank1OtherAreaReceptionEndDate,
      [APTAnnouncementFields.generalRank2CorrespondingAreaReceptionStartDate]: this.generalRank2CorrespondingAreaReceptionStartDate,
      [APTAnnouncementFields.generalRank2CorrespondingAreaReceptionEndDate]: this.generalRank2CorrespondingAreaReceptionEndDate,
      [APTAnnouncementFields.prizeWinnerAnnouncementDate]: this.prizeWinnerAnnouncementDate,
      [APTAnnouncementFields.contractConclusionStartDate]: this.contractConclusionStartDate,
      [APTAnnouncementFields.contractConclusionEndDate]: this.contractConclusionEndDate,
      [APTAnnouncementFields.homepageAddress]: this.homepageAddress,
      [APTAnnouncementFields.constructionEnterpriseName]: this.constructionEnterpriseName,
      [APTAnnouncementFields.inquiryTelephone]: this.inquiryTelephone,
      [APTAnnouncementFields.businessEntityName]: this.businessEntityName,
      [APTAnnouncementFields.moveInPrearrangeYearMonth]: this.moveInPrearrangeYearMonth,
      [APTAnnouncementFields.speculationOverheatedDistrict]: this.speculationOverheatedDistrict,
      [APTAnnouncementFields.marketAdjustmentTargetAreaSection]: this.marketAdjustmentTargetAreaSection,
      [APTAnnouncementFields.priceCapApplication]: this.priceCapApplication,
      [APTAnnouncementFields.redevelopmentBusiness]: this.redevelopmentBusiness,
      [APTAnnouncementFields.publicHousingDistrict]: this.publicHousingDistrict,
      [APTAnnouncementFields.largeScaleDevelopmentDistrict]: this.largeScaleDevelopmentDistrict,
      [APTAnnouncementFields.capitalRegionPrivatePublicHousingDistrict]: this.capitalRegionPrivatePublicHousingDistrict,
      [APTAnnouncementFields.publicHousingSpecialLawApplication]: this.publicHousingSpecialLawApplication,
      [APTAnnouncementFields.publicAnnouncementUrl]: this.publicAnnouncementUrl,
    };
  }

  /** 
   * toMap중에 undefind를 null로 바꿔서 반환
   * */ 
  toMapWithNull(): { [key: string]: any } { 

    const convertUndefinedToNull = (obj: any) => {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v])
        );
    };
  
    let map = this.toMap();
  
    return convertUndefinedToNull(map);
  }
  
}
