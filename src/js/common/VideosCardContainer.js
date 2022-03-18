import { RULES } from '../constants';
import { snakeCaseToCamelCase } from '../utils';
import { getStorage, LOCALSTORAGE_KEY, setStorage } from '../utils/localStorage';
import VideoCard from './VideoCard';

const makeVideoInfo = (object, element) => {
  object[snakeCaseToCamelCase(element.className.replace('video-item__', ''))] =
    element.src ?? element.innerHTML;
  return object;
};

export default class VideoCardContainer {
  #state;

  constructor(element, props) {
    this.element = element;
    this.#state = props;
    this.element.addEventListener('click', this.storeVideoIDHandler.bind(this));
  }

  storeVideoIDHandler(e) {
    if (e.target.className.includes('video-item__save-button')) {
      const storedVideoIDs = getStorage(LOCALSTORAGE_KEY.VIDEO_IDS);

      if (storedVideoIDs.length >= RULES.MAX_STORED_IDS_AMOUNT) {
        alert('저장할 수 있는 영상 한도를 초과했습니다.');
        return;
      }

      const clickedVideo = e.target.closest('.video-item');
      const { videoId } = clickedVideo.dataset;
      const videoInfo = Array.from(clickedVideo.children)
        .filter((element) => element.tagName !== 'BUTTON')
        .reduce((acc, element) => makeVideoInfo(acc, element), { videoId });

      setStorage(LOCALSTORAGE_KEY.VIDEO_IDS, storedVideoIDs.concat(videoInfo));

      e.target.remove();
    }
  }

  template() {
    return this.#state.videos.map((video) => new VideoCard(video).template()).join('');
  }

  render() {
    this.element.insertAdjacentHTML('beforeend', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
