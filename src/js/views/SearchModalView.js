import { $ } from '../utils/dom.js';
import View from './View.js';

export default class SearchModalView extends View {
  constructor($element) {
    super($element);
    // const $modalClose = document.querySelector('.modal-close');
  }

  openModal() {
    this.$element.addClass('open');
  }

  closeModal() {
    this.$element.removeClass('open');
  }
  // $modalClose.addEventListener('click', onModalClose);
}
