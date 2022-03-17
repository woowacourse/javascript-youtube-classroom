import { ERROR_MESSAGE } from "../constants/constants";
import videoStorage from "../videoStorage";

describe("videoStorage에 동영상의 데이터가 적절히 저장되어야 한다.", () => {
  test("videoStorage에 동영상의 Id값이 저장되어야 한다.", () => {
    localStorage.clear();

    const testdata = {
      videoId: "kkojaeId",
      thumbnailUrl: "https:",
      title: "this is title",
      channelName: "kkojae's channel",
      publishDate: "2022년 3월 3일",
    };

    videoStorage.addVideo(testdata);
    expect(videoStorage.isSavedVideoId("kkojaeId")).toBe(true);
  });

  test("videoStorage에 101개 이상의 데이터가 저장되면 에러 메시지를 반환한다.", () => {
    const videoData = Array.from({ length: 101 }, (_, index) => ({
      videoId: index,
      thumbnailUrl: "https:",
      title: "this is title",
      channelName: "kkojae's channel",
      publishDate: "2022년 3월 3일",
    }));

    expect(() =>
      videoData.forEach((data) => {
        videoStorage.addVideo(data);
      })
    ).toThrowError(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
  });
});

describe("이미 저장된 videoData는 다시 저장될 수 없다.", () => {
  const kkojaeData = {
    videoId: "kkojaeId",
    thumbnailUrl: "https:",
    title: "this is title",
    channelName: "kkojae's channel",
    publishDate: "2022년 3월 3일",
  };

  const usageData = {
    videoId: "usageId",
    thumbnailUrl: "https:",
    title: "this is title",
    channelName: "usage's channel",
    publishDate: "2022년 3월 3일",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test("이미 저장된 videoData이면 true를 반환한다.", () => {
    videoStorage.addVideo(kkojaeData);

    expect(videoStorage.isSavedVideoId("kkojaeId")).toBe(true);
  });

  test("저장되지 않은 videoData이면 false를 반환한다.", () => {
    videoStorage.addVideo(usageData);

    expect(videoStorage.isSavedVideoId("kkojaeId")).toBe(false);
  });
});
