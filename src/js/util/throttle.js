export const applyThrottle = (func, delayTime) => {
  let throttle;
  return (...arg) => {
    clearTimeout(throttle);
    throttle = setTimeout(func.bind(null, ...arg), delayTime);
  };
};
