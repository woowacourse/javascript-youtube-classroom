import { CUSTOM_EVENT_KEY } from '../constants/events';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { dispatch } from '../modules/eventFactory';
import { subscribe, getState } from '../modules/stateStore';
import { isFirstSearchByKeyword, isNullVideoList } from '../utils/validation';
import SkeletonList from './SkeletonListComponent';
import Video from './VideoComponent';

class VideoContainer {
  $videoList = null;

  $searchResult = null;

  $noResult = null;

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

  render(stateKey) {
    if (stateKey === STATE_STORE_KEY.IS_WAITING_RESPONSE) {
      this.#renderSkeletonUI();
    }
    if (stateKey === STATE_STORE_KEY.SEARCH_RESULT) {
      this.#renderSearchResult();
    }
  }

  #mount() {
    const template = this.#generateTemplate();

    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$videoList = this.#parentElement.querySelector('.video-list');
    this.$searchResult = this.#parentElement.querySelector('.search-result');
    this.$noResult = this.#parentElement.querySelector('.no-result');
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

        const savedVideo = this.#findVideoByVideoId(videoId);

        dispatch(CUSTOM_EVENT_KEY.CLICK_SAVE_BUTTON, {
          detail: {
            savedVideo,
          },
        });
      }
    });
  }

  #subscribeStore() {
    subscribe(STATE_STORE_KEY.SEARCH_RESULT, this);
    this.#renderSearchResult();

    subscribe(STATE_STORE_KEY.IS_WAITING_RESPONSE, this);
    this.#renderSkeletonUI();
  }

  #renderSkeletonUI() {
    const isWaitingResponse = getState(STATE_STORE_KEY.IS_WAITING_RESPONSE);

    if (isWaitingResponse) {
      this.skeletonList = new SkeletonList(this.$videoList);
      return;
    }

    this.skeletonList?.unmount();
  }

  #renderSearchResult() {
    const { videoList, prevVideoListLength } = getState(STATE_STORE_KEY.SEARCH_RESULT);

    if (isNullVideoList(videoList)) {
      this.#showNoResult();
      return;
    }
    if (isFirstSearchByKeyword(prevVideoListLength)) {
      this.$videoList.innerHTML = '';
    }

    this.#showVideoList();

    videoList.slice(prevVideoListLength).forEach(
      (video, idx, arr) =>
        new Video(this.$videoList, {
          video,
          observer: idx === arr.length - 1 ? this.#videoContainerObserver : null,
        })
    );
  }

  #showVideoList() {
    this.$videoList.classList.remove('hide');
    this.$noResult.classList.add('hide');
  }

  #showNoResult() {
    this.$videoList.classList.add('hide');
    this.$noResult.classList.remove('hide');
  }

  #generateTemplate() {
    return `
      <section class="search-result">
        <h3 hidden>검색 결과</h3>

        <ul class="video-list"></ul>

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

  #observeEntries(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        dispatch(CUSTOM_EVENT_KEY.LOAD_NEW_VIDEO_LIST);
      }
    });
  }

  #findVideoByVideoId(targetVideoId) {
    const { videoList } = getState(STATE_STORE_KEY.SEARCH_RESULT);

    const targetVideo = videoList.find((video) => video.getVideoInfo().videoId === targetVideoId);

    return targetVideo;
  }
}
export default VideoContainer;
