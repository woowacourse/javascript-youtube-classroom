import { ITEMS_PER_REQUEST, DEVELOP_MODE } from "../constants/constants";
import mockObject from "../mockObject";
import handleError from "../utils/handleError";

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
      console.log(data.error.name);
      console.log(data.error.message);
      throw new Error(data.error.message);
    }

    isProgressing = false;
    return data;
  } catch (error) {
    handleError(error.message);
    isProgressing = false;
    return null;
  }
}
