import { ERROR_MESSAGE } from "../constants";
import { validateKeyword } from "../utils/validator";

describe('검색어 검색 테스트', () => {
    it('빈 값을 검색하면, 에러를 발생 시킨다.', () => {
        const keyword = ''

        expect(() => validateKeyword(keyword)).toThrowError(ERROR_MESSAGE.EMPTY_KEYWORD);
    });
    
    it('올바른 값을 검색하면, 에러를 발생 시키지 않는다.', () => {
        const keyword = '코카콜라'

        expect(() => validateKeyword(keyword)).not.toThrowError(ERROR_MESSAGE.EMPTY_KEYWORD);
    });
})

