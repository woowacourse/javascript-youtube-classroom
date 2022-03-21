export const parserVideos = (data) => {
  const { nextPageToken } = data;
  const { items } = data;

  return {
    nextPageToken,
    items: items.map((item) => ({
      videoId: item.id?.videoId,
      thumbnail: item.snippet?.thumbnails.high.url,
      publishTime: item.snippet?.publishTime,
      channelTitle: item.snippet?.channelTitle,
      videoTitle: item.snippet?.title,
    })),
  };
};

export const parseTimeStamp = (time) => {
  const date = new Date(time);
  const year = date.getUTCFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export const createURL = (path, params) => {
  const url = new URL(path, API_URL);
  url.search = new URLSearchParams(params).toString();
  return url;
};
