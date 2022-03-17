import { getState, subscribe } from '../modules/stateStore';
import { STATE_STORE_KEY } from '../constants/stateStore';
import SavedVideo from './SavedVideoComponent';

class SavedVideoListSection {
  #parentElement = null;

  $savedVideoListWrapper = null;

  $savedVideoListNoResult = null;

  constructor(parentElement) {
    this.#parentElement = parentElement;

    this.#mount();
    this.#initDOM();
    this.#subscribeStore();
  }

  render() {
    const savedVideoList = getState(STATE_STORE_KEY.SAVED_VIDEO);

    this.$savedVideoListContainer.innerHTML = '';

    if (savedVideoList.length === 0) {
      this.#showSavedVideoListNoResult();
      return;
    }

    this.#showSavedVideoListContainer();
    savedVideoList.forEach(
      (savedVideo) => new SavedVideo(this.$savedVideoListContainer, { savedVideo })
    );
  }

  #mount() {
    const template = this.#generateTemplate();

    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$savedVideoListWrapper = this.#parentElement.querySelector('.saved-video-list__wrapper');
    this.$savedVideoListContainer = this.#parentElement.querySelector(
      '.saved-video-list__container'
    );
    this.$savedVideoListNoResult = this.#parentElement.querySelector(
      '.saved-video-list__no-result'
    );
  }

  #subscribeStore() {
    subscribe(STATE_STORE_KEY.SAVED_VIDEO, this);
    this.render();
  }

  #generateTemplate() {
    return `
      <div class="saved-video-list__wrapper">
        <ul class="saved-video-list__container"></ul>
      </div>
      <div class="saved-video-list__no-result">
        <img src="./not_found.png" alt="no result image" class="no-result__image">
        <p class="no-result__description">아직 저장된 영상이 없습니다.</p>
      </div>
    `;
  }

  #showSavedVideoListContainer() {
    this.$savedVideoListWrapper.classList.remove('hide');
    this.$savedVideoListNoResult.classList.add('hide');
  }

  #showSavedVideoListNoResult() {
    this.$savedVideoListWrapper.classList.add('hide');
    this.$savedVideoListNoResult.classList.remove('hide');
  }
}

export default SavedVideoListSection;
