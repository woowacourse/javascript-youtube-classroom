const convertToKoreaLocaleDate = date => {
  return new Date(date).toLocaleString('ko-KR');
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const debounce = (callback, wait) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export { convertToKoreaLocaleDate, delay, debounce };
