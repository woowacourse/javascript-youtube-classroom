const getCircularReplacer = () => {
  const seen = new WeakSet();

  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const $ = (selector, target = document) => {
  return target.querySelector(selector);
};

export const $$ = (selector, target = document) => {
  return Array.from(target.querySelectorAll(selector));
};

export const createElement = ({
  tag = 'div',
  classes = [],
  textContent = '',
}) => {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = textContent;

  return element;
};

export const isEmptyString = (string) => {
  return string.trim() === '';
};

export const localStorageGetItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return undefined;
  }
};

export const localStorageSetItem = (key, value) => {
  const decycled = JSON.stringify(value, getCircularReplacer());
  if (decycled) {
    localStorage.setItem(key, decycled);
  } else {
    throw new Error('JSON stringify error.');
  }
};

export const unescapeString = (string) => {
  return new DOMParser()
    .parseFromString(string, 'text/html')
    .querySelector('html').textContent;
};
