let timer;

export const throttle = (func, delay) => {
  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      func();
    }, delay);
  }
};
