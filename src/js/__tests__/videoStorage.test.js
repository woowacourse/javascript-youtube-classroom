import { ERROR_MESSAGE } from "../constants/constants";
import videoStorage from "../videoStorage";

describe("videoStorage에 동영상의 데이터가 적절히 저장되어야 한다.", () => {
  const kkojaeData = {
    videoId: "kkojaeId",
    thumbnailUrl: "https:",
    title: "this is title",
    channelName: "kkojae's channel",
    publishDate: "2022년 3월 3일",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test("videoStorage에 101개 이상의 데이터가 저장되면 에러 메시지를 반환한다.", () => {
    const videoData = Array.from({ length: 100 }, (_, index) => ({
      videoId: index,
      thumbnailUrl: "https:",
      title: "this is title",
      channelName: "kkojae's channel",
      publishDate: "2022년 3월 3일",
    }));

    videoData.forEach((data) => {
      videoStorage.addVideo(data);
    });

    expect(() => {
      videoStorage.addVideo(kkojaeData);
    }).toThrowError(ERROR_MESSAGE.USER_STORAGE_OVERFLOW);
  });

  test("이미 저장된 videoData를 다시 저장할 경우 에러 메시지를 반환한다.", () => {
    videoStorage.addVideo(kkojaeData);

    expect(() => {
      videoStorage.addVideo(kkojaeData);
    }).toThrowError(ERROR_MESSAGE.DUPLICATED_VIDEO_ID);
  });
});
