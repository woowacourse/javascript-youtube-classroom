import { $, addEvent } from '@Utils/dom';
import { EVENT_TYPE } from '@Constants';

export default class Modal {
  constructor() {
    this.container = $('#modal');
    this.bindEvents();
  }

  bindEvents() {
    addEvent(this.container, {
      eventType: EVENT_TYPE.CLICK,
      selector: '.dimmer',
      handler: this.handleCloseModal,
    });
  }

  handleCloseModal = () => {
    this.container.classList.add('hide');
    $('.modal-content.show', this.container).classList.remove('show');
  };
}
