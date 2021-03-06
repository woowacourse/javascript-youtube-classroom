import { MESSAGE } from "./constants.js";

class Store {
  constructor() {
    this.listeners = {
      [MESSAGE.KEYWORD_SUBMITTED]: [],
      [MESSAGE.DATA_LOADED]: [],
    };
  }

  postMessage(message, data) {
    this.listeners[message].forEach((listener) => listener(data));
  }

  addMessageListener(message, messageHandler) {
    this.listeners[message].push(messageHandler);
  }
}

const store = new Store();

export default store;
