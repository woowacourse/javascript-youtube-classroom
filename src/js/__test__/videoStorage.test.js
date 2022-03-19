import { parseData } from '../utils/mockData';
import videoStorage from '../videoStorage.js';

describe('비디오 저장소에서 ', () => {
  videoStorage.storeVideoData(parseData[0]);
  videoStorage.storeVideoData(parseData[1]);
  videoStorage.storeVideoData(parseData[2]);

  test('[썸네일 이미지 url, 제목, 채널 이름, 업로드 날짜, 비디오 고유 id]가 객체로 잘 저장되는지 확인합니다.', () => {
    expect(videoStorage.hasVideoData(parseData[0].videoId)).toBe(true);
  });

  test('특정 비디오 데이터를 삭제할 수 있다.', () => {
    videoStorage.deleteVideoData(parseData[1].videoId);
    expect(videoStorage.hasVideoData(parseData[1].videoId)).toBe(false);
  });
});