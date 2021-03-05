import { store } from '../../index.js';
import { addVideos, updateRequestPending } from '../../redux/action.js';
import { localStorageManager, youtubeAPIManager } from '../App.js';
import { ERROR_MESSAGE } from '../../constants/constants.js';
import { $, $$ } from '../../utils/utils.js';
export default class VideoSearchResult {
  constructor($target) {
    this.$target = $target;
    this.initRender();
    this.selectDOM();
    this.bindEvent();
    this.setup();
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  selectDOM() {
    this.$searchedVideoWrapper = $('#searched-video-wrapper');
    this.$savedVideoCount = $('#saved-video-count');
  }

  skeletonTemplate() {
    const fragment = document.createDocumentFragment();
    const skeleton = document.createElement('div');
    const img = document.createElement('div');
    const line = document.createElement('p');

    skeleton.classList.add('skeleton');
    img.classList.add('image');
    line.classList.add('line');
    skeleton.appendChild(img.cloneNode(true));
    skeleton.appendChild(line.cloneNode(true));
    skeleton.appendChild(line.cloneNode(true));

    for (let i = 0; i < 10; i++) {
      fragment.appendChild(skeleton.cloneNode(true));
    }

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
        const condition = Array.from($iframes).every((preview) =>
          preview.classList.contains('loaded')
        );

        if (!condition) return;
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

  initRender() {
    this.$target.innerHTML = `
        <div class="d-flex justify-end text-gray-700">
          저장된 영상 갯수: <span id="saved-video-count">${
            localStorageManager.getItem('videos').length
          }</span>개
        </div>
        <section id="searched-video-wrapper" class="video-wrapper">
        </section>
    `;
  }

  // TODO: scroll 이벤트 감지하는 방법 바꾸기
  bindEvent() {
    this.$searchedVideoWrapper.addEventListener('scroll', (e) => {
      const $videoWrapper = e.target;
      if (
        $videoWrapper.scrollHeight - $videoWrapper.scrollTop ===
        $videoWrapper.clientHeight
      ) {
        store.dispatch(updateRequestPending(true));
        youtubeAPIManager
          .requestVideos()
          .then((items) => {
            store.dispatch(updateRequestPending(false));
            store.dispatch(addVideos(items));
          })
          .catch((error) =>
            alert(ERROR_MESSAGE.EXCEED_API_REQUEST_COUNT(error))
          );
      }
    });
  }
}
