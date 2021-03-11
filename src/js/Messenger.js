import { MESSAGE } from "./constants.js";

class Messenger {
  constructor() {
    this.listeners = {};
  }

  deliverMessage(message, data) {
    this.listeners[message].forEach((listener) => listener(data));
  }

  addMessageListener(message, messageHandler) {
    if (!Object.keys(MESSAGE).includes(message)) {
      throw new Error(`적합한 Message가 아닙니다. message: ${MESSAGE}`);
    }

    if (!this.listeners[message]) {
      this.listeners[message] = [];
    }

    this.listeners[message].push(messageHandler);
  }
}

const messenger = new Messenger();

export default messenger;
