import { subscribe } from '../modules/stateStore';
import Component from './Component';
import VideoComponent from './VideoComponent';

class VideoContainerComponent extends Component {
  $videoList = null;

  constructor({ parentElement, handlers }) {
    super(parentElement);
    this.mount(handlers);
    this.bindEventHandler(handlers);
    subscribe('videoList', this);
  }

  wakeUp(stateKey, stateValue) {
    this.render(stateValue);
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);

    this.$videoList = document.querySelector('.video-list');
    // 초기 상태를 그린다.
  }

  render(videoList) {
    videoList.forEach((video) => new VideoComponent(this.$videoList, { video }));
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
