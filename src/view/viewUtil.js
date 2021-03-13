import { $ } from '../utils/querySelector.js';

const viewUtil = {
  showElement($element) {
    $element.classList.remove('removed');
  },

  hideElement($element) {
    $element.classList.add('removed');
  },

  showElementBySelector(selector) {
    $(selector).classList.remove('removed');
  },

  hideElementBySelector(selector) {
    const target = $(selector);
    if (Array.isArray(target)) {
      target.forEach(item => {
        item.classList.add('removed');
      });
      return;
    }
    target.classList.add('removed');
  },

};

export default viewUtil;
