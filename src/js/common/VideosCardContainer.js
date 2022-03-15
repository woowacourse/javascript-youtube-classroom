import { RULES } from '../constants';
import { getStorageVideoIDs, LOCALSTORAGE_KEY, setStorageVideoIDs } from '../utils/localStorage';
import VideoCard from './VideoCard';

export default class VideoCardContainer {
  #state;

  constructor(element, props) {
    this.element = element;
    this.#state = props;
    this.element.addEventListener('click', this.storeVideoIDHandler.bind(this));
  }

  storeVideoIDHandler(e) {
    if (e.target.className.includes('video-item__save-button')) {
      const videoID = e.target.closest('li').dataset.videoId;

      const storedVideoIDs = getStorageVideoIDs(LOCALSTORAGE_KEY);

      if (storedVideoIDs.length >= RULES.MAX_STORED_IDS_AMOUNT) {
        alert('저장할 수 있는 영상 한도를 초과했습니다.');
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
    this.element.insertAdjacentHTML('beforeend', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
