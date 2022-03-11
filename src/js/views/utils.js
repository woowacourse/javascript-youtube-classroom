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
  const ioCallback = (entries, io) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const lastItem = await lastItemOnInterSect();
        lastItem && io.observe(lastItem);
        io.unobserve(entry.target);
      }
    });
  };

  return new IntersectionObserver(ioCallback, option);
};
