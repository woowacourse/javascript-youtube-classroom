import {
  getStorageVideoIDs,
  setStorageVideoIDs,
  checkVideoStorageFull,
  setStorageVideos
} from '../utils/localStorage';
import VideoCard from './VideoCard';
import toast from './toast';

const toastPopup = toast();

export default class VideoCardContainer {
  #state;

  constructor(parentElement, props) {
    this.parentElement = parentElement;
    this.#state = {
      items: [],
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
        const videoID = li.dataset.videoId;

        const videoItem = {
          id: videoID,
          thumbnail: li.querySelector('img').dataset.videoThumbnail,
          title: li.querySelector('h4').dataset.videoTitle,
          channelName: li.querySelector('.video-item__channel-name').dataset.videoChannelName,
          publishedDate: li.querySelector('.video-item__published-date').dataset.videoPublishedDate
        };

        checkVideoStorageFull();

        setStorageVideoIDs({ value: videoID });
        setStorageVideos({ value: videoItem });

        e.target.remove();
      }
    } catch (err) {
      toastPopup(err.message);
    }
  }

  template() {
    const videoIds = getStorageVideoIDs();

    return this.#state.items
      ?.map((item) => new VideoCard(this.parentElement, { item, videoIds }).template())
      .join('');
  }

  render() {
    this.#state.skeletonElement.insertAdjacentHTML('beforebegin', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
