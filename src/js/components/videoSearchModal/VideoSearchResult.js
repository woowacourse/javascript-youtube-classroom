import { store } from '../../index.js';
import { addVideos, updateRequestPending } from '../../redux/action.js';
import { localStorageManager } from '../App.js';

export default class VideoSearchResult {
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.initRender();
    this.selectDOM();
    this.bindEvent();
    this.setup();
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  selectDOM() {
    this.$searchedVideoWrapper = document.querySelector(
      '#searched-video-wrapper'
    );
    this.$savedVideoCount = document.querySelector('#saved-video-count');
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
    console.log(fragment);
    return fragment;
  }

  displayClips() {
    const $clips = this.$searchedVideoWrapper.querySelectorAll('.clip');
    $clips.forEach((clip) => {
      if (!clip.classList.contains('d-none')) return;
      clip.classList.remove('d-none');
    });
  }

  removeSkeletons() {
    const $skeltons = this.$searchedVideoWrapper.querySelectorAll('.skeleton');
    $skeltons.forEach((skeleton) => {
      skeleton.remove();
    });
  }

  async waitUntilAllVideoLoaded() {
    return await new Promise((resolve) => {
      const interval = setInterval(() => {
        const $iframes = this.$searchedVideoWrapper.querySelectorAll('iframe');
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
      this.$searchedVideoWrapper.innerHTML = ``;
    }

    if (preStates.savedVideoCount !== states.savedVideoCount) {
      console.log(states.savedVideoCount);
      this.$savedVideoCount.textContent = states.savedVideoCount;
    }

    if (
      preStates.requestPending !== states.requestPending &&
      states.requestPending
    ) {
      this.$searchedVideoWrapper.appendChild(this.skeletonTemplate());
      // this.$searchedVideoWrapper.innerHTML += `${this.skeletonTemplate()}`;
    }

    // TODO : iframe reload 문제 해결
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

  bindEvent() {
    this.$searchedVideoWrapper.addEventListener('scroll', (e) => {
      const $videoWrapper = e.target;
      if (
        $videoWrapper.scrollHeight - $videoWrapper.scrollTop ===
        $videoWrapper.clientHeight
      ) {
        store.dispatch(updateRequestPending(true));
        this.$props.youtubeAPIManager.requestVideos().then((items) => {
          store.dispatch(updateRequestPending(false));
          store.dispatch(addVideos(items));
        });
      }
    });
  }
}
