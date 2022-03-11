export function throttleScroll() {
  let throttle = null;
  return function (callback) {
    if (!throttle) {
      throttle = setTimeout(() => {
        throttle = null;
        callback();
      }, 1000);
    }
  };
}
