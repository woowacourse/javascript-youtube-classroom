import { NUMBER } from "../constants/index.js";

const REDIRECT_SERVER_HOST = "https://bigsaigon333.netlify.app";

const fetchYoutubeData = async (query, nextPageToken = "") => {
  const url = new URL("youtube/search", REDIRECT_SERVER_HOST);
  const parameters = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: NUMBER.MAX_RESULTS_COUNT,
    regionCode: "kr",
    safeSearch: "strict",
    pageToken: nextPageToken || "",
    q: query,
  });
  url.search = parameters.toString();

  const response = await fetch(url, { method: "GET" });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error.message);
  }

  return body;
};

export { REDIRECT_SERVER_HOST, fetchYoutubeData };
