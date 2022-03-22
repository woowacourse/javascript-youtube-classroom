import { MAX_DATA_FETCH_AT_ONCE } from '../constants';

const DUMMY_YOUTUBE_API_URL = 'https://elastic-goldstine-10f16a.netlify.app/dummy/youtube/v3/search?';
const YOUTUBE_API_URL = 'https://elastic-goldstine-10f16a.netlify.app/youtube/v3/search?';
const WRONG_API_URL = 'https://elastic-goldstine-10f16a.netlify.appppp/search?';

function generateFetchURL(keyword, nextPageToken) {
  const searchParams = new URLSearchParams();
  searchParams.append('part', 'snippet');
  searchParams.append('q', keyword);
  searchParams.append('maxResults', MAX_DATA_FETCH_AT_ONCE);
  if (nextPageToken) {
    searchParams.append('pageToken', nextPageToken);
  }
  return DUMMY_YOUTUBE_API_URL + searchParams.toString();
}

export default function fetchYoutubeData(keyword, nextPageToken) {
  return fetch(generateFetchURL(keyword, nextPageToken))
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}
