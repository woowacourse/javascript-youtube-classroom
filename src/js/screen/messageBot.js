import { $ } from '../util/domHelper';

const getMessageTemplate = (message) => `
  <li class="message">${message}</li>
`;

export default class MessageBot {
  #shortMessage = $('.short-message');
  #longMessage = $('.long-message');
  #messageCloseButton = $('#message-close-button');

  constructor() {
    this.#shortMessage.addEventListener('click', this.handleMessageModal);
    this.#messageCloseButton.addEventListener('click', this.handleMessageModal);
  }

  handleMessageModal = () => {
    this.toggleMessageClassName();
  };

  toggleMessageClassName() {
    this.#shortMessage.classList.toggle('hide');
    this.#longMessage.classList.toggle('hide');
  }

  static dispatchMessage(message) {
    const messageList = $('.message-list');
    messageList.insertAdjacentHTML('beforeend', getMessageTemplate(message));

    const shortMessageCount = $('#short-message-count');
    shortMessageCount.textContent = Number(shortMessageCount.textContent) + 1;

    const messageBox = $('.long-message-main');
    messageBox.scrollTop = messageBox.scrollHeight;
  }
}
