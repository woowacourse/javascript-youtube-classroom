export const $ = selector => document.querySelector(selector);

export const transformDate = dateString => {
  const [year, month, date] = dateString.slice(0, 10).split('-');
  return `${year}년 ${month}월 ${date}일`;
};

export const throttleFunc = (callback, delayTime = 1000) => {
  let throttle = null;
  return function (...parameters) {
    if (!throttle) {
      throttle = setTimeout(async () => {
        throttle = null;
        callback(...parameters);
      }, delayTime);
    }
  };
};
