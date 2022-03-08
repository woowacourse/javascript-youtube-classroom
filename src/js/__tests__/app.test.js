// - [ ] 최초 검색 결과는 10개까지만 보여준다.
// - [ ] 내가 검색한 영상들의 JSON 데이터를 localStorage에 저장한다.
//   - 저장 가능한 최대 동영상의 갯수는 100개이다.
// - [ ] 이미 저장된 영상이라면 저장 버튼이 보이지 않도록 한다.
// - [ ] 유튜브 검색 API를 사용해 내가 보고 싶은 영상들을 검색할 수 있다.

// UserLibrary에 영상이 저장되는지 확인
// UserLibrary 101개 이상의 동영상이 저장되면 alert을 띄운다.
import UserLibrary from "../app";

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
