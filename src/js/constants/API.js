const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const YOUTUBE_QUERY = {
  PART: {
    SNIPPET: 'snippet',
  },
  ORDER: {
    VIEW_COUNT: 'viewCount',
  },
};

export { YOUTUBE_BASE_URL, YOUTUBE_QUERY };
