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
