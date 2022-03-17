import {
  getStorageVideoIDs,
  setStorageVideoIDs,
  checkVideoStorageFull,
  setStorageVideos
} from '../utils/localStorage';
import { videoCardStyled } from './template';
import toast from './toast';

const toastPopup = toast();

export default class VideoCardContainer {
  #state;

  constructor(parentElement, props) {
    this.parentElement = parentElement;
    this.#state = {
      videoList: [],
      ...props
    };
    this.bindEvents();
  }

  bindEvents() {
    this.parentElement.addEventListener(
      'click',
      this.storeIDHandler.bind(this)
    );
  }

  storeIDHandler(e) {
    try {
      if (e.target.className.includes('video-item__save-button')) {
        const li = e.target.closest('li');
        const { videoId } = li.dataset;

        const videoItem = {
          videoId,
          thumbnailURL: li.querySelector('img').dataset.videoThumbnail,
          title: li.querySelector('h4').dataset.videoTitle,
          channelTitle: li.querySelector('.video-item__channel-name').dataset.videoChannelName,
          publishedDate: li.querySelector('.video-item__published-date').dataset.videoPublishedDate
        };

        checkVideoStorageFull();

        setStorageVideoIDs({ value: videoId });
        setStorageVideos({ value: videoItem });

        e.target.remove();
      }
    } catch (err) {
      toastPopup(err.message);
    }
  }

  template() {
    const videoIds = getStorageVideoIDs();
    const { videoList } = this.#state;

    return videoList
      .map((videoItem) => videoCardStyled({ videoItem, videoIds }))
      .join('');
  }

  render() {
    if (this.#state.skeletonElement) {
      this.#state.skeletonElement.insertAdjacentHTML('beforebegin', this.template());
      return;
    }
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
