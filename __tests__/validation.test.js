import { isOverVideoSaveMaxCount, validateSearchKeyword } from '../src/js/validation';
import { ERROR_MESSAGE, MAX_VIDEO_SAVE } from '../src/js/constants';

const generateMaxSavedVideo = () => {
  const sample = 'kcAU3ZgraMA';

  return Array.from({ length: MAX_VIDEO_SAVE }, () => sample);
};

describe('유효성 검사 테스트', () => {
  it('검색 키워드는 2자 이상이어야 한다', () => {
    const wrongCaseInput = 'a';
    expect(() => validateSearchKeyword(wrongCaseInput)).toThrow(ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
  });

  it(`동영상 저장은 최대 ${MAX_VIDEO_SAVE}개까지만 가능하다`, () => {
    const videoIdList = generateMaxSavedVideo();
    expect(isOverVideoSaveMaxCount(videoIdList)).toBe(true);
  });
});
