export const doThrottling = (() => {
  let throttle;

  return (func, ms) => {
    if (!throttle) {
      throttle = setTimeout(() => {
        throttle = null;
        func();
      }, ms);
    }
  };
})();
