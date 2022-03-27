export const formatDateString = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const isEmptyValue = (value) => value.trim() === '';

export const removeElementList = (nodeList) => {
  nodeList.forEach((element) => element.remove());
};

export const selectDom = (selector, baseElement = document) => baseElement.querySelector(selector);

export const scrollToTop = (element) => {
  element.scrollTop = 0;
};
