import { dispatch } from '../modules/eventFactory';
import { getState, subscribe } from '../modules/stateStore';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { SAVED_VIDEO_FILTER_TYPE } from '../constants/video';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { DELETE_CHECK_MESSAGE } from '../constants/message';
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
    this.#bindEventHandler();
  }

  render() {
    const savedVideoList = getState(STATE_STORE_KEY.SAVED_VIDEO);
    const filteredVideoList = this.#filterSameFilterTypeVideo(savedVideoList);

    this.$savedVideoListContainer.innerHTML = '';

    if (filteredVideoList.length === 0) {
      this.#showSavedVideoListNoResult();
      return;
    }

    this.#showSavedVideoListContainer();

    filteredVideoList.forEach(
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
    subscribe(STATE_STORE_KEY.SAVED_VIDEO_FILTER, this);
    this.render();
  }

  #bindEventHandler() {
    this.$savedVideoListContainer.addEventListener('click', (e) => {
      const { target } = e;
      const { videoId } = target.closest('.video-item').dataset;

      if (this.#isWatchedButton(target)) {
        dispatch(CUSTOM_EVENT_KEY.CLICK_WATCHED_BUTTON, {
          detail: {
            targetVideoId: videoId,
          },
        });
      } else if (this.#isDeleteButton(target) && this.#checkDelete()) {
        dispatch(CUSTOM_EVENT_KEY.CLICK_DELETE_BUTTON, {
          detail: {
            targetVideoId: videoId,
          },
        });
      }
    });
  }

  #generateTemplate() {
    return `
      <div class="saved-video-list__wrapper">
        <ul class="saved-video-list__container"></ul>
      </div>
      <div class="saved-video-list__no-result">
        <img src="./not_found.png" alt="no result image" class="saved-video-list__no-result-image">
        <p class="saved-video-list__no-result-description">아직 저장된 영상이 없습니다.</p>
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

  #filterSameFilterTypeVideo(savedVideoList) {
    const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);
    const isCurrentFilterTypeWatched = savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCHED;

    const filteredVideoList = savedVideoList.filter((savedVideo) => {
      const { isWatched } = savedVideo.getVideoInfo();

      return isWatched === isCurrentFilterTypeWatched;
    });

    return filteredVideoList;
  }

  #isWatchedButton(targetButton) {
    return targetButton.classList.contains('video-item__watched-button');
  }

  #isDeleteButton(targetButton) {
    return targetButton.classList.contains('video-item__delete-button');
  }

  #checkDelete() {
    return confirm(DELETE_CHECK_MESSAGE);
  }
}

export default SavedVideoListSection;
