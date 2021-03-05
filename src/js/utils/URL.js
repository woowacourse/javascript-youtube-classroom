import API_KEY from "../key.js";

// TODO: built-in URL 객체와 이름이 동일하므로 이름 수정하여야 함
export const URL = (query, nextPageToken = "") =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&regionCode=kr&safeSearch=strict&pageToken=${nextPageToken}&q=${query}}&key=${API_KEY}`;
