import SearchVideo from '../searchVideo.js';
import mockDatas from '../Utils/mock.js';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ items: mockDatas }),
  })
);

describe('동영샹 검색 테스트', () => {
  const searchVideo = new SearchVideo();
  test('입력한 검색값이 공백인 경우를 체크한다.', async () => {
    const searchInput = '      ';
    try {
      await searchVideo.handleSearchVideo(searchInput.trim())
    } catch (error) {
      expect(error.message).toEqual('공백은 검색할 수 없습니다.');
    }
  });
  
  test('검색하면 검색한 데이터(10개)가 오는지 확인한다.', async () => {
    try {
      await searchVideo.handleSearchVideo('playlist');
      expect(searchVideo.searchResults.length).toEqual(10);
    } catch (error) {
      expect(error.message).toEqual('[404] 개발자에게 문의하세요');
    };
  });
});


