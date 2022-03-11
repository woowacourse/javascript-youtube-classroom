export const findVideoInVideoList = (videoList, targetVideoId) =>
  videoList.find((video) => {
    const { videoId } = video.getVideoInfo();

    return videoId === targetVideoId;
  });
export const findVideoInVideoInfoList = (videoInfoList, targetVideoId) =>
  videoInfoList.find(({ videoId }) => videoId === targetVideoId);

export const parserVideos = (data) => {
  const { nextPageToken } = data;
  const { items } = data;

  return {
    nextPageToken,
    items: items.map((item) => ({
      videoId: item.id?.videoId,
      thumbnail: item.snippet?.thumbnails['default'].url,
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

export const generateQueryString = (params) =>
  Object.entries(params).reduce(
    (prev, [key, value]) => (value ? `${prev}&${key}=${value}` : prev),
    ''
  );

export const createURL = (path, params) => {
  const url = new URL(path, API_URL);
  url.search = generateQueryString(params);

  return url;
};
