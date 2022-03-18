import SearchModalComponent from './SearchModalComponent';
import { dispatch } from '../modules/eventFactory';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { CURRENT_APP_SECTION_VALUE, STATE_STORE_KEY } from '../constants/stateStore';
import { getState, subscribe } from '../modules/stateStore';
import { VIDEO_COMPONENT_TYPE } from '../constants/components';
import SavedVideoListComponent from './VideoListComponent/SavedVideoListComponent';

class AppComponent {
  searchModalComponent = null;

  $searchModalButton = null;

  #parentElement = null;

  constructor(parentElement) {
    this.#parentElement = parentElement;
    this.#mount();
    this.#initDOM();
    this.#initChildrenComponent();
    this.#bindEventHandler();
    this.#subscribeStore();
    dispatch(CUSTOM_EVENT_KEY.INITIALIZE_SAVED_VIDEO_STATE);
  }

  wakeUp(stateKey) {
    const stateValue = getState(stateKey);
    if (stateKey === STATE_STORE_KEY.CURRENT_APP_SECTION) {
      this.#renderCurrentAppSection(stateValue);
    }
    if (stateKey === STATE_STORE_KEY.SAVED_VIDEO) {
      const watchedVideoList = getState(STATE_STORE_KEY.WATCHED_VIDEO);
      this.#renderSavedVideo(stateValue, watchedVideoList);
    }
    if (stateKey === STATE_STORE_KEY.WATCHED_VIDEO) {
      const savedVideoResult = getState(STATE_STORE_KEY.SAVED_VIDEO);
      this.#renderSavedVideo(savedVideoResult, stateValue);
    }
    if (stateKey === STATE_STORE_KEY.IS_SAVED_VIDEO_WAITING) {
      this.#renderSkeletonUI(stateValue);
    }
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$app = document.querySelector('#app');
    this.$buttonNav = document.querySelector('.nav');
    this.$watchVideoSection = document.querySelector('#watch-video-section');
    this.$watchedVideoSection = document.querySelector('#watched-video-section');
    this.$watchVideoButton = document.querySelector('#watch-video-section-button');
    this.$watchedVideoButton = document.querySelector('#watched-video-section-button');
  }

  #initChildrenComponent() {
    this.searchModalComponent = new SearchModalComponent(this.#parentElement);
    this.watchVideoComponent = new SavedVideoListComponent(
      this.$watchVideoSection,
      VIDEO_COMPONENT_TYPE.WATCH
    );
    this.watchedVideoComponent = new SavedVideoListComponent(
      this.$watchedVideoSection,
      VIDEO_COMPONENT_TYPE.WATCHED
    );
  }

  #bindEventHandler() {
    this.$buttonNav.addEventListener('click', ({ target: { id } }) => {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SEARCH_MODAL_BUTTON, {
        detail: {
          targetId: id,
        },
      });
    });
  }

  #subscribeStore() {
    const initialCurrentAppSection = subscribe(STATE_STORE_KEY.CURRENT_APP_SECTION, this);
    this.#renderCurrentAppSection(initialCurrentAppSection);

    const initialSavedVideoIdList = subscribe(STATE_STORE_KEY.SAVED_VIDEO, this);
    const initialWatchedVideoList = subscribe(STATE_STORE_KEY.WATCHED_VIDEO, this);
    this.#renderSavedVideo(initialSavedVideoIdList, initialWatchedVideoList);

    const initialIsSavedVideoWaiting = subscribe(STATE_STORE_KEY.IS_SAVED_VIDEO_WAITING, this);
    this.#renderSkeletonUI(initialIsSavedVideoWaiting);
  }

  #renderCurrentAppSection(currentAppSection) {
    if (currentAppSection === CURRENT_APP_SECTION_VALUE.WATCH) {
      this.#showWatchVideoSection();
    }
    if (currentAppSection === CURRENT_APP_SECTION_VALUE.WATCHED) {
      this.#showWatchedVideoSection();
    }
  }

  #renderSavedVideo(savedVideoResult, initialWatchedVideoList) {
    this.watchVideoComponent.render(savedVideoResult, initialWatchedVideoList);
    this.watchedVideoComponent.render(savedVideoResult, initialWatchedVideoList);
  }

  #renderSkeletonUI(initialIsSavedVideoWaiting) {
    this.watchVideoComponent.renderSkeletonVideoList(initialIsSavedVideoWaiting);
    this.watchedVideoComponent.renderSkeletonVideoList(initialIsSavedVideoWaiting);
  }

  #showWatchVideoSection() {
    this.$watchVideoSection.classList.remove('hide');
    this.$watchedVideoSection.classList.add('hide');
    this.$watchVideoButton.classList.add('checked');
    this.$watchedVideoButton.classList.remove('checked');
  }

  #showWatchedVideoSection() {
    this.$watchVideoSection.classList.add('hide');
    this.$watchedVideoSection.classList.remove('hide');
    this.$watchedVideoButton.classList.add('checked');
    this.$watchVideoButton.classList.remove('checked');
  }

  #generateTemplate() {
    return `<main id="app" class="classroom-container">
    <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
    <nav class="nav">
    <div>
    <button id="watch-video-section-button" class="button nav__button" type="button">👁 볼 영상</button>
    <button id="watched-video-section-button" class="button nav__button" type="button">✅ 본 영상</button>
    </div>
    <button id="search-modal-button" class="button nav__button" type="button">🔍 검색</button>
    </nav>
    <div id="watch-video-section" class="saved-video-section"></div>
    <div id="watched-video-section" class="saved-video-section"></div>
    </main>`;
  }
}

export default AppComponent;
