import Component from '../../core/Component.js';
import { store } from '../../index.js';
import { $, $$, createElement, localStorageGetItem } from '../../utils/utils.js';
import { LOCALSTORAGE_KEYS } from "../../constants/constants.js"
export default class VideoSearchResult extends Component {
  setup() {
    store.subscribe(this.render.bind(this));
  }

  initRender() {
    this.$target.innerHTML = `
        <div class="d-flex justify-end text-gray-700">
          저장된 영상 갯수 : <span id="saved-video-count">${
            localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS).length
          }</span>/100 개
        </div>
        <section id="searched-video-wrapper" class="video-wrapper">
        </section>
    `;
  }

  selectDOM() {
    this.$searchedVideoWrapper = $('#searched-video-wrapper');
    this.$savedVideoCount = $('#saved-video-count');
  }

  // TODO: scroll 이벤트 감지하는 방법 바꾸기
  bindEvent() {
    this.$searchedVideoWrapper.addEventListener('scroll', (e) => {
      const $videoWrapper = e.target;
      if (
        $videoWrapper.scrollHeight - $videoWrapper.scrollTop ===
        $videoWrapper.clientHeight
      ) {
        this.$props.requestVideos();
      }
    });
  }

  skeletonTemplate() {
    const fragment = document.createDocumentFragment();
    const skeleton = createElement({ tag: 'div', classes: ['skeleton'] });
    const img = createElement({ tag: 'div', classes: ['image'] });
    const line = createElement({ tag: 'p', classes: ['line'] });

    skeleton.appendChild(img.cloneNode(true));
    skeleton.appendChild(line.cloneNode(true));
    skeleton.appendChild(line.cloneNode(true));

    Array.from({ length: 10 }).forEach(() => {
      fragment.appendChild(skeleton.cloneNode(true));
    });

    return fragment;
  }

  displayClips() {
    const $clips = $$('.clip', this.$searchedVideoWrapper);

    $clips.forEach((clip) => {
      if (!clip.classList.contains('d-none')) return;
      clip.classList.remove('d-none');
    });
  }

  removeSkeletons() {
    const $skeltons = $$('.skeleton', this.$searchedVideoWrapper);

    $skeltons.forEach((skeleton) => {
      skeleton.remove();
    });
  }

  async waitUntilAllVideoLoaded() {
    return await new Promise((resolve) => {
      const interval = setInterval(() => {
        const $iframes = $$('iframe', this.$searchedVideoWrapper);
        const isIframeAllLoaded = Array.from($iframes).every((preview) =>
          preview.classList.contains('loaded')
        );

        if (!isIframeAllLoaded) return;
        this.displayClips();
        this.removeSkeletons();
        clearInterval(interval);
        resolve();
      }, 1500);
    });
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
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
        this.$searchedVideoWrapper.innerHTML = `<img class="w-100" src="./src/images/status/not_found.png" alt="not found"/>`;

        return;
      }

      const fragment = document.createDocumentFragment();

      states.searchedVideos.forEach((video) => {
        fragment.appendChild(video.createTemplate());
      });

      this.$searchedVideoWrapper.appendChild(fragment);
      this.waitUntilAllVideoLoaded();
    }
  }
}
