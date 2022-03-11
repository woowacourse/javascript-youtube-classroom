import { DOM_STRING } from '../utils/constants';

export default class MainView {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.$modalOpenButton = document.querySelector(DOM_STRING.MODAL_OPEN_BUTTON);
  }

  bindModalOpenButton(callback) {
    this.$modalOpenButton.addEventListener('click', callback);
  }
}
