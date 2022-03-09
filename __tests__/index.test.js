import { validateSearchKeyword } from '../src/js/validation';
import { ERROR_MESSAGE } from '../src/js/constants';
import SearchVideoManager from '../src/js/SearchVideoManager';
import SaveVideoManager from '../src/js/SaveVideoManager';

describe('test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('검색 키워드는 2자 이상이어야 한다', () => {
    const wrongCaseInput = 'a';
    expect(() => validateSearchKeyword(wrongCaseInput)).toThrow(ERROR_MESSAGE.SEARCH_KEYWORD_MIN_LENGTH);
  });

  it('영상 ID를 저장한다.', () => {
    const videoID = 'testVideoID';

    const saveVideoManager = new SaveVideoManager();
    saveVideoManager.saveVideoById(videoID);

    expect(JSON.parse(localStorage.getItem('id').includes(videoID))).toBeTruthy();
  });

  it('영상을 이미 저장했는지 확인할 수 있다.', () => {
    const videoID = 'testVideoID';

    const saveVideoManager = new SaveVideoManager();
    saveVideoManager.saveVideoById(videoID);

    expect(saveVideoManager.findVideoById(videoID)).toBeTruthy();
  });
});
