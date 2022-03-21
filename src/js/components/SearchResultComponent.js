import { VIDEO_COMPONENT_TYPE } from '../constants/components';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { getState, subscribe } from '../modules/stateStore';
import { isNullVideoList } from '../utils/validation';
import SearchVideoListComponent from './VideoListComponent/SearchVideoListComponent';

class SearchResultComponent {
  #parentElement = null;

  #videoListComponent = null;

  constructor(parentElement) {
    this.#parentElement = parentElement;
    this.#mount();
    this.#initDOM();
    this.#initChildrenComponent();
    this.#subscribeStore();
  }

  wakeUp(stateKey) {
    const stateValue = getState(stateKey);
    if (stateKey === STATE_STORE_KEY.IS_SEARCH_VIDEO_WAITING) {
      this.#renderSkeletonVideoList(stateValue);
    }
    if (stateKey === STATE_STORE_KEY.SEARCH_RESULT) {
      this.#renderSearchResult(stateValue);
    }
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$searchResult = this.#parentElement.querySelector('.search-result');
    this.$noResult = this.#parentElement.querySelector('.no-result');
  }

  #initChildrenComponent() {
    this.#videoListComponent = new SearchVideoListComponent(
      this.$searchResult,
      VIDEO_COMPONENT_TYPE.SEARCH
    );
  }

  #subscribeStore() {
    const initialSearchResult = subscribe(STATE_STORE_KEY.SEARCH_RESULT, this);
    this.#renderSearchResult(initialSearchResult);

    const initialIsSearchVideoWaiting = subscribe(STATE_STORE_KEY.IS_SEARCH_VIDEO_WAITING, this);
    this.#renderSkeletonVideoList(initialIsSearchVideoWaiting);
  }

  #renderSearchResult(searchResult) {
    const { videoList } = searchResult;

    if (isNullVideoList(videoList)) {
      this.$noResult.classList.remove('hide');
      this.#videoListComponent.unmount();
      return;
    }
    this.$noResult.classList.add('hide');
    this.#videoListComponent.render(searchResult);
  }

  #renderSkeletonVideoList(isWaitingResponse) {
    this.$noResult.classList.add('hide');
    this.#videoListComponent.renderSkeletonVideoList(isWaitingResponse);
  }

  #generateTemplate() {
    return `
    <section class="search-result">
    <h3 hidden>검색 결과</h3>
    <div class="no-result">
      <img src="./not_found.png" alt="no result image" class="no-result__image">
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
      </p>
    </div>
    </section>
    `;
  }
}
export default SearchResultComponent;
