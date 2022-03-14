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

const fetchData = async (query) => {
  const response = await fetch(query);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error.message);
  }

  return json;
};

export { OPTIONS, makeURLQuery, fetchData, YOUTUBE_URL };
