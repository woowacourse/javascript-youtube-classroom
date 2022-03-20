import { ERROR_MESSAGE } from "../constants/constants";
import VideoStorage from "../VideoStorage";

describe("VideoStorage에 동영상의 데이터가 적절히 저장되어야 한다.", () => {
  const videoStorage = new VideoStorage();

  test("VideoStorage에 동영상의 Id값이 저장되어야 한다.", () => {
    const testData = { id: 123, title: "테스트" };

    videoStorage.addVideoData(testData);
    expect(videoStorage.getVideos().includes(testData)).toBe(true);
  });

  test("VideoStorage에 101개 이상의 데이터가 저장되면 에러 메시지를 반환한다.", () => {
    const userData = Array.from({ length: 101 }, (_, index) => ({
      id: index + 1,
    }));

    expect(() =>
      userData.forEach(() => {
        videoStorage.addVideoData(userData);
      })
    ).toThrowError(ERROR_MESSAGE.VIDEO_STORAGE_OVERFLOW);
  });
});

describe("이미 저장된 videoId는 다시 저장될 수 없다.", () => {
  const responseId = "kkojaeId";

  beforeEach(() => {
    localStorage.clear();
  });

  test("이미 저장된 videoId이면 true를 반환한다.", () => {
    const videoStorage = new VideoStorage();
    videoStorage.addVideoData("kkojaeId");

    expect(videoStorage.isSavedVideoId(responseId)).toBe(true);
  });

  test("저장된 videoId가 아니면 false를 반환한다.", () => {
    const videoStorage = new VideoStorage();
    videoStorage.addVideoData("usageId");

    expect(videoStorage.isSavedVideoId(responseId)).toBe(false);
  });
});
