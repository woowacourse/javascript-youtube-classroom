import { YOUTUBE_API_KEY } from '../../../env.js';
import { SEARCH } from '../constants/constant.js';

export const api = {
  fetchVideoItems: ({
    query,
    nextPageToken = '',
    max = SEARCH.FETCH_VIDEO_LENGTH,
  }) => {
    return fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&pageToken=${nextPageToken}&q=${query}&max_results=${max}&regionCode=kr&type=video&chart=mostPopular&videoEmbeddable=true&part=snippet`,
      // `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${YOUTUBE_API_KEY}&pageToken=${nextPageToken}&max_results=${max}&type=video&videoEmbeddable=true&part=snippet`,
      {
        method: 'GET',
      }
    ).then(response => {
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
