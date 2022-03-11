import { RULES } from '../constants';
import { getStorageVideoIDs, LOCALSTORAGE_KEY, setStorageVideoIDs } from '../utils/localStorage';
import VideoCard from './VideoCard';

export default class VideoCardContainer {
  #state;

  constructor(parentElement, props) {
    this.parentElement = parentElement;
    this.#state = props;
    this.bindEvents();
  }

  bindEvents() {
    this.parentElement.addEventListener('click', this.storeIDHandler.bind(this));
  }

  storeIDHandler(e) {
    if (e.target.className.includes('video-item__save-button')) {
      const videoID = e.target.closest('li').dataset.videoId;

      const storedVideoIDs = getStorageVideoIDs(LOCALSTORAGE_KEY);

      if (storedVideoIDs.length >= RULES.MAX_STORED_IDS_AMOUNT) {
        return;
      }

      setStorageVideoIDs(LOCALSTORAGE_KEY, storedVideoIDs.concat(videoID));

      e.target.remove();
    }
  }

  template() {
    return this.#state.items?.map((item) => new VideoCard(item).template()).join('');
  }

  render() {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
