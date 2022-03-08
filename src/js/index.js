import { $ } from './utils/dom.js';

export default class App {
  constructor() {
    this.$nav = $('.nav');
    this.addEvent();
  }

  addEvent() {
    $('#search-modal-button', this.$nav).addEventListener('click', this.openModal);
  }

  openModal() {
    const $modalContainer = $('.modal-container');
    $modalContainer.classList.toggle('hide');
  }
}

new App();