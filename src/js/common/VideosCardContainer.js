import { LOCALSTORAGE_KEY, getStorageVideoIDs, setStorageVideoIDs, checkVideoStorageFull } from '../utils/localStorage';
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
        const videoID = e.target.closest('li').dataset.videoId;
        const videoIDs = getStorageVideoIDs(LOCALSTORAGE_KEY);

        checkVideoStorageFull(LOCALSTORAGE_KEY);

        setStorageVideoIDs({
          key: LOCALSTORAGE_KEY,
          value: videoIDs.concat(videoID),
        });

        e.target.remove();
      }
    } catch (err) {
      toastPopup(err.message);
    }
  }

  template() {
    const videoIds = getStorageVideoIDs(LOCALSTORAGE_KEY);

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
