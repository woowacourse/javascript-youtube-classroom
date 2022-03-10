import ERROR_MESSAGE from "../constants/ERROR_MESSAGE";
import UserLibrary from "../UserLibrary";

describe("UserLibrary에 동영상의 데이터가 적절히 저장되어야 한다.", () => {
  const userLibrary = new UserLibrary();

  test("UserLibrary에 동영상의 Id값이 저장되어야 한다.", () => {
    const testData = { id: 123, title: "테스트" };

    userLibrary.setData(testData);
    expect(userLibrary.getData().includes(testData)).toBe(true);
  });

  test("UserLibrary에 101개 이상의 데이터가 저장되면 에러 메시지를 반환한다.", () => {
    const userData = Array.from({ length: 101 }, (_, index) => ({
      id: index + 1,
    }));

    expect(() =>
      userData.forEach(() => {
        userLibrary.setData(userData);
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
    const userLibrary = new UserLibrary();
    userLibrary.setData("kkojaeId");

    expect(userLibrary.isSavedVideoId(responseId)).toBe(true);
  });

  test("이미 저장된 videoId이면 false를 반환한다.", () => {
    const userLibrary = new UserLibrary();
    userLibrary.setData("usageId");

    expect(userLibrary.isSavedVideoId(responseId)).toBe(false);
  });
});
