export const $ = (selector, node = document) => node.querySelector(selector);

export const intersectionObserver = (lastItemOnInterSect, option = {}) => {
  const ioCallback = (entries, io) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const lastItem = await lastItemOnInterSect();
        if (lastItem) io.observe(lastItem);
        io.unobserve(entry.target);
      }
    });
  };

  return new IntersectionObserver(ioCallback, option);
};
