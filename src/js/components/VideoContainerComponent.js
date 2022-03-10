import { CUSTOM_EVENT_KEY } from '../constants/events';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { dispatch } from '../modules/eventFactory';
import { subscribe } from '../modules/stateStore';
import Component from './Component';
import SkeletonListComponent from './SkeletonListComponent';
import VideoComponent from './VideoComponent';

class VideoContainerComponent extends Component {
  $videoList = null;

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
    this.$videoList = document.querySelector('.video-list');
  }

  bindEventHandler() {
    this.$videoList.addEventListener('click', (e) => {
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
    } else {
      this.skeletonListComponent.unmount();
    }
  }

  renderSearchResult(searchResult) {
    const { videoList, prevVideoListLength } = searchResult;

    if (prevVideoListLength === 0) {
      this.$videoList.innerHTML = '';
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
}
export default VideoContainerComponent;
