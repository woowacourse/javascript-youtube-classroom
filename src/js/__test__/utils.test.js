import { ERROR_MESSAGES, NUM } from "../utils/contants.js";
import { verifySaveId } from "../utils/validation.js";

describe("유효성 검사 테스트", () => {
  test("중복된 데이터를 저장하면 에러가 발생한다.", () => {
    const storage = ["a", "b", "c"];
    const newId = "a";
    expect(() => verifySaveId(storage, newId)).toThrowError(ERROR_MESSAGES.DUPLICATE_DATA);
  });

  test("최대 저장개수를 초과하면 에러가 발생한다.", () => {
    const storage = Array.from({ length: NUM.MAX_STORAGE_LENGTH }, (_, i) => i);
    const newId = "a";
    expect(() => verifySaveId(storage, newId)).toThrowError(ERROR_MESSAGES.FULL_STORAGE);
  });
});
