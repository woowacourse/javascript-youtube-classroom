const convertToKoreaLocaleDate = date => {
  return new Date(date).toLocaleString('ko-KR');
};

const debounce = (callback, wait) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export { convertToKoreaLocaleDate, debounce };
