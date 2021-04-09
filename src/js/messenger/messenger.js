import MESSAGE from "./message.js";

class Messenger {
  static #validateMessage(message) {
    if (
      typeof message !== "symbol" ||
      !Object.values(MESSAGE).includes(message)
    ) {
      throw new Error(`적합한 Message가 아닙니다. message: ${String(message)}`);
    }
  }

  #listeners = {};

  deliverMessage(message, data) {
    Messenger.#validateMessage(message);

    this.#listeners[message].forEach((listener) => listener(data));
  }

  addMessageListener(message, messageHandler) {
    Messenger.#validateMessage(message);

    if (!this.#listeners[message]) {
      this.#listeners[message] = [];
    }

    this.#listeners[message].push(messageHandler);
  }
}

const messenger = new Messenger();

export default messenger;
