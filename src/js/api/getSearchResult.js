import { ITEMS_PER_REQUEST, ERROR_MESSAGE } from "../constants/constants";

function checkErrorCodeNumber(errorCode) {
  if (errorCode === 403) {
    alert(ERROR_MESSAGE.API_QUOTA_EXCEEDED);
  }
}

export default async function getSearchResult(
  searchKeyword,
  nextPageToken = ""
) {
  const REDIRECT_SERVER_HOST =
    "https://clever-aryabhata-ff1fc1.netlify.app/youtube/v3/search";
  const DUMMY_REDIRECT_SERVER_HOST =
    "https://clever-aryabhata-ff1fc1.netlify.app/dummy/youtube/v3";

  const url = new URL(REDIRECT_SERVER_HOST);
  const dummyUrl = new URL(DUMMY_REDIRECT_SERVER_HOST);

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
  dummyUrl.search = parameters.toString();

  try {
    const response = await fetch(dummyUrl, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      checkErrorCodeNumber(data.error.code);

      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
