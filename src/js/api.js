import { RULES } from './constants';

const OPTIONS = {
  part: 'snippet',
  maxResults: RULES.MAX_VIDEOS,
  order: 'date',
};

const KEY = 'VIDEO_IDS';

const stringQuery = (props) => {
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

const fetchData = async (props) => {
  const result = await fetch(stringQuery(props));
  const json = await result.json();

  return json;
};

export { OPTIONS, KEY, fetchData };
