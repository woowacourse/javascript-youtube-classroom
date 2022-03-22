import { $ } from '../utils/index.js';
import { SELECTOR } from '../constants/index.js';

export default class SwitchVideoView {
  #$app;

  #$switchSeenButton;

  #$switchUnseenButton;

  constructor() {
    this.#$app = $(SELECTOR.APP);
    this.#$switchSeenButton = $(SELECTOR.SEEN_BUTTON);
    this.#$switchUnseenButton = $(SELECTOR.UNSEEN_BUTTON);
  }

  bindSwitchToUnseenScreen(handler) {
    this.#$switchUnseenButton.addEventListener('click', () => {
      handler();
      this.#switchToScreen('unseen');
    });
  }

  bindSwitchToSeenScreen(handler) {
    this.#$switchSeenButton.addEventListener('click', () => {
      handler();
      this.#switchToScreen('seen');
    });
  }

  #switchToScreen(screen) {
    this.#$app.classList.remove('seen', 'unseen');
    this.#$app.classList.add(screen);
  }
}
