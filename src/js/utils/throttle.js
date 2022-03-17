export const SCROLL_THROTTLE_DELAY = 500;

const throttle = (callBack, delay) => {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        callBack.apply(this, arguments);
      }, delay);
    }
  };
};

export default throttle;
