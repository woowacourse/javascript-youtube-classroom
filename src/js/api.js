import { RULES } from './constants';

const YOUTUBE_URL =
  'https://622752939a5410d43ba3fbcd--modest-euler-778376.netlify.app/dummy/youtube/v3/search?';

const OPTIONS = {
  part: 'snippet',
  maxResults: RULES.MAX_VIDEO_AMOUNT_PER_REQUEST,
  order: 'date',
};

const makeURLQuery = (props) => {
  const { url, keyword, pageToken, options } = props;
  const query = Object.entries(options).reduce(
    (acc, [key, value]) => (acc += `${key}=${value}&`),
    `${url}q=${keyword}&`
  );

  if (pageToken === '') {
    return query;
  }
  return `${query}pageToken=${pageToken}`;
};

const fetchData = async (query) => {
  const result = await fetch(query);
  const json = await result.json();

  return json;
};

export { OPTIONS, makeURLQuery, fetchData, YOUTUBE_URL };
