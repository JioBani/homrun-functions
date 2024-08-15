export const AgeRangeValue = {
    TWENTIES: '20대',
    THIRTIES: '30대',
    FORTIES: '40대',
    FIFTIES: '50대',
    SIXTIES_PLUS: '60대이상'
} as const;

export type AgeRangeValueType = typeof AgeRangeValue[keyof typeof AgeRangeValue];


/** 값이 AgeRangeValueType인지 확인*/
export function validateAgeRange(ageRange: any): boolean {    
    return Object.values(AgeRangeValue).includes(ageRange);
}
