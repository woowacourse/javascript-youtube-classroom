import { CUSTOM_EVENT_KEY } from '../constants/events';
import { dispatch } from '../modules/eventFactory';
import { isFirstSearchByKeyword } from '../utils/validation';
import SkeletonListComponent from './SkeletonListComponent';
import VideoComponent from './VideoComponent';

class VideoListComponent {
  #parentElement = null;

  #videoComponents = null;

  #lazyLoadThrottleTimeout = null;

  #searchVideoObserver = null;

  #skeletonListComponent = null;

  constructor(parentElement) {
    this.#parentElement = parentElement;
    this.#mount();
    this.#initDOM();
    this.#bindEventHandler();

    this.#searchVideoObserver = new IntersectionObserver(this.#observeEntries, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });
  }

  renderSearchVideoList(searchResult) {
    const { prevVideoListLength, videoList } = searchResult;

    if (isFirstSearchByKeyword(prevVideoListLength)) {
      this.#videoComponents = [];
      this.$videoList.innerHTML = '';
    }

    this.$videoList.classList.remove('hide');

    videoList.slice(prevVideoListLength).forEach((video, idx, arr) => {
      this.#videoComponents = [
        ...this.#videoComponents,
        new VideoComponent(this.$videoList, {
          video,
          observer: idx === arr.length - 1 ? this.#searchVideoObserver : null,
          notLazyLoad: prevVideoListLength === 0,
        }),
      ];
    });
  }

  renderSkeletonVideoList(isWaitingResponse) {
    if (isWaitingResponse) {
      this.#skeletonListComponent = new SkeletonListComponent(this.$videoList);
      return;
    }
    /** 하위컴포넌트의 메소드를 직접 수행하고 싶지 않습니다.. unmount 되도록 하는게 좋겟져 ?! */
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
}
export default VideoListComponent;
