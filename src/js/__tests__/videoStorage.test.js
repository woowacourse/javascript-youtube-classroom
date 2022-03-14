import { ERROR_MESSAGE } from "../constants/constants";
import videoStorage from "../videoStorage";

describe("userStorage에 동영상의 데이터가 적절히 저장되어야 한다.", () => {
  test("userStorage에 동영상의 Id값이 저장되어야 한다.", () => {
    const testId = 123;

    videoStorage.addVideo(testId);
    expect(videoStorage.getVideo().includes(testId)).toBe(true);
  });

  test("userStorage에 101개 이상의 데이터가 저장되면 에러 메시지를 반환한다.", () => {
    const userIds = Array.from({ length: 101 }, (_, index) => index);

    expect(() =>
      userIds.forEach((userId) => {
        videoStorage.addVideo(userId);
      })
    ).toThrowError(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
  });
});

describe("이미 저장된 videoId는 다시 저장될 수 없다.", () => {
  const responseId = "kkojaeId";

  beforeEach(() => {
    localStorage.clear();
  });

  test("이미 저장된 videoId이면 true를 반환한다.", () => {
    videoStorage.addVideo("kkojaeId");

    expect(videoStorage.isSavedVideoId(responseId)).toBe(true);
  });

  test("저장되지 않은 videoId이면 false를 반환한다.", () => {
    videoStorage.addVideo("usageId");

    expect(videoStorage.isSavedVideoId(responseId)).toBe(false);
  });
});
