import { $, addEvent } from '@Utils/dom';

export default class Modal {
  constructor() {
    this.container = $('#modal');
    this.bindEvents();
  }

  bindEvents() {
    addEvent(this.container, {
      eventType: 'click',
      selector: '.dimmer',
      handler: this.handleCloseModal.bind(this),
    });
  }

  handleCloseModal() {
    this.container.classList.add('hide');
    $('.modal-content.show', this.container).classList.remove('show');
  }
}
