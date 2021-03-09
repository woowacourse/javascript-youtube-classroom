import { $ } from '../utils/querySelector.js';

const viewUtil = {
  renderByElement($element, htmlString) {
    $element.innerHTML = htmlString;
  },
  insertByElement($element, htmlString) {
    $element.insertAdjacentHTML('beforeend', htmlString);
  },
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

  removeStyleClass($element, removingClass) {
    $element.classList.remove(removingClass);
  },

  addStyleClass($element, removingClass) {
    $element.classList.remove(removingClass);
  }

};

export default viewUtil;
