import { MAX_RENDER_VIDEOS_COUNT } from '../constants/constant.js';
import DUMMY_VIDEO_LIST from './dummyData';
import SearchModal from "../searchModal";

const searchModal = new SearchModal();

describe('videos', () => {
  test('videos가 최대 렌더할 비디오 수만큼 items를 가지고 있는지 체크', async () => {
    const dummy = { ...DUMMY_VIDEO_LIST };
    dummy.items = dummy.items.slice(0, MAX_RENDER_VIDEOS_COUNT);
    const videos = searchModal.checkSearchResult(dummy);
    expect(videos).toHaveLength(MAX_RENDER_VIDEOS_COUNT);
  });
  
  test('videos가 view 구성을 위한 프로퍼티를 가지고 있는지 체크', async () => {
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
