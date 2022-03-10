import { ITEMS_PER_REQUEST } from "../constants/constants";

export default async function getSearchResult(
  searchKeyword,
  nextPageToken = ""
) {
  const usageRedirect = "https://unruffled-turing-aacdf7.netlify.app";
  const kkojaeRedirect = "https://clever-aryabhata-ff1fc1.netlify.app";
  const REDIRECT_SERVER_HOST = kkojaeRedirect;

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
    console.error(error);
  }
}
