import { store } from '../../index.js';
import { addVideos } from '../../redux/action.js';

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
  }

  render(preStates, states) {
    if (preStates.searchHistory !== states.searchHistory) {
      this.$searchedVideoWrapper.innerHTML = '';
    }

    if (preStates.searchedVideos !== states.searchedVideos) {
      const template = states.searchedVideos
        .map((video) => {
          return `${video}`;
        })
        .join('');
      this.$searchedVideoWrapper.innerHTML += template;
    }
  }

  initRender() {
    this.$target.innerHTML = `
        <div class="d-flex justify-end text-gray-700">
          저장된 영상 갯수: <span id="saved-video-count">50</span>개
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
        this.$props.youtubeAPIManager.requestVideos().then((items) => {
          store.dispatch(addVideos(items));
        });
      }
    });
  }
}
