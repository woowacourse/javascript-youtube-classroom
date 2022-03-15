import { $, addEvent } from '@Utils/dom';

export default class Navigation {
  constructor() {
    this.container = $('#classroom-navigation');
    this.bindEvents();
  }

  bindEvents() {
    addEvent(this.container, {
      eventType: 'click',
      selector: '#search-modal-button',
      handler: this.handleOpenModal.bind(this),
    });
  }

  handleOpenModal({ target: $target }) {
    const modalId = $target.dataset.modal;
    const $modalContainer = $('#modal');

    $modalContainer.classList.remove('hide');
    $(`#${modalId}`, $modalContainer).classList.add('show');
  }
}
