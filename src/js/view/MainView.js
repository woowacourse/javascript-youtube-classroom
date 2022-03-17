import { DOM_STRING } from '../utils/constants.js';
import { $ } from '../utils/common.js';

export default class MainView {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.$modalOpenButton = $(DOM_STRING.MODAL_OPEN_BUTTON);
    this.$willSeeButton = $('#will-see-button');
    this.$sawButton = $('#saw-button');
  }

  bindModalOpenButton(callback) {
    this.$modalOpenButton.addEventListener('click', callback);
  }

  bindWillSeeButton(callback) {
    this.$willSeeButton.addEventListener('click', event => {
      this.toggleStoreButtons(event.target);
      callback(event.target);
    });
  }

  bindSawButton(callback) {
    this.$sawButton.addEventListener('click', event => {
      this.toggleStoreButtons(event.target);
      callback(event.target);
    });
  }

  toggleStoreButtons(button) {
    button.disabled = true;
    button.classList.add('nav__button-clicked');
    if (button === this.$willSeeButton) {
      this.$sawButton.disabled = false;
      this.$sawButton.classList.remove('nav__button-clicked');
    } else {
      this.$willSeeButton.disabled = false;
      this.$willSeeButton.classList.remove('nav__button-clicked');
    }
  }
}
