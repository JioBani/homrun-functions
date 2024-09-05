import { ConflictError, InvalidParameterError } from "../error/http.error";
import { UserReferences } from "../user/user.references";

/**
 * 주어진 닉네임의 사용 가능 여부를 검사합니다.
 * 
 * 닉네임의 형식을 검증하고, 데이터베이스에 중복된 닉네임이 있는지 확인합니다.
 * 
 * @param {string} displayName - 검사할 닉네임.
 * @throws {InvalidParameterError} - 닉네임 형식이 유효하지 않을 경우.
 * @throws {ConflictError} - 닉네임이 이미 존재할 경우.
 */
export async function checkDisplayNameAvailability(displayName: string) {

    //#. 문자열 확인
    if (typeof displayName !== 'string') {
        throw new InvalidParameterError('닉네임이 문자열이 아닙니다.');
    }
    
    //#. 유효성 확인
    validateDisplayName(displayName);

    //#. 중복 확인
    await checkDisplayNameDuplicate(displayName);
}

/**
 * 닉네임의 형식을 검증합니다.
 * 
 * 닉네임이 한글, 영문, 숫자로만 이루어져 있는지 확인하고, 
 * 한글이 포함된 경우와 포함되지 않은 경우에 따라 길이를 검사합니다.
 * 
 * @param {string} displayName - 검증할 닉네임.
 * @throws {InvalidParameterError} - 닉네임에 유효하지 않은 문자가 포함되어 있거나 길이 요건을 충족하지 못할 경우.
 */
function validateDisplayName(displayName: string): void {

    //#. 한글이 포함되어 있는지 확인하는 정규 표현식
    const koreanPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

    //#. 한글, 영문, 숫자로만 이루어져 있는지 확인하는 정규 표현식
    const validPattern = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+$/;

    //#. 닉네임에 유효한 문자만 포함되어 있는지 확인
    if (!validPattern.test(displayName)) {
        throw new InvalidParameterError(`닉네임에는 한글, 영문, 숫자만 포함될 수 있습니다.`);
    }
    
    //#. 닉네임의 길이를 검사
    const hasKorean = koreanPattern.test(displayName);  
    const length = displayName.length;
  
    const koreanNameMin = 2; // 최소 한글 닉네임 길이 설정
    const koreanNameMax = 10; // 최대 한글 닉네임 길이 설정
    const englishNameMin = 3; // 최소 영문 닉네임 길이 설정
    const englishNameMax = 15; // 최대 영문 닉네임 길이 설정

    
    if (hasKorean) { 
        if (length < koreanNameMin) {
            throw new InvalidParameterError(`한글 닉네임은 ${koreanNameMin}글자 이상이어야 합니다.`);
        } else if (length > koreanNameMax) {
            throw new InvalidParameterError(`한글 닉네임은 ${koreanNameMax}글자 이하이어야 합니다.`);
        }
    } else {
        if (length < englishNameMin) {
            throw new InvalidParameterError(`영문 또는 숫자 닉네임은 ${englishNameMin}글자 이상이어야 합니다.`);
        } else if (length > englishNameMax) {
            throw new InvalidParameterError(`영문 또는 숫자 닉네임은 ${englishNameMax}글자 이하이어야 합니다.`);
        }
    }
}

/**
 * 닉네임의 중복 여부를 데이터베이스에서 확인합니다.
 * 
 * 데이터베이스를 조회하여 제공된 닉네임이 이미 사용 중인지 확인합니다.
 * 
 * @param {string} displayName - 중복 여부를 확인할 닉네임.
 * @throws {ConflictError} - 닉네임이 데이터베이스에 이미 존재할 경우.
 */
async function checkDisplayNameDuplicate(displayName: string) {
    const snapshot = await UserReferences.getUserCollection().where('displayName', '==', displayName).get();
    if (!snapshot.empty) {
        throw ConflictError.DisplayNameAlreadyExistsError();
    }
}
