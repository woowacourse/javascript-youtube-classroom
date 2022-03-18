import VideoComponent from '.';
import { parseTimeStamp } from '../../utils/util';
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
    this.parentElement.insertAdjacentHTML('beforeend', this.#generateTemplate());
  }

  #initDOM() {
    const { video } = this.props;
    const { videoId } = video.getVideoInfo();
    this.$videoItem = this.parentElement.querySelector(`[data-video-id="${videoId}"]`);
    this.$saveButton = this.$videoItem.querySelector('.video-item__save-button.button');
    this.$videoImg = this.$videoItem.querySelector('img');
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

  #generateTemplate() {
    const { video } = this.props;
    const { videoId, videoTitle, channelTitle, publishTime, thumbnail } = video.getVideoInfo();
    return `
    <li class="video-item" data-video-id="${videoId}">
    <img
      data-src="${thumbnail}" class="video-item__thumbnail" ${
      this.props.notLazyLoad ? `src="${thumbnail}"` : ''
    }>
    <h4 class="video-item__title">${videoTitle}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${parseTimeStamp(publishTime)}</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>
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
