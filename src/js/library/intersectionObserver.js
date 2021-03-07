import handleMoreVideoLoading from '../handlers/moreVideoLoading.js';
import $ from './utils/DOM.js';

function createIntersectionObserver() {
  const options = {
    root: $('.modal-inner'),
    rootMargin: '0px',
    threshold: 0.85,
  };

  return new IntersectionObserver(handleMoreVideoLoading, options);
}

export default createIntersectionObserver;
