const throttle = (callback, time) => {
  let throttleReference;

  return function () {
    if (!throttleReference) {
      throttleReference = setTimeout(() => {
        throttleReference = null;
        callback();
      }, time);
    }
  };
};
export default throttle;
