import { $ } from '@Utils/Dom';
import Display from '@Core/Display';

export default class Modal extends Display {
  setContainer() {
    this.container = $('#modal');
  }

  bindEvents() {
    this.addEvent({
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
