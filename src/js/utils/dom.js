import { ALLOCATE_FOR_RENDER_PX } from "../constants/constants";

export const bindEventListener = (element, type, callback) => {
  element.addEventListener(type, callback);
};

export const getTargetVideoData = (target, parentSelector) => {
  const parentElement = target.closest(parentSelector);
  const videoDataObject = {
    videoId: parentElement.dataset.videoId,
    channel: parentElement.querySelector(".video-item__channel-name").innerText,
    thumbnail: parentElement.querySelector(".video-item__thumbnail").src,
    title: parentElement.querySelector(".video-item__title").innerText,
    publishTime: parentElement.querySelector(".video-item__published-date")
      .innerText,
    isWatched: false,
  };

  return videoDataObject;
};

export const scrollToTop = (element = document.querySelector("body")) => {
  element.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const totalScrollHeight = (element) => {
  return element.scrollHeight - ALLOCATE_FOR_RENDER_PX;
};

export const currentScrollHeight = (element) => {
  return element.clientHeight + element.scrollTop;
};
