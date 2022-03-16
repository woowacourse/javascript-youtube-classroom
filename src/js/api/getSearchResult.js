import { ITEMS_PER_REQUEST, DEVELOP_MODE } from "../constants/constants";
import mockObject from "../mockObject";

export default async function getSearchResult(
  searchKeyword,
  nextPageToken = ""
) {
  if (DEVELOP_MODE) {
    return {
      items: mockObject(),
      nextPageToken: "ABCDEF",
    };
  }

  const REDIRECT_SERVER_HOST = "https://unruffled-turing-aacdf7.netlify.app";

  const url = new URL("youtube/v3/search", REDIRECT_SERVER_HOST);
  const parameters = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: ITEMS_PER_REQUEST,
    regionCode: "kr",
    safeSearch: "strict",
    pageToken: nextPageToken || "",
    q: searchKeyword,
  });

  url.search = parameters.toString();

  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    // TODO: 에러 메시지 핸들링 객체 만들어서 붙여주기
    return null;
  }
}
