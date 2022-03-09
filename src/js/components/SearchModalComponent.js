import SearchFormComponent from './SearchFormComponent';
import VideoContainerComponent from './VideoContainerComponent';
import { subscribe } from '../modules/stateStore';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { dispatch } from '../modules/eventFactory';

class SearchModalComponent {
  searchFormComponent = null;

  videoContainerComponent = null;

  $searchModal = null;

  $modalContainer = null;

  $dimmer = null;

  #parentElement = null;

  constructor(parentElement) {
    this.#parentElement = parentElement;
    this.#mount();
    this.#initDOM();
    this.#initChidrenComponent();
    this.#bindEventHandler();
    this.#subscribeStore();
  }

  wakeUp(stateValue, stateKey) {
    this.#render(stateValue);
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$modalContainer = this.#parentElement.querySelector('.modal-container');
    this.$searchModal = this.#parentElement.querySelector('.search-modal');
    this.$dimmer = this.#parentElement.querySelector('.dimmer');
  }

  #initChidrenComponent() {
    this.searchFormComponent = new SearchFormComponent(this.$searchModal);
    this.videoContainerComponent = new VideoContainerComponent(this.$searchModal);
  }

  #bindEventHandler() {
    this.$dimmer.addEventListener('click', () => {
      dispatch(CUSTOM_EVENT_KEY.CLICK_OUTSIDE_MODAL);
    });
  }

  #subscribeStore() {
    const initalIsModalShow = subscribe(STATE_STORE_KEY.IS_MODAL_SHOW, this);
    this.#render(initalIsModalShow);
  }

  #render(isModalShow) {
    if (isModalShow) {
      this.$modalContainer.classList.remove('hide');
      return;
    }
    this.$modalContainer.classList.add('hide');
  }

  #generateTemplate() {
    return `
    <div class="modal-container">
    <div class="dimmer"></div>
    <div class="search-modal" role="dialog" aria-labelledby="search-modal-title">
      <h2 id="search-modal-title" class="search-modal__title">🔍 보고싶은 영상 찾기 🔍</h2>
    </div>
  </div>
        `;
  }
}
export default SearchModalComponent;