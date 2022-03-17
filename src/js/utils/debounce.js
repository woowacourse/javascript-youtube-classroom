const debounce = (callBack, delay) => {
  let timeout;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callBack.apply(this, arguments);
    }, delay);
  };
};

export default debounce;
