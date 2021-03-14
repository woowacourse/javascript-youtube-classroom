import { YOUTUBE_API_KEY } from '../../../env.js';
import { SEARCH, URL } from '../constants/constant.js';

const youtubeSearchURL = ({ query, nextPageToken, max }) => {
  const urlSearch = new URLSearchParams();
  const queries = {
    q: query,
    key: YOUTUBE_API_KEY,
    pageToken: nextPageToken,
    max_results: max,
    regionCode: 'kr',
    type: 'video',
    chart: 'mostPopular',
    videoEmbeddable: true,
    part: 'snippet',
  };

  Object.entries(queries).forEach(([key, value]) => {
    if (value !== null || value !== undefined) {
      urlSearch.set(key, value);
    }
  });

  return URL.YOUTUBE_SEARCH + urlSearch.toString();
};

export const api = {
  fetchVideoItems: ({
    query,
    nextPageToken = '',
    max = SEARCH.FETCH_VIDEO_LENGTH,
  }) => {
    return fetch(youtubeSearchURL({ query, nextPageToken, max }))
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(Error(response.status));
      })
      .catch(error => {
        alert(
          `데이터 불러오기 실패! : 에러코드 - ${error.message} \n다시 검색해주세요!`
        );
      });
  },
};
