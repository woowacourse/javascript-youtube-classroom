import handleMoreVideoLoading from '../handlers/moreVideoLoading.js';
import $ from '../utils/DOM.js';

const intersectionObserver = {
  value: {},

  init() {
    const options = {
      root: $('.modal-inner'),
      rootMargin: '0px',
      threshold: 0.85,
    };
    const observer = new IntersectionObserver(
      handleMoreVideoLoading.bind(this),
      options
    );

    this.set(observer);
  },

  set(observer) {
    this.value = observer;
  },

  get() {
    return this.value;
  },

  disconnect() {
    this.value.disconnect();
  },

  observe($target) {
    this.value.observe($target);
  },
};

export default intersectionObserver;
