import { ERROR_MESSAGE, RULES } from "../constants";
import { checkVideoStorageFull, setStorageVideos } from "../utils/localStorage";

describe('localStorage 저장 테스트', () => {
    it('최대 저장 개수를 넘으면 에러를 발생시킨다.', () => {
        const value = {
            stored:{},
            watched:{},
        }

        for(let n = 0; n<100; n++){
            value.stored[`stored${n}`] = n
        }
        
        setStorageVideos({value})
        expect(() => checkVideoStorageFull()).toThrowError(ERROR_MESSAGE.FULL_STORAGE);
    });
})
