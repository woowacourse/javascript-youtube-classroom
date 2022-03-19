import { RULES } from './constants';

const YOUTUBE_URL =
  'https://622752939a5410d43ba3fbcd--modest-euler-778376.netlify.app/youtube/v3/search?';

const OPTIONS = {
  part: 'snippet',
  maxResults: RULES.MAX_VIDEO_AMOUNT_PER_REQUEST,
  order: 'date',
  type: 'video',
};

const makeURLQuery = (props) => {
  const { url, keyword, pageToken, options } = props;
  const query = Object.entries(options).reduce(
    (acc, [key, value]) => (acc += `${key}=${value}&`),
    `${url}q=${keyword}&`,
  );

  return pageToken ? `${query}pageToken=${pageToken}` : query;
};

const convertStatusToMessage = (status) => {
  if (status === 403) {
    return 'EXCEEDED_QUOTA_TEMPLATE';
  }
  return 'NO_SEARCH_RESULT';
};

const fetchData = async (query) => {
  const response = await fetch(query);

  if (!response.ok) {
    throw new Error(convertStatusToMessage(response.status));
  }

  const json = await response.json();

  return json;
};

const isNoSearchResult = (videoList) => videoList.items.some((item) => !item.snippet);

const fetchVideoList = async (query) => {
  const videoList = await fetchData(query);

  if (isNoSearchResult(videoList)) {
    throw new Error('NO_SEARCH_RESULT');
  }

  return videoList;
};

export { OPTIONS, makeURLQuery, fetchData, YOUTUBE_URL, fetchVideoList };
