/**
 * @jest-environment jsdom
 */

import UserLibrary from "../UserLibrary";
import { parsedDate, isDuplicate } from "../utils/utils";
import getSearchResult from "../api/getSearchResult";
import "jest-localstorage-mock";

test("동영상의 Id값이 같은지 확인한다.", () => {
  const mockData = { id: "abc" };
  const storeData = [{ id: "abc" }];

  expect(isDuplicate(mockData, storeData)).toBe(true);
});

test("UserLibrary에 영상이 저장되어야 한다.", () => {
  const userLibrary = new UserLibrary();
  const testData = { id: 123, title: "테스트" };

  userLibrary.setData(testData);
  expect(userLibrary.getData().includes(testData)).toBe(true);
});

test("UserLibrary 101개 이상의 동영상이 저장되면 alert을 띄운다.", () => {
  const userLibrary = new UserLibrary();
  const userData = Array.from({ length: 101 }, (_, index) => ({
    id: index + 1,
  }));

  expect(() =>
    userData.forEach(() => {
      userLibrary.setData(userData);
    })
  ).toThrowError("데이터는 101개 이상 저장하실 수 없습니다.");
});

test("응답받은 날짜 데이터를 정해진 형식(YYYY년 M월 D일)으로 변경한다.", () => {
  const rawDate = "2022-03-02T11:39:31Z";
  const result = "2022년 3월 2일";

  expect(parsedDate(rawDate)).toBe(result);
});

test("이미 저장한 비디오 아이디인지 확인한다.", () => {
  const responseId = "kkojaeId";
  localStorage.clear();

  const userLibrary = new UserLibrary();
  userLibrary.setData("kkojaeId");

  expect(userLibrary.isSavedVideoId(responseId)).toBe(true);
});

test("이미 저장한 비디오 아이디인지 확인한다.", () => {
  const responseId = "kkojaeId";
  localStorage.clear();

  const userLibrary = new UserLibrary();
  userLibrary.setData("usageId");

  expect(userLibrary.isSavedVideoId(responseId)).toBe(false);
});

// test("최초 검색 결과는 10개까지만 보여준다.", async () => {
//   fetch.mockResponseOnce(
//     JSON.stringify([
//       {
//         id: {
//           videoId: 1,
//         },
//         snippet: {
//           channelTitle: "essential;",
//           thumbnails: {
//             high: {
//               url: "https://i.ytimg.com/vi/ECfuKi5-Cfs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvmIcX-TgdcH2g_Bd4AUxw6hjmvQ",
//             },
//           },
//           publishTime: "2022-03-02T11:39:31Z",
//           title: "[Playlist] 너무 좋은데 괜찮으시겠어요?",
//         },
//       },
//     ])
//   );
//   const result = await getSearchResult("xooos");
//   expect(result.length).toBe(1);
// });
