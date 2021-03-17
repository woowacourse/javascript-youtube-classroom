import { VIDEOS } from "../utils/constants.js";
import YOUTUBE_API_KEY from "../config/youtubeAPI.js";

function generateSearchQuery(keyword, pageToken) {
  const searchQuery = {
    part: "snippet",
    key: YOUTUBE_API_KEY,
    q: keyword,
    maxResults: VIDEOS.SEARCH_MAX_RESULT,
  };

  if (pageToken && pageToken !== "") {
    return {
      ...searchQuery,
      pageToken,
    };
  }

  return searchQuery;
}

export function getSearchQueryString(keyword, pageToken) {
  const searchQuery = new URLSearchParams(
    generateSearchQuery(keyword, pageToken)
  );

  return searchQuery.toString();
}
