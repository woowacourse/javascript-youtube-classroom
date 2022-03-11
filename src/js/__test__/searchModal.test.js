import { MAX_RENDER_VIDEOS_COUNT } from '../constants/constant.js';
import DUMMY_VIDEO_LIST from './dummyData';
import SearchModal from "../searchModal";

const searchModal = new SearchModal();

describe('검색 결과에 따라 생성된 videos가 알맞은 값을 가지는지 테스트', () => {
  test('fetch로 가져온 데이터가 null이 아닐 경우, 생성된 video의 length가 알맞은지 체크', async () => {
    const dummy = { ...DUMMY_VIDEO_LIST };
    dummy.items = dummy.items.slice(0, MAX_RENDER_VIDEOS_COUNT);
    const videos = searchModal.checkSearchResult(dummy);
    expect(videos).toHaveLength(MAX_RENDER_VIDEOS_COUNT);
  });
  
  test('fetch로 가져온 데이터가 null이 아닐 경우, 생성된 video가 view 구성을 위한 프로퍼티를 가지고 있는지 체크', async () => {
    const dummy = { ...DUMMY_VIDEO_LIST };
    const videos = searchModal.checkSearchResult(dummy);
    videos.forEach(video => {
      expect(video).toHaveProperty('id');
      expect(video).toHaveProperty('channelTitle');
      expect(video).toHaveProperty('thumbnailUrl');
      expect(video).toHaveProperty('publishedAt');
    })
  })
});
