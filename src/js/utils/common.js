export const $ = selector => document.querySelector(selector);

export const throttle = (function () {
  let throttle = null;
  return function (callback) {
    if (!throttle) {
      throttle = setTimeout(() => {
        throttle = null;
        callback();
      }, 1000);
    }
  };
})();
