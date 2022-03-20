import { ERROR_MESSAGE, RULES } from './constants';

const HOME_URL = YOUTUBE_URL;
const TEST_URL = YOUTUBE_URL_DUMMY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search?';

const OPTIONS = {
  part: 'snippet',
  maxResults: RULES.MAX_VIDEO_AMOUNT_PER_REQUEST,
  type: 'video',
};

const stringQuery = (props) => {
  const { url = TEST_URL, keyword, pageToken, options = OPTIONS } = props;
  const query = Object.entries(options).reduce(
    (acc, [key, value]) => (acc += `${key}=${value}&`),
    `${url}q=${keyword}&`
  );

  if (pageToken === '') {
    return query;
  }
  return `${query}pageToken=${pageToken}`;
};

const videoListFormatter = (item) => {
  try {
    const {
      id: { videoId },
      snippet: {
        publishTime,
        channelTitle,
        title,
      },
    } = item;

    const thumbnailURL = item.snippet.thumbnails.medium.url || '';

    const date = new Date(publishTime);
    const dateText = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

    return {
      videoId,
      thumbnailURL,
      title,
      channelTitle,
      publishedDate: dateText,
    };
  } catch (err) {
    throw new Error(ERROR_MESSAGE.NOT_RESULT);
  }
};

const fetchData = async (props) => {
  try {
    const response = await fetch(stringQuery(props));

    if (!response.ok) {
      throw new Error(response.ok);
    }

    const result = await response.json();
    const { nextPageToken } = result;
    const videoList = result.items.map((item) => videoListFormatter(item));

    return { videoList, nextPageToken };
  } catch (error) {
    return { error };
  }
};

export { OPTIONS, fetchData, stringQuery };
