import { CUSTOM_EVENT_KEY } from '../constants/events';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { dispatch } from '../modules/eventFactory';
import { subscribe } from '../modules/stateStore';
import Component from './Component';
import SkeletonListComponent from './SkeletonListComponent';
import VideoComponent from './VideoComponent';

class VideoContainerComponent extends Component {
  $videoList = null;

  $searchResult = null;

  constructor(parentElement) {
    super(parentElement);
    this.mount();
    this.initDOM();
    this.bindEventHandler();
    subscribe(STATE_STORE_KEY.SEARCH_RESULT, this);
    subscribe(STATE_STORE_KEY.IS_WAITING_RESPONSE, this);
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  initDOM() {
    this.$videoList = this.parentElement.querySelector('.video-list');
    this.$searchResult = this.parentElement.querySelector('.search-result');
  }

  bindEventHandler() {
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

  wakeUp(stateValue, stateKey) {
    if (stateKey === STATE_STORE_KEY.IS_WAITING_RESPONSE) {
      this.renderSkeletonUI(stateValue);
    }
    if (stateKey === STATE_STORE_KEY.SEARCH_RESULT) {
      this.renderSearchResult(stateValue);
    }
  }

  renderSkeletonUI(isWaitingResponse) {
    if (isWaitingResponse) {
      this.skeletonListComponent = new SkeletonListComponent(this.$videoList);
      return;
    }
    this.skeletonListComponent.unmount();
  }

  renderSearchResult(searchResult) {
    const { videoList, prevVideoListLength } = searchResult;

    if (prevVideoListLength === 0) {
      this.$searchResult.classList.remove('search-result--no-result');
      this.$searchResult.innerHTML = this.generateHasResultTemplate();
      this.$videoList = this.parentElement.querySelector('.video-list');
    }
    if (videoList === null) {
      this.$searchResult.classList.add('search-result--no-result');
      this.$searchResult.innerHTML = this.generateNoneResultTemplate();
      return;
    }

    videoList
      .slice(prevVideoListLength)
      .forEach(
        (video, idx, arr) =>
          new VideoComponent(this.$videoList, { video, isLastVideo: idx === arr.length - 1 })
      );
  }

  generateTemplate() {
    return `
    <section class="search-result">
    <h3 hidden>검색 결과</h3>
    <ul class="video-list"></ul>
    </section>
    `;
  }

  generateHasResultTemplate() {
    return `<h3 hidden>검색 결과</h3>
    <ul class="video-list"></ul>`;
  }

  generateNoneResultTemplate() {
    return `<h3 hidden>검색 결과</h3>
    <div class="no-result">
      <img src="./not_found.png" alt="no result image" class="no-result__image">
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
      </p>
    </div>`;
  }
}
export default VideoContainerComponent;
