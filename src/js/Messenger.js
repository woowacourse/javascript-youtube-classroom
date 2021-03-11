import { MESSAGE } from "./constants.js";

class Messenger {
  constructor() {
    this.listeners = {
      [MESSAGE.KEYWORD_SUBMITTED]: [],
      [MESSAGE.DATA_LOADED]: [],
      [MESSAGE.SAVE_VIDEO_BUTTON_CLICKED]: [],
      [MESSAGE.VIDEO_SAVED]: [],
      [MESSAGE.HIDE_IF_VIDEO_IS_SAVED]: [],
    };
  }

  deliverMessage(message, data) {
    this.listeners[message].forEach((listener) => listener(data));
  }

  addMessageListener(message, messageHandler) {
    this.listeners[message].push(messageHandler);
  }
}

const messenger = new Messenger();

export default messenger;

