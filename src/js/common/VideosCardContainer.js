import {
  getStorageVideoIDs,
  getStorageVideos,
  setStorageVideoIDs,
  checkVideoStorageFull,
  setStorageVideos,
  removeStorageVideoID,
  removeStorageVideo
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

        const newVideoIDs = [...getStorageVideoIDs(), videoId];
        const newStoredVideos = getStorageVideos({ filter: 'stored' });
        newStoredVideos[`${videoId}`] = videoItem;
        const newVideos = { ...getStorageVideos({}), stored: newStoredVideos };

        setStorageVideoIDs({ value: newVideoIDs });
        setStorageVideos({ value: newVideos });

        e.target.remove();
      }
    } catch (err) {
      console.log(err);
      toastPopup(err.message);
    }
  };

  watchedHandler = (e) => {
    if (e.target.className.includes('video-item__watched-button')) {
      const li = e.target.closest('li');
      const { videoId } = li.dataset;
      const { filter } = this.#state;

      const { stored, watched } = getStorageVideos({});

      if (filter === 'stored') {
        const videoItem = stored[`${videoId}`];
        delete stored[`${videoId}`];
        watched[`${videoId}`] = videoItem;
      }

      if (filter === 'watched') {
        const videoItem = watched[`${videoId}`];
        delete watched[`${videoId}`];
        stored[`${videoId}`] = videoItem;
      }

      const newVideos = { stored, watched };
      setStorageVideos({ value: newVideos });
      li.remove();
    }
  };

  removeHandler = (e) => {
    if (e.target.className.includes('video-item__remove-button')) {
      const li = e.target.closest('li');
      const { videoId } = li.dataset;
      const { filter } = this.#state;

      const videoIds = getStorageVideoIDs();
      const index = videoIds.indexOf(videoId);
      removeStorageVideoID(index);
      removeStorageVideo({ videoId, filter });

      li.remove();
    }
  };

  template() {
    const videoIds = getStorageVideoIDs();
    const { videoList, currentPage } = this.#state;
    const showHomePageButtons = currentPage === 'Home';

    return videoList
      .map((videoItem) => videoCardStyled({
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
}
