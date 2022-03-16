import { $, addEvent } from '@Utils/dom';
import { EVENT_TYPE } from '@Constants';

export default class Navigation {
  constructor() {
    this.container = $('#classroom-navigation');
    this.bindEvents();
  }

  bindEvents() {
    addEvent(this.container, {
      eventType: EVENT_TYPE.CLICK,
      selector: '#search-modal-button',
      handler: this.handleOpenModal,
    });
  }

  handleOpenModal = ({ target: $target }) => {
    const modalId = $target.dataset.modal;
    const $modalContainer = $('#modal');

    $modalContainer.classList.remove('hide');
    $(`#${modalId}`, $modalContainer).classList.add('show');
  };
}
