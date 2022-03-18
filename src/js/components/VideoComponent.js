import { STATE_STORE_KEY } from '../constants/stateStore';
import { getState, subscribe } from '../modules/stateStore';
import { parseTimeStamp } from '../utils/util';

class Video {
  $videoItem = null;

  $saveButton = null;

  #parentElement = null;

  constructor(parentElement, { observer, ...restProps }) {
    this.#parentElement = parentElement;
    this.props = restProps;
    this.#mount();
    this.#initDOM();
    this.#subscribeStore();

    observer?.observe(this.$videoItem);
  }

  render() {
    const { video } = this.props;
    const { videoId } = video.getVideoInfo();

    if (this.#isSavedVideo(videoId)) {
      this.$saveButton.setAttribute('hidden', true);
    }
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    const { video } = this.props;

    const { videoId } = video.getVideoInfo();

    this.$videoItem = this.#parentElement.querySelector(`[data-video-id="${videoId}"]`);
    this.$saveButton = this.$videoItem.querySelector('.video-item__save-button.button');
  }

  #subscribeStore() {
    subscribe(STATE_STORE_KEY.SAVED_VIDEO, this);

    this.render();
  }

  #generateTemplate() {
    const { video } = this.props;

    const { videoId, videoTitle, channelTitle, publishTime, thumbnail } = video.getVideoInfo();

    return `
      <li class="video-item" data-video-id="${videoId}">
        <img
          src="${thumbnail}" class="video-item__thumbnail">
        <h4 class="video-item__title">${videoTitle}</h4>
        <p class="video-item__channel-name">${channelTitle}</p>
        <p class="video-item__published-date">${parseTimeStamp(publishTime)}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>
    `;
  }

  #isSavedVideo(currentVideoId) {
    const savedVideoList = getState(STATE_STORE_KEY.SAVED_VIDEO);

    const savedVideo = savedVideoList.find((video) => {
      const { videoId } = video.getVideoInfo();

      return videoId === currentVideoId;
    });

    return savedVideo !== undefined;
  }
}

export default Video;
