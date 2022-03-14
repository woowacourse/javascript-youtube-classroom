import videoAPICaller from './videoAPICaller.js';
import { videoData, parseData } from '../utils/mockData.js';

test('response 데이터를 썸네일 이미지 url, 제목, 작성자, 작성요일, id로 분리할 수 있다.', () => {
  expect(videoAPICaller.parsingVideoData(videoData)).toEqual(parseData);
});
