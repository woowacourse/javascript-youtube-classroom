import { CUSTOM_EVENT_KEY } from '../constants/events';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { dispatch } from '../modules/eventFactory';
import { subscribe } from '../modules/stateStore';
import SkeletonListComponent from './SkeletonListComponent';
import VideoComponent from './VideoComponent';

class VideoContainerComponent {
  $videoList = null;

  $searchResult = null;

  #parentElement = null;

  #videoContainerObserver;

  constructor(parentElement) {
    this.#parentElement = parentElement;

    this.#mount();
    this.#initDOM();
    this.#bindEventHandler();
    this.#subscribeStore();

    this.#videoContainerObserver = new IntersectionObserver(this.#observeEntries, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });
  }

  wakeUp(stateValue, stateKey) {
    if (stateKey === STATE_STORE_KEY.IS_WAITING_RESPONSE) {
      this.#renderSkeletonUI(stateValue);
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
    this.$videoList = this.#parentElement.querySelector('.video-list');
    this.$searchResult = this.#parentElement.querySelector('.search-result');
  }

  #bindEventHandler() {
    this.$searchResult.addEventListener('click', (e) => {
      const {
        target: { className },
      } = e;

      if (className.includes('video-item__save-button')) {
        const {
          dataset: { videoId },
        } = e.target.closest('.video-item');

        dispatch(CUSTOM_EVENT_KEY.CLICK_SAVE_BUTTON, {
          detail: {
            saveVideoId: videoId,
          },
        });
      }
    });
  }

  #subscribeStore() {
    const initialSearchResult = subscribe(STATE_STORE_KEY.SEARCH_RESULT, this);
    this.#renderSearchResult(initialSearchResult);

    const initialIsWaitingResponse = subscribe(STATE_STORE_KEY.IS_WAITING_RESPONSE, this);
    this.#renderSkeletonUI(initialIsWaitingResponse);
  }

  #renderSkeletonUI(isWaitingResponse) {
    if (isWaitingResponse) {
      this.skeletonListComponent = new SkeletonListComponent(this.$videoList);
      return;
    }
    /** 하위컴포넌트의 메소드를 직접 수행하고 싶지 않습니다.. unmount 되도록 하는게 좋겟져 ?! */
    this.skeletonListComponent?.unmount();
  }

  #renderSearchResult(searchResult) {
    const { videoList, prevVideoListLength } = searchResult;

    /** innerHTML의 사용 없이 hide나 show 클래스로 제어해볼까? */
    if (prevVideoListLength === 0) {
      this.$searchResult.classList.remove('search-result--no-result');
      this.$searchResult.innerHTML = this.#generateHasResultTemplate();
      this.$videoList = this.#parentElement.querySelector('.video-list');
    }
    if (videoList === null) {
      this.$searchResult.classList.add('search-result--no-result');
      this.$searchResult.innerHTML = this.#generateNoneResultTemplate();
      return;
    }

    videoList.slice(prevVideoListLength).forEach(
      (video, idx, arr) =>
        new VideoComponent(this.$videoList, {
          video,
          observer: idx === arr.length - 1 ? this.#videoContainerObserver : null,
        })
    );
  }

  #generateTemplate() {
    return `
    <section class="search-result">
    </section>
    `;
  }

  #generateHasResultTemplate() {
    return `<h3 hidden>검색 결과</h3>
    <ul class="video-list"></ul>`;
  }

  #generateNoneResultTemplate() {
    return `<h3 hidden>검색 결과</h3>
    <div class="no-result">
      <img src="./not_found.png" alt="no result image" class="no-result__image">
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
      </p>
    </div>`;
  }

  #observeEntries(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        dispatch(CUSTOM_EVENT_KEY.SCROLL_VIDEO_CONTAINER);
      }
    });
  }
}
export default VideoContainerComponent;
