import dummyMultipleVideo from './dummy';
import { getVideoObjects } from '../domain/handleSearchRequest';

describe('Youtube으로부터 받은 정보 중에 필요한 정보만 추출할 수 있다.', () => {
  function testVideoObject(videoObject) {
    Object.keys(videoObject).forEach((key) => {
      expect(videoObject[key]).toBeTruthy();
    });
  }

  test('여러 비디오 데이터에서 필요한 정보만 가져올 수 있다.', () => {
    const videoObjects = getVideoObjects(dummyMultipleVideo);

    videoObjects.forEach((object) => testVideoObject(object));
  });
});
