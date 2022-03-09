import dummySnippet from '../dummy/dummy.js';
import dummyObject from '../dummy/dummyObject.js';
import { getItemLocal, setItemLocal, exportItem } from '../index.js';
// import { setItem, getItem, removeItem } from './storage';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}


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

describe('스크롤을 끝까지 내릴 경우(가정), 아직 보여주지 않은 다음 영상 아이템 10개를 model에서 가져와야 한다.', () => {
  test('영상 아이템의 개수가 100개 미만일 경우(99), 해당 영상 아이템의 데이터가 로컬스토리지에 저장되어야 한다.', () => {
global.localStorage = new LocalStorageMock;

  const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
  const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('set item', () => {
    setItem('accessToken', '1234');

    expect(mockSetItem).toHaveBeenCalledWith('accessToken', '1234');
  });

  it('get item', () => {
    getItem('accessToken');

    expect(mockGetItem).toHaveBeenCalledWith('accessToken');
  });

});

    expect(exportItem('myID')).not.toBe('')
  });
  test('영상 아이템의 w개수가 100개 이상일 경우(100), 해당 영상 아이템의 데이터가 로컬스토리지에 저장되어서는 안 된다.', () => {});
});

// const bodyM`ap = body.items.map((item) => item.snippet);
// 채널명 channelTitle: "우아한Tech"  채널명
// description: "우아한테크코스의 크루들이 진행하는 인터뷰 챌린지입니다.   우테코 인터뷰 챌린지 이번 편은 백엔드와 프론트엔드 크루들이 평소에 ..."
// 날짜 publishTime: "2021-07-14T05:16:07Z"
// 사진 thumbnails: {default: {…}, medium: {…}, high: {…}}
// 제목 title: "[우테코 인터뷰 챌린지] 🧡 프론트엔드 백
