/* https://www.daleseo.com/jest-fn-spy-on/#jestspyon-%EC%82%AC%EC%9A%A9%EB%B2%95 참조


spyOn()으로 makeTemplate함수 list items 개수만큼 불러왓는지 확인하기
alreadyWatch시 watchLater = false로 잘 바꾸는지 확인
*/

import { dummyData, dummyDataObject, emptyData } from '../mockData.js';
import { SearchModal } from '../js/model/SearchModal.js';

describe('test', () => {
  beforeAll(() => {});

  test('검색어로 fetch한 data에서 title, channelName, publishedDatem id를 추출해 object로 변환한다.', async () => {
    const searchModal = new SearchModal();

    const fetchDataFromKeyword = jest.fn();
    fetchDataFromKeyword.mockResolvedValue(dummyData);
    searchModal.videos = await fetchDataFromKeyword();

    expect(searchModal.videoItemObjects()).toStrictEqual(dummyDataObject);
  });

  test('검색한 data가 없을 시 알려준다', async () => {
    const searchModal = new SearchModal();

    const fetchDataFromKeyword = jest.fn();
    fetchDataFromKeyword.mockResolvedValue(emptyData);
    searchModal.videos = await fetchDataFromKeyword();

    expect(searchModal.hasNoVideoItems()).toStrictEqual(true);
  });
});
