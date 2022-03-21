import { ERROR_MESSAGE, GET_VIDEO_COUNT } from '../constants/contants.js';
import SearchVideo from '../searchVideo.js';
import mockDatas from '../Utils/mock.js';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ items: mockDatas }),
  })
);

describe('동영상 검색 테스트', () => {
  const searchVideo = new SearchVideo();
  test('입력한 검색값이 공백인 경우를 체크한다.', async () => {
    const searchInput = '      ';
    try {
      await searchVideo.handleSearchVideo(searchInput.trim())
    } catch (error) {
      expect(error.message).toEqual(ERROR_MESSAGE.CANNOT_SEARCH_EMPTY);
    }
  });
  
  test('검색하면 검색한 데이터(12개)가 오는지 확인한다.', async () => {
    try {
      const result = await searchVideo.handleSearchVideo('playlist');
      expect(result.length).toEqual(GET_VIDEO_COUNT);
    } catch (error) {
      expect(error.message).toEqual(ERROR_MESSAGE.CANNOT_GET_YOUTUBE_VIDEO);
    };
  });

  test('검색결과가 없는 검색어를 입력하면 빈 배열을 반환한다.', async () => {
    try {
      const result = await searchVideo.handleSearchVideo(`').dataset.videoId);     target.textContent = ALREADY_SAVED_VIDEO;     target.disabled = true;   };    onClickVideoSearchModal = ()`);
      expect(result.length).toEqual(0);
    } catch (error) {
      expect(error.message).toEqual(ERROR_MESSAGE.CANNOT_GET_YOUTUBE_VIDEO);
    };
  });

    test('요청을 보냈지만 오류를 반환할 때 에러 메시지를 띄운다', async () => {
    try {
      const result = await searchVideo.handleSearchVideo('잔나비');
      throw Error();
    } catch (error) {
      expect(error.message).toEqual(ERROR_MESSAGE.CANNOT_GET_YOUTUBE_VIDEO);
    };
  });
});


