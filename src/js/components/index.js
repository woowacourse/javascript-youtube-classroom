/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import SearchModal from './SearchModalComponent';
import SavedVideoListSection from './SavedVideoListSectionComponent';
import { dispatch } from '../modules/eventFactory';
import { getState } from '../modules/stateStore';
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
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$nav = document.querySelector('.nav');
    this.$savedVideoListSection = document.querySelector('#saved-video-list-section');
  }

  #initChildrenComponent() {
    this.searchModal = new SearchModal(this.#parentElement);
    this.savedVideoListSection = new SavedVideoListSection(this.$savedVideoListSection);
  }

  #bindEventHandler() {
    this.$nav.addEventListener('click', (e) => {
      if (!e.target.classList.contains('button')) {
        return;
      }

      const { buttonFor } = e.target.dataset;
      const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);

      if (
        buttonFor === 'watch-later-video' &&
        savedVideoFilter !== SAVED_VIDEO_FILTER_TYPE.WATCH_LATER
      ) {
        dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_VIDEO_FILTER_BUTTON, {
          detail: {
            savedVideoFilterType: SAVED_VIDEO_FILTER_TYPE.WATCH_LATER,
          },
        });
      } else if (
        buttonFor === 'watched-video' &&
        savedVideoFilter !== SAVED_VIDEO_FILTER_TYPE.WATCHED
      ) {
        dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_VIDEO_FILTER_BUTTON, {
          detail: {
            savedVideoFilterType: SAVED_VIDEO_FILTER_TYPE.WATCHED,
          },
        });
      } else if (buttonFor === 'search-modal') {
        dispatch(CUSTOM_EVENT_KEY.CLICK_SEARCH_MODAL_BUTTON);
      }
    });
  }

  #generateTemplate() {
    return `<main id="app" class="classroom-container">
    <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
    <nav class="nav">
      <button class="button nav__filter-button" data-button-for="watch-later-video">👁 볼 영상</button>
      <button class="button nav__filter-button" data-button-for="watched-video">✅ 본 영상</button>
      <button id="search-modal-button" class="button nav__button" data-button-for="search-modal">🔍 검색</button>
    </nav>
    <section id="saved-video-list-section" class="saved-video-list__section"></section>
  </main>`;
  }
}
export default App;
