import { VideoStorage } from '../domain/VideoStorage';
const localStorage = {
  save: [],
  watched: [],
};
const localStorageMock = {
  getItem: jest.fn().mockImplementation((key) => {
    return localStorage[key];
  }),
  setItem: jest.fn().mockImplementation((key, item) => {
    localStorage[key] = item;
  }),
  clear: jest.fn(),
};
JSON.parse = jest.fn().mockImplementation((item) => {
  return item;
});

global.localStorage = localStorageMock;
describe('videoStorage 테스트', () => {
  let videoStorage;
  const mockVideo = {
    id: 'testId',
    thumbnails: 'testUrl',
    title: 'testTitle',
    channelTitle: 'testChannel',
    publisTime: '2011/01/01',
  };

  beforeEach(() => {
    videoStorage = new VideoStorage();
  });

  test('비디오 추가기능', () => {
    videoStorage.appendVideo(mockVideo);
    expect(videoStorage.videoList).toHaveLength(1);
  });

  test('타겟 id의 watched를 바꾸는 기능', () => {
    videoStorage.appendVideo(mockVideo);
    videoStorage.toggleState('testId');
    expect(videoStorage.videoList[0].isWatched).toBe(true);
  });

  test('동일 ID를 삽입한 경우 에러 출력', () => {
    videoStorage.appendVideo(mockVideo);
    expect(() => {
      videoStorage.appendVideo(mockVideo);
    }).toThrow(new Error('동일 ID는 존재할 수 없습니다.'));
  });

  test('타겟 id 제거 기능', () => {
    videoStorage.appendVideo(mockVideo);
    expect(videoStorage.videoList).toHaveLength(1);
    videoStorage.removeVideo('testId');
    expect(videoStorage.videoList).toHaveLength(0);
  });
});
