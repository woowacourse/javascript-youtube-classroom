import { getStorage, setStorage, STORAGE_KEY } from '../../../utils/localStorage';
import VideoCard from '../../VideoCard';

const removeStoredVideoId = (clickedVideoId) => {
  const storedVideoInfo = getStorage(STORAGE_KEY.VIDEO_IDS);
  const filteredVideoIds = storedVideoInfo.filter((video) => video.videoId !== clickedVideoId);
  setStorage(STORAGE_KEY.VIDEO_IDS, filteredVideoIds);
};

export default class WatchLaterVideos {
  #state;

  constructor(element, props) {
    this.element = element;
    this.#state = props;
    this.element.addEventListener('click', this.clickButtonHandler);
  }

  template() {
    const videos = getStorage(STORAGE_KEY.VIDEO_IDS);
    return videos.map((video) => new VideoCard(video).template('WATCH_LATER_VIDEOS')).join('');
  }

  clickButtonHandler = (e) => {
    if (e.target.classList.contains('video-item__watch_button')) {
      this.checkWatchedVideoHandler(e.target.closest('.video-item'));
      return;
    }
    if (e.target.classList.contains('video-item__delete_button')) {
      const { videoId } = e.target.closest('.video-item').dataset;
      removeStoredVideoId(videoId);
      e.target.closest('.video-item').remove();
    }
  };

  checkWatchedVideoHandler(videoElement) {
    const { videoId } = videoElement.dataset;
    const clickedVideoInfo = getStorage(STORAGE_KEY.VIDEO_IDS).find(
      (video) => video.videoId === videoId,
    );
    const watchedVideoList = getStorage(STORAGE_KEY.WATCHED_VIDEO_LIST);
    setStorage(STORAGE_KEY.WATCHED_VIDEO_LIST, watchedVideoList.concat(clickedVideoInfo));
    removeStoredVideoId(videoId);
    videoElement.remove();
  }

  render() {
    this.element.innerHTML = this.template();
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
