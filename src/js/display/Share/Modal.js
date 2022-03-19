import { $ } from '@Utils/Dom';
import { addEventDelegate, addEventOnce } from '@Utils/CustomEvent';

class Modal {
  $activeModal;
  $container;
  $modal = $('#modal');
  $modalDimmer = $('.dimmer');

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

    document.body.classList.add('scroll-lock');
  };

  handleCloseModal = () => {
    this.$modal.classList.add('disappear');
    document.body.classList.remove('scroll-lock');

    addEventOnce('animationend', this.$modalDimmer, () => {
      this.$modal.classList.add('hide');
      this.$modal.classList.remove('disappear');
      this.$activeModal.classList.remove('show');
      this.$activeModal = null;
    });
  };
}

export default new Modal();
