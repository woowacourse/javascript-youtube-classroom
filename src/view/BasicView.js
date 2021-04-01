import { $ } from '../utils/querySelector.js';

export default class BasicView {
  constructor() {}

  renderHTML($element, htmlString) {
    $element.innerHTML = htmlString;
  }

  insertElement($target, $element) {
    $target.insertAdjacentElement('beforeend', $element);
  }

  insertHTML($target, htmlString) {
    $target.insertAdjacentHTML('beforeend', htmlString);
  }

  showElementBySelector(selector) {
    $(selector).classList.remove('removed');
  }

  deleteElement($target, $element) {
    $target.removeChild($element);
  }

  showElement($element) {
    $element.classList.remove('removed');
  }

  hideElement($element) {
    $element.classList.add('removed');
  }

  hideElementBySelector(selector) {
    const target = $(selector);

    if (Array.isArray(target)) {
      target.forEach(item => {
        item.classList.add('removed');
      });
      return;
    }

    target.classList.add('removed');
  }

  focusElement($target) {
    $target.focus();
  }
}
