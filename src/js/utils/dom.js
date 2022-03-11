import { ALLOCATE_FOR_RENDER_PX, ERROR_MESSAGE } from "../constants/constants";
import { isEmpty } from "./utils";

export const bindEventListener = (element, type, callback) => {
  element.addEventListener(type, callback);
};

export const addClassList = (element, className) => {
  element.classList.add(className);
};

export const removeClassList = (element, className) => {
  element.classList.remove(className);
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

export const removeAllChildElements = (element) => {
  element.innerHTML = "";
};

export const removeChildElements = (parentElement, elements) => {
  elements.forEach((element) => {
    parentElement.removeChild(element);
  });
};

export const removeChildElement = (parentElement, element) => {
  parentElement.removeChild(element);
};

export const render = ({ element, position, template }) => {
  element.insertAdjacentHTML(position, template);
};

export const totalScrollHeight = (element) => {
  return element.scrollHeight - ALLOCATE_FOR_RENDER_PX;
};

export const currentScrollHeight = (element) => {
  return element.clientHeight + element.scrollTop;
};

export const insertImageSrc = (element, resource) => {
  element.src = resource;
};

export const inputClear = (element) => {
  element.value = "";
};

export const alertMessage = (message) => {
  alert(message);
};

export const validateInput = (inputValue) => {
  if (isEmpty(inputValue)) {
    throw new Error(ERROR_MESSAGE.SEARCH_INPUT_IS_EMPTY);
  }
};
