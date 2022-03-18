import { $ } from '../util/domHelper';

const getMessageTemplate = (message) => `
  <li class="message">${message}</li>
`;

export default class MessageBot {
  #shortMessage = $('.short-message');
  #shortMessageCount = $('#short-message-count');
  #longMessage = $('.long-message');
  #messageCloseButton = $('#message-close-button');
  #messageList = $('.message-list');

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

  dispatchMessage(message) {
    this.#messageList.isnertAdajacentHTML('beforeend', getMessageTemplate(message));

    const shortMessageCount = parseInt(this.#shortMessageCount.textContext, 10);
    this.#shortMessageCount.textContext = shortMessageCount + 1;
  }
}
