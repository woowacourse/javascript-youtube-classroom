import { DOM_STRING } from '../utils/constants.js';
import { $ } from '../utils/common.js';

export default class MainView {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.$modalOpenButton = $(DOM_STRING.MODAL_OPEN_BUTTON);
  }

  bindModalOpenButton(callback) {
    this.$modalOpenButton.addEventListener('click', callback);
  }
}
