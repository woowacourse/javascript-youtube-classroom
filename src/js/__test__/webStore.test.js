import { ERROR_MESSAGE, RULES } from "../constants";
import { setStorageVideoIDs, checkVideoStorageFull } from "../utils/localStorage";

describe('localStorage 저장 테스트', () => {
    it('최대 저장 개수를 넘으면 에러를 발생시킨다.', () => {
        const key = 'test';
        const value = new Array(RULES.MAX_STORED_IDS_AMOUNT).fill(null).map((v,i) => i);
        
        setStorageVideoIDs({ key, value })
        expect(() => checkVideoStorageFull(key)).toThrowError(ERROR_MESSAGE.FULL_STORAGE);
    });
})
