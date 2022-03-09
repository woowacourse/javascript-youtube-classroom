import UserLibrary from "../UserLibrary";
import { isDuplicate } from "../utils/utils";

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

// - [ ] 최초 검색 결과는 10개까지만 보여준다.

// 코치에게 질문하기 : 통신을 포함한 비동기 테스트
// test("최초 검색 결과는 10개까지만 보여준다.", () => {
//   const youtubeApp = new YoutubeApp();
//   const keyword = "xooos";
//   const searchResult = youtubeApp.search(keyword);

//   expect(searchResult.length).toBe(10);
// });
