import SearchModalComponent from './SearchModalComponent';
import { dispatch } from '../modules/eventFactory';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { getState, subscribe } from '../modules/stateStore';
import SavedVideoSectionComponent from './SavedVideoSectionComponent';

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
      this.#renderSavedVideo(stateValue);
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
    this.watchVideoComponent = new SavedVideoSectionComponent(this.$app, { type: 'WATCH' });
    this.watchedVideoComponent = new SavedVideoSectionComponent(this.$app, { type: 'WATCHED' });
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
    this.#renderSavedVideo(initialSavedVideoIdList);

    const initialIsSavedVideoWaiting = subscribe(STATE_STORE_KEY.IS_SAVED_VIDEO_WAITING, this);
    this.#renderSkeletonUI(initialIsSavedVideoWaiting);
  }

  #renderCurrentAppSection(currentAppSection) {
    if (currentAppSection === 'watch-video-section-button') {
      this.watchVideoComponent.show();
      this.watchedVideoComponent.hide();
      this.$watchVideoButton.classList.add('checked');
      this.$watchedVideoButton.classList.remove('checked');
    }
    if (currentAppSection === 'watched-video-section-button') {
      this.watchedVideoComponent.show();
      this.watchVideoComponent.hide();
      this.$watchedVideoButton.classList.add('checked');
      this.$watchVideoButton.classList.remove('checked');
    }
  }

  #renderSavedVideo(savedVideoResult) {
    console.log(savedVideoResult);
    this.watchVideoComponent.renderSavedVideoList(savedVideoResult);
    this.watchedVideoComponent.renderSavedVideoList(savedVideoResult);
  }

  #renderSkeletonUI(initialIsSavedVideoWaiting) {
    this.watchVideoComponent.renderSkeletonUI(initialIsSavedVideoWaiting);
    this.watchedVideoComponent.renderSkeletonUI(initialIsSavedVideoWaiting);
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
    </main>`;
  }
}

export default AppComponent;
