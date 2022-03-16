import SearchModalComponent from './SearchModalComponent';
import { dispatch } from '../modules/eventFactory';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { getState, subscribe } from '../modules/stateStore';
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
  }

  wakeUp(stateKey) {
    const stateValue = getState(stateKey);
    this.#render(stateValue);
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
    this.#render(initialCurrentAppSection);
  }

  #render(currentAppSection) {
    if (currentAppSection === 'watch-video-section-button') {
      this.$watchVideoSection.classList.remove('hide');
      this.$watchedVideoSection.classList.add('hide');
      this.$watchVideoButton.classList.add('checked');
      this.$watchedVideoButton.classList.remove('checked');
    }
    if (currentAppSection === 'watched-video-section-button') {
      this.$watchVideoSection.classList.add('hide');
      this.$watchedVideoSection.classList.remove('hide');
      this.$watchVideoButton.classList.remove('checked');
      this.$watchedVideoButton.classList.add('checked');
    }
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
    <div id="watch-video-section" class="video-list hide">watchvideosection</div>
    <div id="watched-video-section" class="video-list hide">watched</div>
    </main>`;
  }
}
export default AppComponent;
