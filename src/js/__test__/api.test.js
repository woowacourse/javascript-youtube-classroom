import { fetchDataFromKeyword } from "../utils/api.js";
import { dummy } from "./dummyData.js";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => dummy,
  }),
);

describe("검색 api 테스트", () => {
  const keyword = "dummy";

  test("검색어를 입력하면 데이터 10개를 불러온다.", async () => {
    const data = await fetchDataFromKeyword(keyword);
    expect(data.items.length).toBe(10);
  });

  test("다음 페이지 토큰이 있다면 추가로 데이터를 불러올 수 있다.", async () => {
    const nextPageToken = "CAoQAA";
    const data = await fetchDataFromKeyword(keyword, nextPageToken);
    expect(data.items.length).not.toBe(0);
  });
});
