import { $ } from '../utils/dom.js';

export default class AppView {
  constructor() {
    this.$searchModalButton = $('#search-modal-button');
    this.$modalContainer = $('.modal-container');
    this.$willSeeButton = $('#will-see-button');
    this.$sawButton = $('#saw-button');
    this.$willSeeWrapper = $('.will-see-wrapper');
    this.$sawWrapper = $('.saw-wrapper');

    this.#bindEvents();
  }

  #bindEvents() {
    this.$searchModalButton.addEventListener('click', this.#handleClickSearchButton.bind(this));
    this.$willSeeButton.addEventListener('click', this.#handleClickWillSeeButton.bind(this));
    this.$sawButton.addEventListener('click', this.#handleClickSawButton.bind(this));
  }

  #handleClickSearchButton() {
    this.$modalContainer.classList.remove('hide');
  }

  #handleClickWillSeeButton() {
    this.$sawButton.classList.remove('clicked');
    this.$willSeeButton.classList.add('clicked');

    this.$sawWrapper.classList.add('hide');
    this.$willSeeWrapper.classList.remove('hide');
  }

  #handleClickSawButton() {
    this.$willSeeButton.classList.remove('clicked');
    this.$sawButton.classList.add('clicked');

    this.$willSeeWrapper.classList.add('hide');
    this.$sawWrapper.classList.remove('hide');
  }
}
