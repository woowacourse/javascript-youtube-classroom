import { ALLOCATE_FOR_RENDER_PX, ERROR_MESSAGE } from "../constants/constants";
import { isEmptyString } from "./utils";

export const scrollToTop = (element = document.querySelector("body")) => {
  element.scrollTo({
    top: 0,
  });
};

export const removeChildElements = (parentElement, elements) => {
  elements.forEach((element) => {
    parentElement.removeChild(element);
  });
};

export const renderSaveVideo = ({ element, template }) => {
  element.innerHTML = template;
};

export const render = ({ element, position, template }) => {
  element.insertAdjacentHTML(position, template);
};

export const getTotalScrollHeight = (element) => {
  return element.scrollHeight;
};

export const getCurrentScrollHeight = (element) => {
  return element.clientHeight + element.scrollTop;
};

export const validateInput = (inputValue) => {
  if (isEmptyString(inputValue)) {
    throw new Error(ERROR_MESSAGE.SEARCH_INPUT_IS_EMPTY);
  }
};

export const clearModalContainer = (videoList) => {
  console.log(videoList);
  console.log(document.querySelectorAll(".video-item"));
  scrollToTop(videoList);

  document
    .querySelectorAll(".video-item")
    .forEach((videoItem) => videoList.removeChild(videoItem));
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
