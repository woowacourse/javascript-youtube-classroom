import { VIDEO } from '../constants/constants.js';

export default class ContentTarget {
  #currentTarget = VIDEO.STATE.UNSEEN;

  set currentTarget(target) {
    this.#currentTarget = target;
  }

  get currentTarget() {
    return this.#currentTarget;
  }
}
