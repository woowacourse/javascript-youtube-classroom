import { ITEMS_PER_REQUEST, DEVELOP_MODE } from "../constants/constants";
import mockObject from "../mockObject";

let isProgressing = false;

export default async function getSearchResult(
  searchKeyword,
  nextPageToken = ""
) {
  if (isProgressing) {
    return null;
  }

  if (DEVELOP_MODE) {
    return {
      items: mockObject(),
      nextPageToken: "ABCDEF",
    };
  }

  isProgressing = true;

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

    isProgressing = false;
    return data;
  } catch (error) {
    switch (error.message) {
      case "Failed to fetch":
        alert("인터넷 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.");
        break;
      case "":
        break;
    }

    isProgressing = false;
    return null;
  }
}
