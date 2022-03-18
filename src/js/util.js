export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const debounce = (callback, delay) => {
  let timerId;

  return (event) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

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
  thumbnail: video.children[0].currentSrc,
  title: video.children[1].textContent,
  channelName: video.children[2].textContent,
  publishedDate: video.children[3].textContent,
  watched: false,
});
