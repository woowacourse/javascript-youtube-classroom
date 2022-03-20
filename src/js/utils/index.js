import { _ } from './fx.js';

export const formatDate = (fullDate) =>
  fullDate.slice(0, 10).replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일');

export const $ = (selector, node = document) => node.querySelector(selector);

export const intersectionObserver = (lastItemOnInterSect, option = {}) => {
  const ioCallback = (entries, io) =>
    _.go(
      entries,
      _.filter((entry) => entry.isIntersecting),
      _.each(({ target }) => io.unobserve(target)),
      _.each(
        _.pipe(lastItemOnInterSect, (lastItem) => {
          if (lastItem) io.observe(lastItem);
        }),
      ),
    );

  return new IntersectionObserver(ioCallback, option);
};

export const fetchByGet = (url) => fetch(url, { method: 'GET' });
