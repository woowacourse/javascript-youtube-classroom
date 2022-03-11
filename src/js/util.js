export const $ = (selector, node = document) => node.querySelector(selector);
export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const throttle = (callback, delay) => {
  let timerId;

  return (event) => {
    if (timerId) return;
    timerId = setTimeout(() => { 
      callback(event);
      timerId = null;
    }, delay, event);
  };
};
