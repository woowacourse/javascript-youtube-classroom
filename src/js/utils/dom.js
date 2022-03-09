export const $ = (selector, parentNode = document) => parentNode.querySelector(selector);

export const removeChildren = (parentNode) => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};
