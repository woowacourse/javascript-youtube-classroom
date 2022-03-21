import videoApiCaller from './videoApiCaller.js';
import { videoData, videoIdData, parseData, videoIdParsedData } from '../utils/mockData.js';

describe('검색어로 요청하여 받은 response 데이터를', () => {
  test('썸네일 이미지 url, 제목, 작성자, 작성요일, id로 분리할 수 있다.', () => {
    expect(videoApiCaller.parsingSearchVideoData(videoData)).toEqual(parseData);
  });
});

describe('video id로 요청하여 받은 response 데이터를', () => {
  test('id, 썸네일 이미지 url, 제목, 작성자, 작성요일로 분리할 수 있다.', () => {
    expect(videoApiCaller.parsingStoreVideoData(videoIdData)).toEqual(videoIdParsedData);
  });
});
