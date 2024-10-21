export enum RegionGyeonggi {
  가평_양평 = 'GapyeongYangpyeong',
  광명_시흥 = 'GwangmyeongSiheung',
  부천 = 'Bucheon',
  양주_연천_포천 = 'YangjuYeoncheonPocheon',
  용인_광주 = 'YonginGwangju',
  파주 = 'Paju',
  화성_오산 = 'HwaseongOsan',
  과천 = 'Gwacheon',
  김포 = 'Gimpo',
  안양_군포_의왕 = 'AnyangGunpoUiwang',
  여주_이천 = 'YeojuIcheon',
  성남 = 'Seongnam',
  평택_안성 = 'PyeongtaekAnseong',
  고양 = 'Goyang',
  남양주_구리 = 'NamyangjuGuri',
  안산 = 'Ansan',
  의정부_동두천 = 'UijeongbuDongducheon',
  수원 = 'Suwon',
  하남 = 'Hanam'
}

export namespace RegionGyeonggi {
  /**
   * 주어진 문자열을 RegionGyeonggi 열거형 값으로 변환합니다.
   * @param {string} value - 문자열 값 (예: 'GapyeongYangpyeong', 'Bucheon').
   * @returns {RegionGyeonggi | undefined} - 유효한 RegionGyeonggi 값 또는 undefined.
   */
  export function fromString(value: string): RegionGyeonggi | undefined {
      switch (value) {
          case 'GapyeongYangpyeong':
              return RegionGyeonggi.가평_양평;
          case 'GwangmyeongSiheung':
              return RegionGyeonggi.광명_시흥;
          case 'Bucheon':
              return RegionGyeonggi.부천;
          case 'YangjuYeoncheonPocheon':
              return RegionGyeonggi.양주_연천_포천;
          case 'YonginGwangju':
              return RegionGyeonggi.용인_광주;
          case 'Paju':
              return RegionGyeonggi.파주;
          case 'HwaseongOsan':
              return RegionGyeonggi.화성_오산;
          case 'Gwacheon':
              return RegionGyeonggi.과천;
          case 'Gimpo':
              return RegionGyeonggi.김포;
          case 'AnyangGunpoUiwang':
              return RegionGyeonggi.안양_군포_의왕;
          case 'YeojuIcheon':
              return RegionGyeonggi.여주_이천;
          case 'Seongnam':
              return RegionGyeonggi.성남;
          case 'PyeongtaekAnseong':
              return RegionGyeonggi.평택_안성;
          case 'Goyang':
              return RegionGyeonggi.고양;
          case 'NamyangjuGuri':
              return RegionGyeonggi.남양주_구리;
          case 'Ansan':
              return RegionGyeonggi.안산;
          case 'UijeongbuDongducheon':
              return RegionGyeonggi.의정부_동두천;
          case 'Suwon':
              return RegionGyeonggi.수원;
          case 'Hanam':
              return RegionGyeonggi.하남;
          default:
              return undefined; // 알 수 없는 문자열인 경우
      }
  }
}

export const gyeonggiAll = "GyeonggiAll";