import youtubeSearchAPI from '../api/youtubeSearchapi';
import { ERROR_MESSAGE } from '../constant';

describe('youtubeAPI 테스트', () => {
  test('정상 요청 데이터가 전달된 경우', () => {
    const testData = [
      {
        userId: 'testId',
        id: 1,
        title: 'testTitle',
        publishedDate: '2022-03-15',
      },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      ok: true,
      json: function () {
        return testData;
      },
    });
    youtubeSearchAPI.searchByPage().then((data) => expect(data).toBe(testData));
  });

  test('response 용량이 초과된 경우', () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 403,
    });
    youtubeSearchAPI
      .searchByPage()
      .catch((e) =>
        expect(e.message).toBe(ERROR_MESSAGE.EXCEED_REQUEST_CAPACITY_ERROR),
      );
  });

  test('다른 에러가 발생한 경우', () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });
    youtubeSearchAPI.searchByPage().catch((e) => {
      expect(e.message).toBe(ERROR_MESSAGE.RESPONSE_DENIED);
    });
  });
});
