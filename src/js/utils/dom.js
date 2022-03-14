import { ALLOCATE_FOR_RENDER_PX } from "../constants/constants";

export const bindEventListener = (element, type, callback) => {
  element.addEventListener(type, callback);
};

export const findTargetDataset = (target, parentSelector) => {
  return target.closest(parentSelector).dataset;
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
