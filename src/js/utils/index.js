export const $ = (selector, node = document) => node.querySelector(selector);

export const isEmpty = (value) => value === '';

export const convertYYYYMMDD = (publishTime) => {
  const videoTime = new Date(publishTime);
  return (
    videoTime.getFullYear().toString() +
    '년 ' +
    videoTime.getMonth().toString().padStart(2, '0') +
    '월 ' +
    videoTime.getDate().toString().padStart(2, '0') +
    '일'
  );
};
