/**
 * Null 또는 undefined 값을 처리하여 기본 동작을 수행하는 함수입니다.
 * 주어진 값이 null 또는 undefined일 경우, 제공된 콜백 함수가 실행되어 그 결과를 반환합니다.
 * 그렇지 않으면 주어진 값을 그대로 반환합니다.
 *
 * @template T - 처리할 값의 타입.
 * @param {T | null | undefined} value - 처리할 값. 이 값이 null 또는 undefined일 경우 콜백 함수가 실행됩니다.
 * @param {() => T} callback - 값이 null 또는 undefined일 때 실행할 콜백 함수. 기본 값을 반환하는 데 사용됩니다.
 * @returns {T} - 값이 null 또는 undefined가 아니면 해당 값을 그대로 반환하고, 그렇지 않으면 콜백 함수의 결과를 반환합니다.
 */
export function fiterNull<T>(value: T | null | undefined, callback: () => T): T {
    if (value === null || value === undefined) {
        return callback();
    } else {
        return value;
    }
}
