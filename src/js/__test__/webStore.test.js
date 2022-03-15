import webStore from '../modules/webStore';

describe('webStore 모듈 테스트', () => {
  jest.mock(
    'local-storage',
    () => {
      const storage = {};
      return {
        getItem(key) {
          return storage[key];
        },
        setItem(key, data) {
          storage[key] = data;
        },
      };
    },
    { virtual: true }
  );
  test('데이터를 저장할 수 있다.', () => {
    global.localStorage = require('local-storage');

    const newVideoId = 'gadsgasdg';
    webStore.setDataInArray('video', newVideoId);

    const videoIdList = webStore.getArrayData('video');

    expect(videoIdList.includes(newVideoId)).toBe(true);
  });
});
