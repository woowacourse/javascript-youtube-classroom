import { ITEMS_PER_REQUEST } from "../constants/constants";

export default async function getSearchResult(
  searchKeyword,
  nextPageToken = ""
) {
  const REDIRECT_SERVER_HOST =
    "https://clever-aryabhata-ff1fc1.netlify.app/youtube/v3/search";
  const DUMMY_REDIRECT_SERVER_HOST =
    "https://clever-aryabhata-ff1fc1.netlify.app/dummy/youtube/v3";

  const url = new URL(REDIRECT_SERVER_HOST);
  // const url = new URL(DUMMY_REDIRECT_SERVER_HOST);

  const parameters = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: ITEMS_PER_REQUEST,
    regionCode: "kr",
    safeSearch: "strict",
    pageToken: nextPageToken,
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
    console.error(error);
  }
}
