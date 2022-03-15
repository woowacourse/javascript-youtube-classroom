export const $ = (selector, parentNode = document) => parentNode.querySelector(selector);

export const removeChildren = parentNode => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};

/* eslint-disable no-param-reassign */
export const arrayToMap = arr => {
  return arr.reduce((obj, val) => {
    obj[val] = 1;
    return obj;
  }, Object.create(null)); // map으로 사용할것이기 때문에 literal이 아닌 Object.create(null)을 사용해서 prototype체인이 일어나지 않도록 한다.
};

export const consoleErrorWithConditionalAlert = (error, errorNameForAlert) => {
  console.error(error);
  if (error.name === errorNameForAlert) {
    alert(error.message);
  }
};
