export const $ = (selector, node = document) => node.querySelector(selector);

export const convertYYYYMMDD = (publishTime) => {
  const videoTime = new Date(publishTime.slice(0, 10));
  return (
    videoTime.getFullYear().toString() +
    '년 ' +
    (videoTime.getMonth() + 1).toString().padStart(2, '0') +
    '월 ' +
    videoTime.getDate().toString().padStart(2, '0') +
    '일'
  );
};

export const intersectionObserver = (lastItemOnInterSect, option = {}) => {
  let isFree = true;
  const ioCallback = (entries, io) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting || isFree) {
        isFree = false;
        io.observe(await lastItemOnInterSect());
        io.unobserve(entry.target);
        isFree = true;
      }
    });
  };

  return new IntersectionObserver(ioCallback, option);
};
