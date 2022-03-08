import SearchModal from './searchModal';
import $ from './utils/dom';

export default class App {
  constructor() {
    this.$nav = $('.nav');
    this.addEvent();
    this.searchModal = new SearchModal();
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