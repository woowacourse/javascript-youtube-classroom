import { $, addEvent } from '@Utils/dom';
import { EVENT_TYPE, UI_ACTION } from '@Constants';
import UIStore from '@Domain/UIStore';

export default class Modal {
  constructor() {
    this.container = $('#modal');
    this.$modal = $('#search-modal');
    this.bindEvents();
    UIStore.addSubscriber(this.render, ['isModalOpened']);
  }

  bindEvents() {
    addEvent(this.container, {
      eventType: EVENT_TYPE.CLICK,
      selector: '.dimmer',
      handler: this.handleCloseModal,
    });
  }

  handleCloseModal = () => {
    UIStore.dispatch(UI_ACTION.CLOSE_MODAL);
  };

  render = ({ isModalOpened }) => {
    if (isModalOpened) {
      this.container.classList.remove('hide');
      this.$modal.classList.add('show');
      return;
    }
    this.container.classList.add('hide');
    this.$modal.classList.remove('show');
  };
}
