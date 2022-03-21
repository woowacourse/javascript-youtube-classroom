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
      this.#selectWatchLaterVideoButton();
    } else if (savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCHED) {
      this.#selectWatchedVideoButton();
    }
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$watchLaterFilterButton = document.querySelector('#watch-later-filter-button');
    this.$watchedFilterButton = document.querySelector('#watched-filter-button');
    this.$searchModalButton = document.querySelector('#search-modal-button');
    this.$savedVideoListSection = document.querySelector('#saved-video-list-section');
  }

  #initChildrenComponent() {
    this.searchModal = new SearchModal(this.#parentElement);
    this.savedVideoListSection = new SavedVideoListSection(this.$savedVideoListSection);
  }

  #bindEventHandler() {
    this.$watchLaterFilterButton.addEventListener(
      'click',
      this.#handleOnClickWatchLaterFilterButton
    );
    this.$watchedFilterButton.addEventListener('click', this.#handleOnClickWatchedFilterButton);
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
            savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCH_LATER ? 'selected' : ''
          }">👁 볼 영상</button>
          <button id="watched-filter-button" class="button nav__filter-button ${
            savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCHED ? 'selected' : ''
          }">✅ 본 영상</button>
          <button id="search-modal-button" class="button nav__button">🔍 검색</button>
        </nav>
        <section id="saved-video-list-section" class="saved-video-list__section"></section>
      </main>
    `;
  }

  #selectWatchLaterVideoButton() {
    this.$watchLaterFilterButton.classList.add('selected');
    this.$watchedFilterButton.classList.remove('selected');
  }

  #selectWatchedVideoButton() {
    this.$watchLaterFilterButton.classList.remove('selected');
    this.$watchedFilterButton.classList.add('selected');
  }

  #handleOnClickWatchLaterFilterButton = () => {
    const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);

    if (this.#isAlreadySelected(savedVideoFilter, SAVED_VIDEO_FILTER_TYPE.WATCH_LATER)) {
      return;
    }

    dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_VIDEO_FILTER_BUTTON, {
      detail: {
        savedVideoFilterType: SAVED_VIDEO_FILTER_TYPE.WATCH_LATER,
      },
    });
  };

  #handleOnClickWatchedFilterButton = () => {
    const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);

    if (this.#isAlreadySelected(savedVideoFilter, SAVED_VIDEO_FILTER_TYPE.WATCHED)) {
      return;
    }

    dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_VIDEO_FILTER_BUTTON, {
      detail: {
        savedVideoFilterType: SAVED_VIDEO_FILTER_TYPE.WATCHED,
      },
    });
  };

  #handleOnClickSearchModalButton = () => {
    dispatch(CUSTOM_EVENT_KEY.CLICK_SEARCH_MODAL_BUTTON);
  };

  #isAlreadySelected(currentSavedVideoFilter, targetSavedVideoFilter) {
    return currentSavedVideoFilter === targetSavedVideoFilter;
  }
}
export default App;
