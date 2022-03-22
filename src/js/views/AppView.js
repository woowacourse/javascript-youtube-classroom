import { emit } from '../utils/event.js';
import { $ } from '../utils/dom.js';

import Template from './Template.js';

export default class AppView {
  constructor() {
    this.template = new Template();

    this.$searchModalButton = $('#search-modal-button');
    this.$modalContainer = $('.modal-container');
    this.$willSeeButton = $('#will-see-button');
    this.$sawButton = $('#saw-button');
    this.$willSeeWrapper = $('.will-see-wrapper');
    this.$isEmptyWillSee = $('.is-empty-will-see', this.$willSeeWrapper);
    this.$willSeeList = $('#will-see-list', this.$willSeeWrapper);
    this.$sawWrapper = $('.saw-wrapper');
    this.$isEmptySaw = $('.is-empty-saw', this.$sawWrapper);
    this.$sawList = $('#saw-list', this.$sawWrapper);

    this.#bindEvents();
  }

  #bindEvents() {
    this.$searchModalButton.addEventListener('click', this.#handleClickSearchButton.bind(this));
    this.$willSeeButton.addEventListener('click', this.#handleClickWillSeeButton.bind(this));
    this.$sawButton.addEventListener('click', this.#handleClickSawButton.bind(this));
    this.$willSeeWrapper.addEventListener('click', this.#handleClickUserButton.bind(this));
    this.$sawWrapper.addEventListener('click', this.#handleClickUserButton.bind(this));
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

  #handleClickUserButton({ target }) {
    if (target.classList.contains('user-delete-button')) {
      const deleteVideoId = target.closest('li').dataset.videoId;

      emit(this.$willSeeWrapper, '@delete-video', { deleteVideoId });
    }
    if (target.className === 'user-saw-button') {
      const sawVideoId = target.closest('li').dataset.videoId;

      emit(this.$willSeeWrapper, '@check-saw-video', { sawVideoId });
    }
  }

  renderSavedVideo(savedVideos) {
    this.$willSeeList.replaceChildren();
    this.$sawList.replaceChildren();

    if (savedVideos.length === 0) {
      this.$isEmptyWillSee.classList.remove('hide');
      this.$isEmptySaw.classList.remove('hide');
      return;
    }

    for (const video of savedVideos) {
      if (video.saw) {
        this.$isEmptySaw.classList.add('hide');
        this.$sawList.insertAdjacentHTML('beforeend', this.template.getSavedVideo(video));
        continue;
      }
      this.$isEmptyWillSee.classList.add('hide');
      this.$willSeeList.insertAdjacentHTML('beforeend', this.template.getSavedVideo(video));
    }

    if (this.$willSeeList.childElementCount === 0) {
      this.$isEmptyWillSee.classList.remove('hide');
    }
    if (this.$sawList.childElementCount === 0) {
      this.$isEmptySaw.classList.remove('hide');
    }
  }
}
