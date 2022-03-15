import { RULES } from './constants';

const HOME_URL = YOUTUBE_URL;
const TEST_URL = YOUTUBE_URL_DUMMY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search?';

const OPTIONS = {
  part: 'snippet',
  maxResults: RULES.MAX_VIDEO_AMOUNT_PER_REQUEST,
  type: 'video',
  key: 'AIzaSyAQD6Xy3mRw72FwG6m38yP2b8fvLK4BoB8'
};

const stringQuery = (props) => {
  const { url = BASE_URL, keyword, pageToken, options = OPTIONS } = props;
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
