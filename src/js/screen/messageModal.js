import { getMessageTemplate } from './template';

import { $ } from '../util/domHelper';

export default class MessageBot {
  #shortMessage = $('.short-message');
  #longMessage = $('.long-message');
  #messageCloseButton = $('#message-close-button');

  constructor() {
    this.#shortMessage.addEventListener('click', this.handleMessageModal);
    this.#messageCloseButton.addEventListener('click', this.handleMessageModal);
  }

  handleMessageModal = () => {
    this.#shortMessage.classList.toggle('hide');
    this.#longMessage.classList.toggle('hide');
  };

  dispatchMessage(type, message) {
    if (this.#longMessage.classList.contains('hide')) {
      this.handleMessageModal();
    }

    const $messageList = $('.message-list');
    $messageList.insertAdjacentHTML('beforeend', getMessageTemplate(type, message));

    const $shortMessageCount = $('#short-message-count');
    $shortMessageCount.textContent = Number($shortMessageCount.textContent) + 1;

    const $messageBox = $('.long-message-main');
    $messageBox.scrollTop = $messageBox.scrollHeight;
  }
}
