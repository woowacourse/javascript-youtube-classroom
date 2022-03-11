import dummyObject from '../dummy/dummyObject.js';
import Video from '../models/Video.js';
import EXCEPTION from '../../constants/exception.js'

describe('검색어를 정상적으로 입력해야 한다.', () => {
  test('검색어가 입력되지 않은 경우, 에러를 발생시킨다.', () => {
    const input = '';
    const video = new Video();

    expect(()=>{ video.keyword = input }).toThrowError(EXCEPTION.EMPTY_ERROR_MESSAGE);
  })
})

describe('검색어를 입력한 경우, 유튜브에 해당 API가 정상적으로 가져와져야한다.', () => {
  test('API에서 가져온 영상들의 제목 또는 설명에 사용자가 입력한 검색어가 포함되어있어야한다.', () => {
    // given
    const keyword = '우아한테크코스';

    // when
    const dummyItems = dummyObject.items;   

    // then
    dummyItems.forEach(item => {
      const hasKeyword = { description: item.snippet.description.indexOf(keyword) , title: item.snippet.title.indexOf(keyword) };
      expect(hasKeyword).not.toStrictEqual({description: -1, title: -1});
    }) 
  });
  test('API에서 가져온 영상의 데이터(썸네일 사진, 제목, 채널명, 날짜, 링크)가 존재해야한다.', () => {
    // given

    // when
    const dummyItems = dummyObject.items;   

    // then
    dummyItems.forEach(item => {
      expect(item.snippet.channelTitle).not.toBe("");
      expect(item.snippet.title).not.toBe("");
      expect(item.snippet.publishTime).not.toBe("");
      expect(item.snippet.thumbnails).not.toStrictEqual({
          "default": {
          },
          "medium": {
          },
          "high": {
          }
      });
      expect(item.id.videoId).not.toBe("");
    }) 
  });
});
