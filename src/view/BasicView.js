import { $ } from '../utils/querySelector.js';

export default class BasicView {
  _element = {};
  constructor({ ...element }) {
    this._element = element;
  }

  renderHTML($element, htmlString) {
    $element.innerHTML = htmlString;
  }

  insertElement($target, $element) {
    $target.insertAdjacentElement('beforeend', $element);
  }

  insertHTML($target, htmlString) {
    $target.insertAdjacentHTML('beforeend', htmlString);
  }

  showElement($element) {
    $element.classList.remove('removed');
  }

  showElementBySelector(selector) {
    $(selector).classList.remove('removed');
  }

  hideElement($element) {
    $element.classList.add('removed');
  }

  deleteElement($target, $element) {
    $target.removeChild($element);
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
}
