/**
 * 맵 데이터를 특정 타입의 객체로 변환하는 팩토리 인터페이스
 */
export interface MappableFactory<T>{
    fromMap(map: { [key: string]: any }) : T;
}