import { MESSAGE } from "./constants/index.js";

class Messenger {
  constructor() {
    this.listeners = {};
  }

  deliverMessage(message, data) {
    this.validateMessage(message);

    this.listeners[message].forEach((listener) => listener(data));
  }

  addMessageListener(message, messageHandler) {
    this.validateMessage(message);

    if (!this.listeners[message]) {
      this.listeners[message] = [];
    }

    this.listeners[message].push(messageHandler);
  }

  // eslint-disable-next-line class-methods-use-this
  validateMessage(message) {
    if (!Object.keys(MESSAGE).includes(message)) {
      throw new Error(`적합한 Message가 아닙니다. message: ${MESSAGE}`);
    }
  }
}

const messenger = new Messenger();

export default messenger;
