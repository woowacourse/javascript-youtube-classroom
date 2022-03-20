export const $ = (selector, target = document) =>
  target.querySelector(selector);

export const $$ = (selector, target = document) =>
  target.querySelectorAll(selector);

export const scrollToTop = (element = document.querySelector("body")) => {
  element.scrollTo({
    top: 0,
  });
};

export const getTotalScrollHeight = (element) => {
  return element.scrollHeight;
};

export const getCurrentScrollHeight = (element) => {
  return element.clientHeight + element.scrollTop;
};

export const getTargetData = (element) => {
  const { videoId } = element.dataset;
  const thumbnailUrl = element.querySelector(".video-item__thumbnail").src;
  const title = element.querySelector(".video-item__title").textContent;
  const channelName = element.querySelector(
    ".video-item__channel-name"
  ).textContent;
  const publishDate = element.querySelector(
    ".video-item__published-date"
  ).textContent;

  return {
    videoId,
    thumbnailUrl,
    title,
    channelName,
    publishDate,
    checked: false,
  };
};

export const confirmRemoveVideo = (element) => {
  const videoTitle = $(".video-item__title", element).textContent.trim();

  return !confirm(`${videoTitle}\n영상을 정말 삭제하시겠습니까?`);
};
