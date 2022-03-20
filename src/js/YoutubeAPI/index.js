import { _ } from '../utils/fx.js';
import { fetchByGet } from '../utils/index.js';
import { YOUTUBE_API_REQUEST_COUNT } from '../constants/index.js';

const PRIVATE_VARIABLE = {
  nextPageToken: '',
  keyword: '',
};

const makeParameters = () =>
  new URLSearchParams({
    part: 'snippet',
    type: 'video',
    maxResults: YOUTUBE_API_REQUEST_COUNT,
    regionCode: 'kr',
    safeSearch: 'strict',
    pageToken: PRIVATE_VARIABLE.nextPageToken,
    q: PRIVATE_VARIABLE.keyword,
  });

const makeURL = (host) => {
  const url = new URL(host);

  url.search = makeParameters().toString();

  return url;
};

const checkEndPage = () => PRIVATE_VARIABLE.nextPageToken === undefined;

const YoutubeAPI = {
  getVideos(host) {
    if (checkEndPage()) return [];

    return _.go(
      host,
      makeURL,
      fetchByGet,
      (response) => (response.ok ? response.json() : Promise.reject(new Error())),
      (body) => {
        PRIVATE_VARIABLE.nextPageToken = body.nextPageToken;

        return body.items;
      },
    );
  },

  readyToFetch(keyword) {
    PRIVATE_VARIABLE.nextPageToken = '';
    PRIVATE_VARIABLE.keyword = keyword;
  },
};

export default YoutubeAPI;
