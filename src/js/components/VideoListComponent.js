import { CUSTOM_EVENT_KEY } from '../constants/events';
import { dispatch } from '../modules/eventFactory';
import { isFirstSearchByKeyword } from '../utils/validation';
import SkeletonListComponent from './SkeletonListComponent';
import VideoComponent from './VideoComponent';

class VideoListComponent {
  #parentElement = null;

  #componentType = 'SEARCH';

  #videoComponents = [];

  #lazyLoadThrottleTimeout = null;

  #searchVideoObserver = null;

  #skeletonListComponent = null;

  constructor(parentElement, type = 'SEARCH') {
    this.#parentElement = parentElement;
    this.#componentType = type;
    this.#mount();
    this.#initDOM();
    this.#bindEventHandler();

    this.#searchVideoObserver = new IntersectionObserver(this.#observeEntries, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });
  }

  renderSearchVideoList({ videoList, prevVideoListLength }) {
    if (isFirstSearchByKeyword(prevVideoListLength)) {
      this.#videoComponents = [];
      this.$videoList.innerHTML = '';
    }

    this.$videoList.classList.remove('hide');

    this.#videoComponents = [
      ...this.#videoComponents,
      ...videoList.slice(prevVideoListLength).map(
        (video, idx, arr) =>
          new VideoComponent(this.$videoList, {
            video,
            observer: idx === arr.length - 1 ? this.#searchVideoObserver : null,
            notLazyLoad: prevVideoListLength === 0,
          })
      ),
    ];
  }

  renderSavedVideoList({ videoList: savedVideoList, prevVideoListLength }) {
    /** 이전에 렌더링 된 것들은 또 그리지 않기 위한 처리 prevVideoListLength */
    this.#videoComponents = [
      ...this.#videoComponents,
      ...savedVideoList.slice(prevVideoListLength).map(
        (savedVideo, idx) =>
          new VideoComponent(this.$videoList, {
            video: savedVideo,
            observer: null,
            notLazyLoad: idx < 10,
            type: this.#componentType,
          })
      ),
    ];
  }

  renderSkeletonVideoList(isWaitingResponse) {
    if (isWaitingResponse) {
      this.#skeletonListComponent = new SkeletonListComponent(this.$videoList);
      return;
    }
    this.#skeletonListComponent?.unmount();
  }

  unmount() {
    this.$videoList.innerHTML = '';
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$videoList = this.#parentElement.querySelector('.video-list');
  }

  #generateTemplate() {
    return `<ul class="video-list"></ul>`;
  }

  #bindEventHandler() {
    this.$videoList.addEventListener('click', this.#onClickVideoList);
    this.$videoList.addEventListener('scroll', this.#onScrollInVideoContainer);
  }

  #observeEntries(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        dispatch(CUSTOM_EVENT_KEY.LOAD_NEW_VIDEO_LIST);
      }
    });
  }

  #onScrollInVideoContainer = () => {
    if (this.#lazyLoadThrottleTimeout) {
      clearTimeout(this.#lazyLoadThrottleTimeout);
    }
    this.#lazyLoadThrottleTimeout = setTimeout(() => {
      this.#videoComponents.forEach((videoComponent) => {
        const { bottom } = this.$videoList.getBoundingClientRect();
        videoComponent.loadImg(bottom);
      });
    }, 100);
  };

  #onClickVideoList = (e) => {
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
  };
}
export default VideoListComponent;
