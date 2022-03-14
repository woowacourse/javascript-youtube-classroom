import { $ } from '@Utils/Dom';
import { SELECTOR } from '@Constants/Selector';
import { addEventDelegate } from '@Utils/ElementControl';
import Display from '@Core/Display';

export default class Navigation extends Display {
  setContainer() {
    this.container = $(SELECTOR.ID.CLASSROOM_NAVIGATION);
  }

  bindEvents() {
    addEventDelegate(this.container, SELECTOR.ID.SEARCH_MODAL_BUTTON, {
      eventType: 'click',
      handler: this.handleOpenModal.bind(this),
    });
  }

  handleOpenModal({ target: $target }) {
    const modalId = $target.dataset.modal;
    const $modalContainer = $(SELECTOR.ID.MODAL_CONTAINER);

    $modalContainer.classList.remove('hide');
    $(`#${modalId}`, $modalContainer).classList.add('show');
  }
}
