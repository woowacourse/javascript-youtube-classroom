import { $ } from '@Utils/Dom';
import { addEventDelegate } from '@Utils/CustomEvent';

export default class Modal {
  $container = $('#modal');

  constructor() {
    this.setBindEvents();
  }

  setBindEvents() {
    addEventDelegate(this.$container, '.dimmer', {
      eventType: 'click',
      handler: this.handleCloseModal,
    });
  }

  handleCloseModal = () => {
    this.$container.classList.add('hide');
    $('.modal-content.show', this.$container).classList.remove('show');
  };
}
