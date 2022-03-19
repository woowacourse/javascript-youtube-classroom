import { $ } from '@Utils/Dom';
import { addEventDelegate } from '@Utils/CustomEvent';

class Modal {
  $activeModal;
  $container;
  $modal = $('#modal');

  enable(container) {
    this.$container = $(container);
    this.setBindEvents();
  }

  setBindEvents() {
    addEventDelegate(this.$modal, '.dimmer', {
      eventType: 'click',
      handler: this.handleCloseModal,
    });

    addEventDelegate(this.$container, '*[data-modal]', {
      eventType: 'click',
      handler: this.handleOpenModal,
    });
  }

  handleOpenModal = ({ target: $target }) => {
    const modalId = $target.dataset.modal;
    const beforeModal = this.$activeModal;

    this.$modal.classList.remove('hide');

    !!beforeModal && beforeModal.classList.remove('show');
    this.$activeModal = $(`#${modalId}`);
    this.$activeModal.classList.add('show');
  };

  handleCloseModal = () => {
    this.$modal.classList.add('hide');
    this.$activeModal.classList.remove('show');
    this.$activeModal = null;
  };
}

export default new Modal();
