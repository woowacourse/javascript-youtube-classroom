import { VIDEOS } from "../utils/constants.js";
import YOUTUBE_API_KEY from "../config/youtubeAPI.js";
import searchHistory from "../state/searchHistory.js";

export function getSearchQueryString() {
  const pageTokenQuery =
    searchHistory.getPageToken() && `pageToken=${searchHistory.getPageToken()}`;

  return `part=snippet&key=${YOUTUBE_API_KEY}&q=${searchHistory.getKeyword()}&maxResults=${
    VIDEOS.SEARCH_MAX_RESULT
  }&${pageTokenQuery}`;
}
