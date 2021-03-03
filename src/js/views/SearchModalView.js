import { $ } from '../utils/dom.js';
import View from './View.js';

export default class SearchModalView extends View {
  constructor($element) {
    super($element);
    this.closeButton = $('.modal-close');

    this.bindModalEvents();
  }

  bindModalEvents() {
    this.closeButton.setEvent('click', () => {
      this.closeModal();
      this.emit('closeModal');
    });
  }

  openModal() {
    this.$element.addClass('open');
  }

  closeModal() {
    this.$element.removeClass('open');
  }
}
