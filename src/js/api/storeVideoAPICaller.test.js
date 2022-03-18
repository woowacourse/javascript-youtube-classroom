import { videoIdData, videoIdParsedData } from '../utils/mockData.js';
import storeVideoAPICaller from './storeVideoAPICaller.js';

describe('video id로 요청하여 받은 response 데이터를', () => {
  test('id, 썸네일 이미지 url, 제목, 작성자, 작성요일로 분리할 수 있다.', () => {
    expect(storeVideoAPICaller.parsingVideoData(videoIdData)).toEqual(videoIdParsedData);
  });
});
