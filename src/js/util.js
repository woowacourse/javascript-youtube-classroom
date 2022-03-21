export const parseDate = (publishedDate) =>
  `${publishedDate.getFullYear()}년 ${publishedDate.getMonth()}월 ${publishedDate.getDate()}일`;

export const parseVideoInfo = (videoList) =>
  videoList.items.map((item) => ({
    id: item.id.videoId,
    thumbnail: item.snippet.thumbnails.medium.url,
    title: item.snippet.title,
    channelName: item.snippet.channelTitle,
    publishedDate: new Date(item.snippet.publishedAt),
  }));

export const getVideoInfo = (video) => ({
  id: video.dataset.videoId,
  thumbnail: video.querySelector('.video-item__thumbnail').currentSrc,
  title: video.querySelector('.video-item__title').textContent,
  channelName: video.querySelector('.video-item__channel-name').textContent,
  publishedDate: video.querySelector('.video-item__published-date').textContent,
  watched: false,
});
