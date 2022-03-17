import { parseData } from '../utils/mockData';
import videoStorage from '../videoStorage.js';

describe('비디오 저장소에서 ', () => {
  test('[썸네일 이미지 url, 제목, 채널 이름, 업로드 날짜, 비디오 고유 id]가 객체로 잘 저장되는지 확인합니다.', () => {
    const videoData = parseData[0];
    videoStorage.storeVideoId(videoData);
    expect(videoStorage.hasVideoId(videoData.videoId)).toBe(true);
  });
});
