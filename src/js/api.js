import { RULES } from './constants';

const HOME_URL = YOUTUBE_URL;
const TEST_URL = YOUTUBE_URL_DUMMY;

const OPTIONS = {
  part: 'snippet',
  maxResults: RULES.MAX_VIDEO_AMOUNT_PER_REQUEST,
  order: 'relevance',
  type: 'video'
};

const stringQuery = (props) => {
  const { url = HOME_URL, keyword, pageToken, options = OPTIONS } = props;
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
  try {
    const response = await fetch(stringQuery(props));

    if (!response.ok) {
      throw new Error(response.ok);
    }

    const videoList = await response.json();

    return { videoList };
  } catch (error) {
    return { error };
  }
};

export { OPTIONS, fetchData, stringQuery };
