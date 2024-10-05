export const APTAnnouncementFields = {
  houseManageNumber: "HOUSE_MANAGE_NO", // 주택관리번호
  publicAnnouncementNumber: "PBLANC_NO", // 공고번호
  houseSectionCode: "HOUSE_SECD", // 주택구분코드
  subscriptionAreaName: "SUBSCRPT_AREA_CODE_NM", // 공급지역명
  recruitmentPublicAnnouncementDate: "RCRIT_PBLANC_DE", // 모집공고일
  houseName: "HOUSE_NM", // 주택명
  houseSectionName: "HOUSE_SECD_NM", // 주택구분코드명
  houseDetailSectionCode: "HOUSE_DTL_SECD", // 주택상세구분코드
  houseDetailSectionName: "HOUSE_DTL_SECD_NM", // 주택상세구분코드명
  rentalSectionCode: "RENT_SECD", // 분양구분코드
  rentalSectionName: "RENT_SECD_NM", // 분양구분코드명
  subscriptionAreaCode: "SUBSCRPT_AREA_CODE", // 공급지역코드
  supplyLocationZipCode: "HSSPLY_ZIP", // 공급위치 우편번호
  supplyLocationAddress: "HSSPLY_ADRES", // 공급위치
  totalSupplyHouseholdCount: "TOT_SUPLY_HSHLDCO", // 공급규모
  subscriptionReceptionStartDate: "RCEPT_BGNDE", // 청약접수시작일
  subscriptionReceptionEndDate: "RCEPT_ENDDE", // 청약접수종료일
  specialSupplyReceptionStartDate: "SPSPLY_RCEPT_BGNDE", // 특별공급 접수시작일
  specialSupplyReceptionEndDate: "SPSPLY_RCEPT_ENDDE", // 특별공급 접수종료일
  generalRank1CorrespondingAreaReceptionStartDate: "GNRL_RNK1_CRSPAREA_RCPTDE", // 1순위 해당지역 접수시작일
  generalRank1CorrespondingAreaReceptionEndDate: "GNRL_RNK1_CRSPAREA_ENDDE", // 1순위 해당지역 접수종료일
  generalRank1OtherAreaReceptionStartDate: "GNRL_RNK1_ETC_AREA_RCPTDE", // 1순위 기타지역 접수시작일
  generalRank1OtherAreaReceptionEndDate: "GNRL_RNK1_ETC_AREA_ENDDE", // 1순위 기타지역 접수종료일
  generalRank2CorrespondingAreaReceptionStartDate: "GNRL_RNK2_CRSPAREA_RCPTDE", // 2순위 해당지역 접수시작일
  generalRank2CorrespondingAreaReceptionEndDate: "GNRL_RNK2_CRSPAREA_ENDDE", // 2순위 해당지역 접수종료일
  generalRank2OtherAreaReceptionStartDate: "GNRL_RNK2_ETC_AREA_RCPTDE", // 2순위 기타지역 접수시작일
  generalRank2OtherAreaReceptionEndDate: "GNRL_RNK2_ETC_AREA_ENDDE", // 2순위 기타지역 접수종료일
  prizeWinnerAnnouncementDate: "PRZWNER_PRESNATN_DE", // 당첨자발표일
  contractConclusionStartDate: "CNTRCT_CNCLS_BGNDE", // 계약시작일
  contractConclusionEndDate: "CNTRCT_CNCLS_ENDDE", // 계약종료일
  homepageAddress: "HMPG_ADRES", // 홈페이지주소
  constructionEnterpriseName: "CNSTRCT_ENTRPS_NM", // 건설업체명 (시공사)
  inquiryTelephone: "MDHS_TELNO", // 문의처
  businessEntityName: "BSNS_MBY_NM", // 사업주체명 (시행사)
  moveInPrearrangeYearMonth: "MVN_PREARNGE_YM", // 입주예정월 (기술문서 오타: MVN_PREARNGE_YN 대신 MVN_PREARNGE_YM이 맞음)
  speculationOverheatedDistrict: "SPECLT_RDN_EARTH_AT", // 투기과열지구
  marketAdjustmentTargetAreaSection: "MDAT_TRGET_AREA_SECD", // 조정대상지역
  priceCapApplication: "PARCPRC_ULS_AT", // 분양가상한제
  redevelopmentBusiness: "IMPRMN_BSNS_AT", // 정비사업
  publicHousingDistrict: "PUBLIC_HOUSE_EARTH_AT", // 공공주택지구
  largeScaleDevelopmentDistrict: "LRSCL_BLDLND_AT", // 대규모 택지개발지구
  capitalRegionPrivatePublicHousingDistrict: "NPLN_PRVOPR_PUBLIC_HOUSE_AT", // 수도권 내 민영 공공주택지구
  publicHousingSpecialLawApplication: "PUBLIC_HOUSE_SPCLW_APPLC_AT", // 공공주택 특별법 적용 여부 (기술문서 오타: PUBLIC_HOUSE_SPCLM_APPLC_APT 대신 PUBLIC_HOUSE_SPCLW_APPLC_AT이 맞음)
  publicAnnouncementUrl: "PBLANC_URL", // 분양정보 URL
};


//https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?page=1&perPage=500&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2024-08-04&serviceKey=${applyhomeInfoDetailServiceKey}

//   {
//     "BSNS_MBY_NM": "한국투자부동산신탁 주식회사",
//     "CNSTRCT_ENTRPS_NM": "에이치엘디앤아이한라 주식회사",
//     "CNTRCT_CNCLS_BGNDE": "2024-09-07",
//     "CNTRCT_CNCLS_ENDDE": "2024-09-09",
//     "GNRL_RNK1_CRSPAREA_ENDDE": "2024-08-20",
//     "GNRL_RNK1_CRSPAREA_RCPTDE": "2024-08-20",
//     "GNRL_RNK1_ETC_AREA_ENDDE": "2024-08-20",
//     "GNRL_RNK1_ETC_AREA_RCPTDE": "2024-08-20",
//     "GNRL_RNK1_ETC_GG_ENDDE": null,
//     "GNRL_RNK1_ETC_GG_RCPTDE": null,
//     "GNRL_RNK2_CRSPAREA_ENDDE": "2024-08-21",
//     "GNRL_RNK2_CRSPAREA_RCPTDE": "2024-08-21",
//     "GNRL_RNK2_ETC_AREA_ENDDE": "2024-08-21",
//     "GNRL_RNK2_ETC_AREA_RCPTDE": "2024-08-21",
//     "GNRL_RNK2_ETC_GG_ENDDE": null,
//     "GNRL_RNK2_ETC_GG_RCPTDE": null,
//     "HMPG_ADRES": "https://brand.hldni.com/icheonbubal/",
//     "HOUSE_DTL_SECD": "01",
//     "HOUSE_DTL_SECD_NM": "민영",
//     "HOUSE_MANAGE_NO": "2024000313",
//     "HOUSE_NM": "이천 부발역 에피트",
//     "HOUSE_SECD": "01",
//     "HOUSE_SECD_NM": "APT",
//     "HSSPLY_ADRES": "경기도 이천시 부발읍 아미리 737-6번지 일원",
//     "HSSPLY_ZIP": "17332",
//     "IMPRMN_BSNS_AT": "N",
//     "LRSCL_BLDLND_AT": "N",
//     "MDAT_TRGET_AREA_SECD": "N",
//     "MDHS_TELNO": "0316325100",
//     "MVN_PREARNGE_YM": "202805",
//     "NPLN_PRVOPR_PUBLIC_HOUSE_AT": "N",
//     "PARCPRC_ULS_AT": "N",
//     "PBLANC_NO": "2024000313",
//     "PBLANC_URL": "https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancDetail.do?houseManageNo=2024000313\u0026pblancNo=2024000313",
//     "PRZWNER_PRESNATN_DE": "2024-08-27",
//     "PUBLIC_HOUSE_EARTH_AT": "N",
//     "PUBLIC_HOUSE_SPCLW_APPLC_AT": "N",
//     "RCEPT_BGNDE": "2024-08-19",
//     "RCEPT_ENDDE": "2024-08-21",
//     "RCRIT_PBLANC_DE": "2024-08-07",
//     "RENT_SECD": "0",
//     "RENT_SECD_NM": "분양주택",
//     "SPECLT_RDN_EARTH_AT": "N",
//     "SPSPLY_RCEPT_BGNDE": "2024-08-19",
//     "SPSPLY_RCEPT_ENDDE": "2024-08-19",
//     "SUBSCRPT_AREA_CODE": "410",
//     "SUBSCRPT_AREA_CODE_NM": "경기",
//     "TOT_SUPLY_HSHLDCO": 671
// }