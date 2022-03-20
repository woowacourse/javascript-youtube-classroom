export const getParsedTime = timeString => {
  const time = new Date(timeString);

  return `${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일`;
};

export const uriBuilder = (endPoint, params) =>
  `${endPoint}?${new URLSearchParams(params).toString()}`;

export const filterVideoByStatus = (videos, status) =>
  videos.filter(({ watched }) => watched === status);

export const getParsedVideoItems = items =>
  items.map(item => {
    const { videoId } = item.id;
    const { title, channelTitle, publishTime, thumbnails } = item.snippet;
    return { videoId, title, channelTitle, publishTime, thumbnails: thumbnails.medium.url };
  });
