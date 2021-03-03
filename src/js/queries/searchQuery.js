import pageToken from "../state/pageToken.js";
import { VIDEOS } from "../utils/constants.js";
import YOUTUBE_API_KEY from "../config/youtubeAPI.js";

export function getSearchQueryString(keyword) {
  const pageTokenQuery = pageToken.get() && `pageToken=${pageToken.get()}`;

  return `part=snippet&key=${YOUTUBE_API_KEY}&q=${keyword}&maxResults=${VIDEOS.SEARCH_MAX_RESULT}&${pageTokenQuery}`;
}
