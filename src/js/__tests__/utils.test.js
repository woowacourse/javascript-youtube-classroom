import { isDuplicate } from "../utils/utils";

describe("저장하려는 동영상의 Id값이 기존에 저장된 동영상의 Id값들과 중복되는지 확인한다.", () => {
  const storeData = [{ id: "abc" }];

  test("동영상의 Id값이 중복되면 true를 반환한다.", () => {
    const selectedData = { id: "abc" };

    expect(isDuplicate(selectedData, storeData)).toBe(true);
  });

  test("동영상의 Id값이 중복되지 않으면 false를 반환한다.", () => {
    const selectedData = { id: "bcd" };

    expect(isDuplicate(selectedData, storeData)).toBe(false);
  });
});
