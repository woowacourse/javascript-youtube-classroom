export const doThrottling = (func, ms) => {
  let throttle;

  return () => {
    if (!throttle) {
      throttle = setTimeout(() => {
        throttle = null;
        func();
      }, ms);
    }
  };
};
