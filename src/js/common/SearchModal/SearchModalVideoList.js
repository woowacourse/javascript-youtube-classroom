import { RULES } from '../../constants';
import { snakeCaseToCamelCase } from '../../utils';
import { getStorage, STORAGE_KEY, setStorage } from '../../utils/localStorage';
import VideoCard from '../VideoCard/VideoCard';

const extractInnerHTML = (object, element) => {
  object[snakeCaseToCamelCase(element.className.replace('video-item__', ''))] =
    element.src ?? element.innerHTML;

  return object;
};

export default class SearchModalVideoList {
  #state;

  constructor(element, props) {
    this.element = element;
    this.#state = props;
    this.element.addEventListener('click', this.storeVideoIdHandler);
  }

  storeVideoIdHandler = (e) => {
    if (e.target.className.includes('video-item__save-button')) {
      const storedVideoIDs = getStorage(STORAGE_KEY.WATCH_LATER_VIDEOS);

      if (storedVideoIDs.length >= RULES.MAX_STORED_IDS_AMOUNT) {
        alert('저장할 수 있는 영상 한도를 초과했습니다.');
        return;
      }

      const clickedVideo = e.target.closest('.video-item');
      const { videoId } = clickedVideo.dataset;
      const videoInfo = Array.from(clickedVideo.children)
        .filter((element) => element.tagName !== 'BUTTON')
        .reduce((info, element) => extractInnerHTML(info, element), { videoId });

      setStorage(STORAGE_KEY.WATCH_LATER_VIDEOS, storedVideoIDs.concat(videoInfo));

      e.target.remove();
    }
  };

  template() {
    const storedVideoIds = getStorage(STORAGE_KEY.WATCH_LATER_VIDEOS).map((video) => video.videoId);
    const watchedVideoIds = getStorage(STORAGE_KEY.WATCHED_VIDEOS).map((video) => video.videoId);

    return this.#state.videos
      .map((video) => {
        const isStoredVideo = storedVideoIds.includes(video.videoId);
        const isWatchedVideo = watchedVideoIds.includes(video.videoId);

        return new VideoCard(video).template(
          isStoredVideo || isWatchedVideo ? 'STORED_SEARCHED_VIDEOS' : 'SEARCHED_VIDEOS',
        );
      })
      .join('');
  }

  render() {
    this.element.insertAdjacentHTML('beforeend', this.template());
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
