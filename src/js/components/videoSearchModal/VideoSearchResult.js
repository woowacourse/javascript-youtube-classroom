import Component from '../../core/Component.js';
import { store } from '../../index.js';
import {
  $,
  $$,
  createElement,
  localStorageGetItem,
} from '../../utils/utils.js';
import {
  LOCALSTORAGE_KEYS,
  TYPES,
  SELECTORS,
  INTERSECTION_OBSERVER_OPTIONS,
  VALUES,
} from '../../constants/constants.js';
import { loadIframe } from '../../utils/youtubeClassRoomUtils.js';
export default class VideoSearchResult extends Component {
  setup() {
    store.subscribe(this.render.bind(this));

    this.iframeLoadObserver = new IntersectionObserver(
      loadIframe.bind(this),
      this.observerOption({
        root: this.$target,
        threshold: INTERSECTION_OBSERVER_OPTIONS.IFRAME_LOAD_THRESHOLD,
      })
    );

    this.requestVideoObserver = new IntersectionObserver(
      this.requestVideo.bind(this),
      this.observerOption({
        root: this.$target,
        threshold: INTERSECTION_OBSERVER_OPTIONS.REQUEST_VIDEO_THRESHOLD,
      })
    );
  }

  initRender() {
    this.$target.innerHTML = `
        <div class="d-flex justify-end text-gray-700">
          저장된 영상 갯수 : <span id="saved-video-count">${
            Object.keys(localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS)).length
          }</span>/${VALUES.MAXIMUM_VIDEO_SAVE_COUNT} 개
        </div>
        <section id="searched-video-list" class="video-wrapper">
        </section>
    `;
  }

  selectDOM() {
    this.$savedVideoCount = $(
      SELECTORS.SEARCH_MODAL.VIDEO_SEARCH_RESULT.SAVED_VIDEO_COUNT_ID
    );
    this.$searchedVideoWrapper = $(
      SELECTORS.SEARCH_MODAL.VIDEO_SEARCH_RESULT.VIDEO_LIST_ID
    );
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
      this.$searchedVideoWrapper.scrollTo({ top: 0 });
      this.$searchedVideoWrapper.innerHTML = '';
    }

    if (preStates.savedVideoCount !== states.savedVideoCount) {
      this.$savedVideoCount.textContent = states.savedVideoCount;
    }

    if (
      preStates.requestPending !== states.requestPending &&
      states.requestPending
    ) {
      this.$searchedVideoWrapper.appendChild(this.skeletonTemplate());
    }

    if (preStates.searchedVideos !== states.searchedVideos) {
      if (states.searchedVideos.length === 0) {
        this.displayNotFound();

        return;
      }

      this.displayVideos(states.searchedVideos);
      this.setLazyloading();
      this.removeSkeletons();
    }
  }

  displayNotFound() {
    this.$searchedVideoWrapper.innerHTML = `<img class="not-found-image w-100" src="./src/images/status/not_found.png" alt="not found"/>`;
  }

  displayVideos(searchedVideos) {
    const fragment = document.createDocumentFragment();

    searchedVideos.forEach((video) => {
      fragment.appendChild(video.createTemplate(TYPES.PAGE.SEARCH));
    });

    this.$searchedVideoWrapper.appendChild(fragment);
  }

  setLazyloading() {
    const clips = $$(
      SELECTORS.VIDEO_LIST.CLIP_CLASS,
      this.$searchedVideoWrapper
    );

    clips.forEach((clip) => this.iframeLoadObserver.observe(clip));
    this.requestVideoObserver.observe(clips[clips.length - 1]);
  }

  requestVideo(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.$props.requestVideos();
        observer.unobserve(entry.target);
      }
    });
  }

  observerOption({ root = document, rootMargin = '0%', threshold = 0 }) {
    return {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold,
    };
  }

  skeletonTemplate() {
    const fragment = document.createDocumentFragment();
    const skeleton = createElement({ tag: 'div', classes: ['skeleton'] });
    const img = createElement({ tag: 'div', classes: ['image'] });
    const line = createElement({ tag: 'p', classes: ['line'] });

    skeleton.appendChild(img.cloneNode(true));
    skeleton.appendChild(line.cloneNode(true));
    skeleton.appendChild(line.cloneNode(true));

    Array.from({ length: VALUES.MAXIMUM_SEARCH_VIDEO_COUNT }).forEach(() => {
      fragment.appendChild(skeleton.cloneNode(true));
    });

    return fragment;
  }

  removeSkeletons() {
    const $skeltons = $$(
      SELECTORS.SEARCH_MODAL.VIDEO_SEARCH_RESULT.SKELETON_CLASS,
      this.$searchedVideoWrapper
    );

    $skeltons.forEach((skeleton) => {
      skeleton.remove();
    });
  }
}
