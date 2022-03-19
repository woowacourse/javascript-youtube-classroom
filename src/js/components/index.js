import SearchModal from './SearchModalComponent';
import SavedVideoListSection from './SavedVideoListSectionComponent';
import { dispatch } from '../modules/eventFactory';
import { subscribe, getState } from '../modules/stateStore';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { SAVED_VIDEO_FILTER_TYPE } from '../constants/video';
import { STATE_STORE_KEY } from '../constants/stateStore';
class App {
  searchModal = null;

  $searchModalButton = null;

  #parentElement = null;

  constructor(parentElement) {
    this.#parentElement = parentElement;
    this.#mount();
    this.#initDOM();
    this.#initChildrenComponent();
    this.#bindEventHandler();
    this.#subscribeStore();
  }

  render() {
    const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);

    if (savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCH_LATER) {
      this.$watchLaterVideoButton.classList.add('focused');
      this.$watchedVideoButton.classList.remove('focused');
    } else if (savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCHED) {
      this.$watchLaterVideoButton.classList.remove('focused');
      this.$watchedVideoButton.classList.add('focused');
    }
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$watchLaterVideoButton = document.querySelector('#watch-later-filter-button');
    this.$watchedVideoButton = document.querySelector('#watched-filter-button');
    this.$searchModalButton = document.querySelector('#search-modal-button');
    this.$savedVideoListSection = document.querySelector('#saved-video-list-section');
  }

  #initChildrenComponent() {
    this.searchModal = new SearchModal(this.#parentElement);
    this.savedVideoListSection = new SavedVideoListSection(this.$savedVideoListSection);
  }

  #bindEventHandler() {
    this.$watchLaterVideoButton.addEventListener('click', this.#handleOnClickWatchLaterButton);
    this.$watchedVideoButton.addEventListener('click', this.#handleOnClickWatchedButton);
    this.$searchModalButton.addEventListener('click', this.#handleOnClickSearchModalButton);
  }

  #subscribeStore() {
    subscribe(STATE_STORE_KEY.SAVED_VIDEO_FILTER, this);
    this.render();
  }

  #generateTemplate() {
    const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);

    return `
      <main id="app" class="classroom-container">
        <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
        <nav class="nav">
          <button id="watch-later-filter-button" class="button nav__filter-button ${
            savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCH_LATER ? 'focused' : ''
          }">👁 볼 영상</button>
          <button id="watched-filter-button" class="button nav__filter-button ${
            savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCHED ? 'focused' : ''
          }">✅ 본 영상</button>
          <button id="search-modal-button" class="button nav__button">🔍 검색</button>
        </nav>
        <section id="saved-video-list-section" class="saved-video-list__section"></section>
      </main>
    `;
  }

  #handleOnClickWatchLaterButton = () => {
    const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);

    if (savedVideoFilter !== SAVED_VIDEO_FILTER_TYPE.WATCH_LATER) {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_VIDEO_FILTER_BUTTON, {
        detail: {
          savedVideoFilterType: SAVED_VIDEO_FILTER_TYPE.WATCH_LATER,
        },
      });
    }
  };

  #handleOnClickWatchedButton = () => {
    const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);

    if (savedVideoFilter !== SAVED_VIDEO_FILTER_TYPE.WATCHED) {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_VIDEO_FILTER_BUTTON, {
        detail: {
          savedVideoFilterType: SAVED_VIDEO_FILTER_TYPE.WATCHED,
        },
      });
    }
  };

  #handleOnClickSearchModalButton = () => {
    dispatch(CUSTOM_EVENT_KEY.CLICK_SEARCH_MODAL_BUTTON);
  };
}
export default App;
