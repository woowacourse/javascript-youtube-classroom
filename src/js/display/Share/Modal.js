import { $ } from '@Utils/Dom';
import { addEventDelegate } from '@Utils/CustomEvent';

export default class Modal {
  $activeModal;
  $container = $('#modal');

  constructor() {
    this.setBindEvents();
  }

  setBindEvents() {
    addEventDelegate(this.$container, '.dimmer', {
      eventType: 'click',
      handler: this.handleCloseModal,
    });

    addEventDelegate($('#app'), '*[data-modal]', {
      eventType: 'click',
      handler: this.handleOpenModal,
    });
  }

  handleOpenModal = ({ target: $target }) => {
    const modalId = $target.dataset.modal;
    const beforeModal = this.$activeModal;

    this.$container.classList.remove('hide');

    !!beforeModal && beforeModal.classList.remove('show');
    this.$activeModal = $(`#${modalId}`);
    this.$activeModal.classList.add('show');
  };

  handleCloseModal = () => {
    this.$container.classList.add('hide');
    this.$activeModal.classList.remove('show');
    this.$activeModal = null;
  };
}
