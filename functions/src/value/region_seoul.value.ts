export enum RegionSeoul {
  종로구 = 'Jongno',
  중구 = 'Jung',
  용산구 = 'Yongsan',
  성동구 = 'Seongdong',
  광진구 = 'Gwangjin',
  동대문구 = 'Dongdaemun',
  중랑구 = 'Jungnang',
  성북구 = 'Seongbuk',
  강북구 = 'Gangbuk',
  도봉구 = 'Dobong',
  노원구 = 'Nowon',
  은평구 = 'Eunpyeong',
  서대문구 = 'Seodaemun',
  마포구 = 'Mapo',
  양천구 = 'Yangcheon',
  강서구 = 'Gangseo',
  구로구 = 'Guro',
  금천구 = 'Geumcheon',
  영등포구 = 'Yeongdeungpo',
  동작구 = 'Dongjak',
  관악구 = 'Gwanak',
  서초구 = 'Seocho',
  강남구 = 'Gangnam',
  송파구 = 'Songpa',
  강동구 = 'Gangdong'
}

export namespace RegionSeoul {
  /**
   * 주어진 문자열을 RegionSeoul 열거형 값으로 변환합니다.
   * @param {string} value - 문자열 값 (예: 'Jongno', 'Gangnam').
   * @returns {RegionSeoul | undefined} - 유효한 RegionSeoul 값 또는 undefined.
   */
  export function fromString(value: string): RegionSeoul | undefined {
      switch (value) {
          case 'Jongno':
              return RegionSeoul.종로구;
          case 'Jung':
              return RegionSeoul.중구;
          case 'Yongsan':
              return RegionSeoul.용산구;
          case 'Seongdong':
              return RegionSeoul.성동구;
          case 'Gwangjin':
              return RegionSeoul.광진구;
          case 'Dongdaemun':
              return RegionSeoul.동대문구;
          case 'Jungnang':
              return RegionSeoul.중랑구;
          case 'Seongbuk':
              return RegionSeoul.성북구;
          case 'Gangbuk':
              return RegionSeoul.강북구;
          case 'Dobong':
              return RegionSeoul.도봉구;
          case 'Nowon':
              return RegionSeoul.노원구;
          case 'Eunpyeong':
              return RegionSeoul.은평구;
          case 'Seodaemun':
              return RegionSeoul.서대문구;
          case 'Mapo':
              return RegionSeoul.마포구;
          case 'Yangcheon':
              return RegionSeoul.양천구;
          case 'Gangseo':
              return RegionSeoul.강서구;
          case 'Guro':
              return RegionSeoul.구로구;
          case 'Geumcheon':
              return RegionSeoul.금천구;
          case 'Yeongdeungpo':
              return RegionSeoul.영등포구;
          case 'Dongjak':
              return RegionSeoul.동작구;
          case 'Gwanak':
              return RegionSeoul.관악구;
          case 'Seocho':
              return RegionSeoul.서초구;
          case 'Gangnam':
              return RegionSeoul.강남구;
          case 'Songpa':
              return RegionSeoul.송파구;
          case 'Gangdong':
              return RegionSeoul.강동구;
          default:
              return undefined; // 알 수 없는 문자열인 경우
      }
  }
}

export const seoulAll = "SeoulAll";