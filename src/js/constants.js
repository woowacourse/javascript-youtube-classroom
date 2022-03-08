const REDIRECT_SERVER_HOST = 'https://trusting-yonath-35b2a1.netlify.app';

const SEARCH_API = {
  URL: new URL('/dummy/youtube/v3/search', REDIRECT_SERVER_HOST),
  PARAMS: {
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    regionCode: 'kr',
    safeSearch: 'strict',
    pageToken: '',
  },
};

export default SEARCH_API;
