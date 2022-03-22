export function formatDateString(dateTimeString) {
  const date = new Date(dateTimeString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function isBlankValue(value) {
  return value.trim() === '';
}

export function removeElementList(childNodesArray) {
  childNodesArray.forEach((element) => element.remove());
}

export function removeAllChildren(parentElement) {
  parentElement.replaceChildren();
}

export function selectDom(selector, baseElement = document) {
  return baseElement.querySelector(selector);
}

export function scrollToTop(element) {
  element.scrollTop = 0;
}

export function removeCommonElements(fromArray, compareArray) {
  return fromArray.filter((element) => !compareArray.includes(element));
}
