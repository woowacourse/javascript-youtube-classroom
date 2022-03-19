import { getState } from '../modules/stateStore';
import { SAVED_VIDEO_FILTER_TYPE } from '../constants/video';
import { STATE_STORE_KEY } from '../constants/stateStore';
import { parseTimeStamp } from '../utils/util';

class SavedVideo {
  #parentElement;

  #props;

  constructor(parentElement, props) {
    this.#parentElement = parentElement;
    this.#props = props;

    this.#mount();
  }

  #mount() {
    const template = this.#generateTemplate();

    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #generateTemplate() {
    const { savedVideo } = this.#props;
    const { videoId, videoTitle, channelTitle, publishTime, thumbnail } = savedVideo.getVideoInfo();
    const savedVideoFilter = getState(STATE_STORE_KEY.SAVED_VIDEO_FILTER);

    return `
      <li class="video-item" data-video-id="${videoId}" loading="lazy">
        <img
          src="${thumbnail}" class="video-item__thumbnail">
        <h4 class="video-item__title">${videoTitle}</h4>
        <p class="video-item__channel-name">${channelTitle}</p>
        <p class="video-item__published-date">${parseTimeStamp(publishTime)}</p>
        <div class="video-item__button-wrapper">
          <button class="video-item__watched-button video-item__button-item button ${
            savedVideoFilter === SAVED_VIDEO_FILTER_TYPE.WATCHED ? 'watched' : ''
          }">✅</button>  
          <button class="video-item__delete-button video-item__button-item button">🗑</button>
        </div>
      </li>
    `;
  }
}

export default SavedVideo;
