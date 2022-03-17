import { VIDEO_COMPONENT_TYPE } from '../constants/components';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { dispatch } from '../modules/eventFactory';
import { isFirstSearchByKeyword } from '../utils/validation';
import SkeletonListComponent from './SkeletonListComponent';
import VideoComponent from './VideoComponent';

class VideoListComponent {
  #parentElement = null;

  #componentType = VIDEO_COMPONENT_TYPE.SEARCH;

  #videoComponents = [];

  #lazyLoadThrottleTimeout = null;

  #searchVideoObserver = null;

  #skeletonListComponent = null;

  constructor(parentElement, type = VIDEO_COMPONENT_TYPE.SEARCH) {
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

  /** 하나의 함수로 동작하게는 할 수 없나..? */
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

  /** 깜빡거림이 신경쓰인다. */
  renderSavedVideoList({ videoList: savedVideoList }, watchedVideoIdList) {
    this.$videoList.innerHTML = '';

    const { watchVideoList, watchedVideoList } = savedVideoList.reduce(
      (prev, savedVideo) => {
        const { videoId } = savedVideo.getVideoInfo();
        const isWatched = watchedVideoIdList.includes(videoId);

        return {
          ...prev,
          watchVideoList: isWatched ? prev.watchVideoList : [...prev.watchVideoList, savedVideo],
          watchedVideoList: isWatched
            ? [...prev.watchedVideoList, savedVideo]
            : prev.watchedVideoList,
        };
      },
      {
        watchVideoList: [],
        watchedVideoList: [],
      }
    );
    this.#videoComponents = this.#generateVideoComponents(
      this.#componentType === VIDEO_COMPONENT_TYPE.WATCH ? watchVideoList : watchedVideoList
    );
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

  #generateVideoComponents(savedVideoList) {
    return savedVideoList.map(
      (savedVideo, idx) =>
        new VideoComponent(this.$videoList, {
          video: savedVideo,
          observer: null,
          notLazyLoad: idx < 10,
          type: this.#componentType,
        })
    );
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
    const { dataset } = e.target.closest('.video-item');

    if (className.includes('video-item__save-button')) {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SAVE_BUTTON, {
        detail: {
          saveVideoId: dataset.videoId,
        },
      });
    }
    if (className.includes('video-item__delete-button')) {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_DELETE_BUTTON, {
        detail: {
          savedVideoId: dataset.videoId,
        },
      });
    }
    if (className.includes('video-item__check-button')) {
      dispatch(CUSTOM_EVENT_KEY.CLICK_SAVED_CHECK_BUTTON, {
        detail: {
          savedVideoId: dataset.videoId,
          element: e.target,
        },
      });
    }
  };
}
export default VideoListComponent;
