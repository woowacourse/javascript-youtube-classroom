import { FILTER_TYPE } from '../constants';

export default class VideoFilterOption {
  #liked;
  #checked;

  constructor(liked = FILTER_TYPE.ALL, checked = FILTER_TYPE.ALL) {
    this.#liked = liked;
    this.#checked = checked;
  }

  get liked() {
    return this.#liked;
  }

  get checked() {
    return this.#checked;
  }

  setCheckedNoMatter() {
    this.#checked = FILTER_TYPE.ALL;
  }

  setCheckedOnly() {
    this.#checked = FILTER_TYPE.FULFILLED_ONLY;
  }

  setNotCheckedOnly() {
    this.#checked = FILTER_TYPE.NOT_FULFILLED_ONLY;
  }

  setLikedNoMatter() {
    this.#liked = FILTER_TYPE.ALL;
  }

  setLikedOnly() {
    this.#liked = FILTER_TYPE.FULFILLED_ONLY;
  }

  setNotLikedOnly() {
    this.#liked = FILTER_TYPE.NOT_FULFILLED_ONLY;
  }
}
