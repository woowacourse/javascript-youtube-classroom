import Component from '../../core/Component.js';
import { store } from '../../index.js';
import {
  $,
  $$,
  createElement,
  localStorageGetItem,
} from '../../utils/utils.js';
import { LOCALSTORAGE_KEYS } from '../../constants/constants.js';
export default class VideoSearchResult extends Component {
  setup() {
    store.subscribe(this.render.bind(this));
  }

  initRender() {
    this.$target.innerHTML = `
        <div class="d-flex justify-end text-gray-700">
          저장된 영상 갯수 : <span id="saved-video-count">${
            Object.keys(localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS)).length
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

  removeSkeletons() {
    const $skeltons = $$('.skeleton', this.$searchedVideoWrapper);

    $skeltons.forEach((skeleton) => {
      skeleton.remove();
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
        fragment.appendChild(video.createTemplate('search'));
      });

      this.$searchedVideoWrapper.appendChild(fragment);
      this.lazyLoad($$('.clip', this.$target));
      this.removeSkeletons();
    }
  }

  lazyLoad(targets) {
    const callback = (entries, observer) => {
      if (entries.length === 0) {
        observer.disconnect();
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = $('iframe', entry.target);
          const src = video.getAttribute('data-src');
          const srcdoc = video.getAttribute('data-srcdoc');

          video.setAttribute('src', src);
          video.setAttribute('srcdoc', srcdoc);

          observer.unobserve(entry.target);
        }
      });
    };

    const callback2 = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.$props.requestVideos();
          observer.unobserve(entry.target);
        }
      });
    };

    const options = {
      root: this.$target,
      threshold: 0.5,
    };

    const options2 = {
      root: this.$target,
      threshold: 1,
    };

    const io = new IntersectionObserver(callback, options);
    const io2 = new IntersectionObserver(callback2, options2);

    targets.forEach((target) => io.observe(target));
    io2.observe(targets[targets.length - 1]);
  }
}
