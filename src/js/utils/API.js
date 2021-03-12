import { MAX_RESULTS_COUNT } from "../constants.js";

const REDIRECT_SERVER_HOST = "https://jum0.netlify.app";

const API_END_POINT = (query, nextPageToken = "") =>
  `${REDIRECT_SERVER_HOST}/youtube/search?part=snippet&type=video&maxResults=${MAX_RESULTS_COUNT}&regionCode=kr&safeSearch=strict&pageToken=${nextPageToken}&q=${query}`;

const fetchData = async (query, nextPageToken = "") => {
  const response = await fetch(API_END_POINT(query, nextPageToken));
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error.message);
  }

  return body;
};

export { REDIRECT_SERVER_HOST, fetchData };
