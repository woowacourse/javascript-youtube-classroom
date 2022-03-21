import { DELETE_CONFIRM_MESSAGE } from '../../constants';
import {
  getStorageVideos,
  checkVideoStorageFull,
  setStorageVideos,
  removeStorageVideo
} from '../../utils/localStorage';
import TEMPLATE from './template';
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
    this.parentElement.addEventListener('click', this.storeIDHandler);
    this.parentElement.addEventListener('click', this.removeHandler);
    this.parentElement.addEventListener('click', this.watchedHandler);
  }

  storeIDHandler = (e) => {
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

        const newStoredVideos = getStorageVideos({ filter: 'stored' });
        newStoredVideos[`${videoId}`] = videoItem;
        const newVideos = { ...getStorageVideos({}), stored: newStoredVideos };

        setStorageVideos({ value: newVideos });

        e.target.remove();
      }
    } catch (err) {
      toastPopup(err.message);
    }
  };

  newWebStorage({ videoId, filter }) {
    const webStorage = getStorageVideos({});
    const storage = Object.keys(webStorage);
    let videoItem;

    storage.some((key) => {
      const video = webStorage[`${key}`][`${videoId}`];
      if (video) {
        videoItem = video;
        delete webStorage[`${key}`][`${videoId}`];
      }

      return video;
    });

    if (filter === 'stored') { webStorage.watched[`${videoId}`] = videoItem; }
    if (filter === 'watched') { webStorage.stored[`${videoId}`] = videoItem; }

    return webStorage;
  }

  watchedHandler = (e) => {
    if (e.target.className.includes('video-item__watched-button')) {
      const li = e.target.closest('li');
      const { videoId } = li.dataset;
      const { filter } = this.#state;

      const newVideos = { ...this.newWebStorage({ videoId, filter }) };
      setStorageVideos({ value: newVideos });
      li.classList.toggle('hide');
    }
  };

  removeHandler = (e) => {
    if (e.target.className.includes('video-item__remove-button') && window.confirm(DELETE_CONFIRM_MESSAGE)) {
      const li = e.target.closest('li');
      const { videoId } = li.dataset;
      const { filter } = this.#state;

      removeStorageVideo({ videoId, filter });

      li.remove();
    }
  };

  template() {
    const { stored, watched } = getStorageVideos({});

    const videoIds = [...Object.keys(stored), ...Object.keys(watched)];
    const { videoList, currentPage } = this.#state;
    const showHomePageButtons = currentPage === 'Home';

    return videoList
      .map((videoItem) => TEMPLATE.VIDEO_CARD({
        videoItem,
        videoIds,
        showHomePageButtons
      }))
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

  setFilter(filter) {
    this.#state = { ...this.#state, filter };
  }
}
