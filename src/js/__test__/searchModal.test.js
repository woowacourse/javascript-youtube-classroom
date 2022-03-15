import { MAX_RENDER_VIDEOS_COUNT } from '../constants/constant.js';
import DUMMY_VIDEO_LIST from './dummyData';
import SearchModal from "../searchModal";

const searchModal = new SearchModal();

describe('검색 결과에 따라 생성된 videos가 알맞은 값을 가지는지 테스트', () => {
  test('Youtube API를 통해 가져온 검색 결과 리스트가 화면을 구성하는데 필요한 프로퍼티를 가지고 있는지 확인한다', async () => {
    const dummy = { ...DUMMY_VIDEO_LIST };
    const videos = searchModal.checkSearchResult(dummy);
    videos.forEach(video => {
      expect(video).toHaveProperty('id');
      expect(video).toHaveProperty('channelTitle');
      expect(video).toHaveProperty('thumbnailUrl');
      expect(video).toHaveProperty('publishedAt');
    });
  });
});
