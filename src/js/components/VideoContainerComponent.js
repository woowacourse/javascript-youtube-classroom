import { STATE_STORE_KEY } from '../constants/stateStore';
import { subscribe } from '../modules/stateStore';
import Component from './Component';
import VideoComponent from './VideoComponent';

class VideoContainerComponent extends Component {
  $videoList = null;

  constructor({ parentElement, handlers }) {
    super(parentElement);
    this.mount(handlers);
    this.initDOM();
    this.bindEventHandler(handlers);
    subscribe(STATE_STORE_KEY.VIDEO_LIST, this);
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  initDOM() {
    this.$videoList = document.querySelector('.video-list');
    // 초기 상태를 그린다.
  }

  bindEventHandler({ onClickSaveButton }) {
    this.$videoList.addEventListener('click', (e) => {
      const {
        target: { className },
      } = e;

      if (className.includes('video-item__save-button')) {
        const {
          dataset: { videoId },
        } = e.target.closest('.video-item');

        onClickSaveButton(videoId);
      }
    });
  }

  wakeUp(stateKey, stateValue) {
    this.render(stateValue);
  }

  render(videoList) {
    videoList.forEach((video) => new VideoComponent(this.$videoList, { video }));
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
