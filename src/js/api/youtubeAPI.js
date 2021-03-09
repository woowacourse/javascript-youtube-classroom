import { YOUTUBE_API_KEY } from '../../../env.js';
import { SEARCH, URL } from '../constants/constant.js';

const youtubeSearchURL = ({ query, nextPageToken, max }) => {
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

  return (
    URL.YOUTUBE_SEARCH +
    Object.entries(queries)
      .map(([key, value]) => {
        if (value === undefined) {
          return [];
        }

        return `${key}=${value}`;
      })
      .flat()
      .join('&')
  );
};

export const api = {
  fetchVideoItems: ({
    query,
    nextPageToken = '',
    max = SEARCH.FETCH_VIDEO_LENGTH,
  }) => {
    return fetch(youtubeSearchURL({ query, nextPageToken, max }), {
      method: 'GET',
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert(
          `데이터 불러오기 실패! : 에러코드 - ${response.status} \n다시 검색해주세요!`
        );
      }
    });
  },
};
