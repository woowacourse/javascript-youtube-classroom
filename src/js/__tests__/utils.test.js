import { isDuplicate, parsedDate, isEmptyString } from "../utils";

describe("저장하려는 동영상의 Id값이 기존에 저장된 동영상의 Id값들과 중복되는지 확인한다.", () => {
  const storeData = [
    {
      videoId: "kkojaeId",
      thumbnailUrl: "https:",
      title: "this is title",
      channelName: "kkojae's channel",
      publishDate: "2022년 3월 3일",
    },
  ];

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

  test("동영상의 Id값이 중복되면 true를 반환한다.", () => {
    expect(isDuplicate(kkojaeData, storeData)).toBe(true);
  });

  test("동영상의 Id값이 중복되지 않으면 false를 반환한다.", () => {
    expect(isDuplicate(usageData, storeData)).toBe(false);
  });
});

describe("검색하려는 입력값이 유효한 값인지 검증한다.", () => {
  test("입력값이 비어있는 경우 true를 반환한다.", () => {
    const inputValue = "     ";

    expect(isEmptyString(inputValue)).toBe(true);
  });

  test("입력값이 비어있지 않을 경우 false를 반환한다.", () => {
    const inputValue = "xooos";

    expect(isEmptyString(inputValue)).toBe(false);
  });
});

test("응답받은 날짜 데이터를 정해진 형식(YYYY년 M월 D일)으로 변경한다.", () => {
  const rawDate = "2022-03-02T11:39:31Z";

  expect(parsedDate(rawDate)).toBe("2022년 3월 2일");
});
