export function formatDateString(dateTimeString) {
  const date = new Date(dateTimeString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function isEmptyValue(value) {
  return value.trim() === '';
}

export function removeElementList(nodeList) {
  nodeList.forEach((element) => element.remove());
}

export function selectDom(selector, baseElement = document) {
  return baseElement.querySelector(selector);
}

export function scrollToTop(element) {
  element.scrollTop = 0;
}
