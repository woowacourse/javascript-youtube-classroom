import { $ } from '@Utils/Dom';
import { SELECTOR } from '@Constants/Selector';
import Display from '@Core/Display';

export default class Navigation extends Display {
  setContainer() {
    this.container = $(SELECTOR.ID.CLASSROOM_NAVIGATION);
  }

  bindEvents() {
    this.addEvent({
      eventType: 'click',
      selector: SELECTOR.ID.SEARCH_MODAL_BUTTON,
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
