import VideoComponent from '.';
import { getState, subscribe } from '../../modules/stateStore';
import { STATE_STORE_KEY } from '../../constants/stateStore';
class SearchVideoComponent extends VideoComponent {
  $saveButton = null;

  constructor(parentElement, { observer, ...restProps }) {
    super(parentElement, restProps);
    this.#mount();
    this.#initDOM();
    this.#subscribeStore();
    observer?.observe(this.$videoItem);
  }

  wakeUp(stateKey) {
    const stateValue = getState(stateKey);
    this.#render(stateValue);
  }

  #mount() {
    this.$videoItem.insertAdjacentHTML('beforeend', this.#generateButtonTemplate());
  }

  #initDOM() {
    this.$saveButton = this.$videoItem.querySelector('.video-item__save-button.button');
  }

  #subscribeStore() {
    const initialSavedVideo = subscribe(STATE_STORE_KEY.SAVED_VIDEO, this);
    this.#render(initialSavedVideo);
  }

  #render({ videoList: savedVideoList }) {
    const { video } = this.props;
    const { videoId } = video.getVideoInfo();

    if (this.#isSavedVideo(savedVideoList, videoId)) {
      this.$saveButton.setAttribute('hidden', true);
    }
  }

  #generateButtonTemplate() {
    return `
    <button class="video-item__save-button button">⬇ 저장</button>
      `;
  }

  #isSavedVideo(savedVideoList, videoId) {
    return savedVideoList.find((savedVideo) => {
      const { videoId: savedVideoId } = savedVideo.getVideoInfo();
      return savedVideoId === videoId;
    });
  }
}
export default SearchVideoComponent;
