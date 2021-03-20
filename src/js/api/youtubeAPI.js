import { YOUTUBE_API_KEY } from '../../../env.js';
import { SEARCH, URL } from '../constants/constant.js';

const youtubeSearchURL = ({ query, nextPageToken, max }) => {
  const queries = {
    q: query.toString(),
    key: YOUTUBE_API_KEY,
    pageToken: nextPageToken,
    max_results: max,
    regionCode: 'kr',
    type: 'video',
    chart: 'mostPopular',
    videoEmbeddable: true,
    part: 'snippet',
  };
  const urlSearch = new URLSearchParams(queries).toString();

  return URL.YOUTUBE_SEARCH + urlSearch;
};

export const api = {
  fetchVideoItems: ({
    query,
    nextPageToken = '',
    max = SEARCH.FETCH_VIDEO_LENGTH,
  }) => {
    return fetch(youtubeSearchURL({ query, nextPageToken, max }))
      .then(response => successLoadingData(response))
      .catch(error => failedLoadingData(error));
  },
};

const failedLoadingData = error => {
  throw new Error(
    `데이터 불러오기 실패! ${error.messages}\n다시 검색해주세요!`
  );
};

const successLoadingData = response => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(Error(response.status));
};
