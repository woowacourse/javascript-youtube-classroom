import { STATE_STORE_KEY } from '../constants/stateStore';
import { getState, subscribe } from '../modules/stateStore';
import { parseTimeStamp } from '../utils/util';
import { canLoadImage, hasNotSrcAttribute } from '../utils/validation';

class VideoComponent {
  #parentElement = null;

  #componentType = 'SEARCH';

  $videoItem = null;

  $saveButton = null;

  constructor(parentElement, { observer, type = 'SEARCH', ...restProps }) {
    this.#parentElement = parentElement;
    this.#componentType = type;
    this.props = restProps;
    this.#mount();
    this.#initDOM();
    this.#subscribeStore();

    observer?.observe(this.$videoItem);
  }

  wakeUp(stateKey) {
    const stateValue = getState(stateKey);
    this.#render(stateValue);
  }

  loadImg(showingCutline) {
    const { top } = this.$videoImg.getBoundingClientRect();

    if (canLoadImage(top, showingCutline) && hasNotSrcAttribute(this.$videoImg)) {
      const {
        dataset: { src },
      } = this.$videoImg;

      this.$videoImg.src = src;
    }
  }

  #mount() {
    if (this.#componentType === 'SEARCH') {
      this.#parentElement.insertAdjacentHTML('beforeend', this.#generateSearchVideoTemplate());
      return;
    }
    this.#parentElement.insertAdjacentHTML('beforeend', this.#generateSavedVideoTemplate());
  }

  #initDOM() {
    const { video } = this.props;
    const { videoId } = video.getVideoInfo();
    this.$videoItem = this.#parentElement.querySelector(`[data-video-id="${videoId}"]`);
    this.$saveButton = this.$videoItem.querySelector('.video-item__save-button.button');
    this.$videoImg = this.$videoItem.querySelector('img');
  }

  #subscribeStore() {
    const initialSavedVideo = subscribe(STATE_STORE_KEY.SAVED_VIDEO, this);
    this.#render(initialSavedVideo);
  }

  #render({ videoList: savedVideoList }) {
    if (this.#componentType === 'SEARCH') {
      this.#renderSearchVideo(savedVideoList);
      return;
    }

    this.#renderSavedVideo(savedVideoList);
  }

  #renderSearchVideo(savedVideoList) {
    const { video } = this.props;
    const { videoId } = video.getVideoInfo();

    if (
      savedVideoList.find((savedVideo) => {
        const { videoId: savedVideoId } = savedVideo.getVideoInfo();
        return savedVideoId === videoId;
      })
    ) {
      this.$saveButton.setAttribute('hidden', true);
    }
  }

  #renderSavedVideo() {}

  #generateSearchVideoTemplate() {
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

  #generateSavedVideoTemplate() {
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
    
    <div class="video-item__button_container">
      <button class="video-item__check-button button ${
        this.#componentType === 'WATCHED' ? 'checked' : ''
      }">✅</button>
      <button class="video-item__delete-button button">🗑</button>
    </div>
  </li>
      `;
  }
}

export default VideoComponent;
