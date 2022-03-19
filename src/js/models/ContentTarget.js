export default class ContentTarget {
  #currentTarget = 'unseen';

  set currentTarget(target) {
    this.#currentTarget = target;
  }

  get currentTarget() {
    return this.#currentTarget;
  }
}
