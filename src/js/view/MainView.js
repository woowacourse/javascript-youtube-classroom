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
    this.$willSeeButton.addEventListener('click', callback);
  }

  bindSawButton(callback) {
    this.$sawButton.addEventListener('click', callback);
  }
}
