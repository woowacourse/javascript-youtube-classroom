import { CUSTOM_EVENT_KEY } from '../constants/events';
import { NOTIFY_KEY, STATE_STORE_KEY } from '../constants/stateStore';
import { dispatch } from '../modules/eventFactory';
import { subscribe } from '../modules/stateStore';
import Component from './Component';
import VideoComponent from './VideoComponent';

class VideoContainerComponent extends Component {
  $videoList = null;

  constructor(parentElement) {
    super(parentElement);
    this.mount();
    this.initDOM();
    this.bindEventHandler();
    subscribe(STATE_STORE_KEY.VIDEO_LIST, this);
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  initDOM() {
    this.$videoList = document.querySelector('.video-list');
  }

  bindEventHandler() {
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
  }

  wakeUp(stateValue, notifyKey) {
    this.render(stateValue, notifyKey);
  }

  render(videoList, notifyKey) {
    if (notifyKey === NOTIFY_KEY.REPLACE_STATE) {
      this.$videoList.innerHTML = '';
    }
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
