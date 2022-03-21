import { SELECTOR } from '@Constants/Selector';
import { $ } from '@Utils/Dom';
import { addEventDelegate, addEventOnce } from '@Utils/CustomEvent';

export default class Modal {
  $activeModal;
  $modal = $(SELECTOR.ID.MODAL_CONTAINER);
  $modalDimmer = $(SELECTOR.CLASS.MODAL_DIMMER);

  constructor() {
    this.$container = $(SELECTOR.ID.APP);

    addEventDelegate(this.$modal, SELECTOR.CLASS.MODAL_DIMMER, {
      eventType: 'click',
      handler: this.handleCloseModal,
    });

    addEventDelegate(this.$container, '*[data-open-modal]', {
      eventType: 'click',
      handler: this.handleOpenModal,
    });
  }

  handleOpenModal = ({ target: $target }) => {
    const modalSelector = $target.dataset.openModal;

    this.$modal.classList.remove('hide');
    !!this.$activeModal && this.$activeModal.classList.remove('show');

    this.$activeModal = $(`${modalSelector}`);
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
