import searchVideoAPICaller from './searchVideoAPICaller.js';
import { videoData, parseData } from '../utils/mockData.js';

describe('검색어로 요청하여 받은 response 데이터를', () => {
  test('썸네일 이미지 url, 제목, 작성자, 작성요일, id로 분리할 수 있다.', () => {
    expect(searchVideoAPICaller.parsingVideoData(videoData)).toEqual(parseData);
  });
});
