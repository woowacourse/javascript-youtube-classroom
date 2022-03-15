import { $ } from '@Utils/dom';
import Display from '@Core/Display';

export default class Navigation extends Display {
  setContainer() {
    this.container = $('#classroom-navigation');
  }

  bindEvents() {
    this.addEvent({
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
