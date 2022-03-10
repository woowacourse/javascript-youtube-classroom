import { LOCALSTORAGE_KEY, getStorageVideoIDs, setStorageVideoIDs } from '../utils/localStorage';
import { RULES } from '../constants';
import VideoCard from './VideoCard';

export default class VideoCardContainer {
  #state;

  constructor(parentElement, props) {
    this.parentElement = parentElement;
    this.#state = props;
    this.bindEvents();
  }

  bindEvents() {
    this.parentElement.addEventListener(
      'click',
      this.storeIDHandler.bind(this)
    );
  }

  storeIDHandler(e) {
    if (e.target.className.includes('video-item__save-button')) {
      const videoID = e.target.closest('li').dataset.videoId;

      const videoIDs = getStorageVideoIDs(LOCALSTORAGE_KEY);

      if (videoIDs.length >= RULES.MAX_STORED_IDS_AMOUNT) {
        return;
      }

      setStorageVideoIDs({
        key: LOCALSTORAGE_KEY,
        value: videoIDs.concat(videoID),
      });

      e.target.remove();
    }
  }

  template() {
    const videoIds = getStorageVideoIDs(LOCALSTORAGE_KEY);

    return this.#state.items
      ?.map((item) => new VideoCard(this.parentElement, { item, videoIds }).template())
      .join('');
  }

  render() {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
