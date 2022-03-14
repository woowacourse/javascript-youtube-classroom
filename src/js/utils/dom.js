import { ALLOCATE_FOR_RENDER_PX, ERROR_MESSAGE } from "../constants/constants";
import { isEmptyString } from "./utils";

export const scrollToTop = (element = document.querySelector("body")) => {
  element.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const removeChildElements = (parentElement, elements) => {
  elements.forEach((element) => {
    parentElement.removeChild(element);
  });
};

export const render = ({ element, position, template }) => {
  element.insertAdjacentHTML(position, template);
};

export const getTotalScrollHeight = (element) => {
  return element.scrollHeight - ALLOCATE_FOR_RENDER_PX;
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
  scrollToTop(videoList);
  document
    .querySelectorAll(".video-item")
    .forEach((videoItem) => videoList.removeChild(videoItem));
};
