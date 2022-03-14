import { $ } from '@Utils/Dom';
import Display from '@Core/Display';
import { addEventDelegate } from '@Utils/ElementControl';

export default class Modal extends Display {
  setContainer() {
    this.container = $('#modal');
  }

  bindEvents() {
    addEventDelegate(this.container, '.dimmer', {
      eventType: 'click',
      handler: this.handleCloseModal.bind(this),
    });
  }

  handleCloseModal() {
    this.container.classList.add('hide');
    $('.modal-content.show', this.container).classList.remove('show');
  }
}
