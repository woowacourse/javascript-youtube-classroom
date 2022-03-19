import { getStorage, setStorage, STORAGE_KEY } from '../../utils/localStorage';
import VideoCard from '../VideoCard';

const TAB_TO_STORAGE_KEY = {
  'watch-later-videos': STORAGE_KEY.WATCH_LATER_VIDEOS,
  'watched-videos': STORAGE_KEY.WATCHED_VIDEOS,
};

const DESTINATION_STORAGE = {
  'watch-later-videos': STORAGE_KEY.WATCHED_VIDEOS,
  'watched-videos': STORAGE_KEY.WATCH_LATER_VIDEOS,
};

const removeCurrentTabVideoId = (storageKey, videoId) => {
  const videosInfo = getStorage(storageKey);
  const filteredVideos = videosInfo.filter((video) => video.videoId !== videoId);
  setStorage(storageKey, filteredVideos);
};

export default class MainVideoCardContainer {
  #state;

  constructor(element) {
    this.element = element;
    this.element.addEventListener('click', this.clickButtonHandler);
  }

  clickButtonHandler = (e) => {
    if (e.target.classList.contains('video-item__watch_button')) {
      this.clickWatchedButtonHandler(e.target.closest('.video-item'));
      return;
    }
    if (e.target.classList.contains('video-item__delete_button')) {
      const { videoId } = e.target.closest('.video-item').dataset;
      removeCurrentTabVideoId(TAB_TO_STORAGE_KEY[this.#state.focusedTab], videoId);
      e.target.closest('.video-item').remove();
    }
  };

  clickWatchedButtonHandler(videoElement) {
    const { videoId } = videoElement.dataset;
    const currentTabStorageKey = TAB_TO_STORAGE_KEY[this.#state.focusedTab];

    const clickedVideoInfo = getStorage(currentTabStorageKey).find(
      (video) => video.videoId === videoId,
    );
    const destinationTabVideos = getStorage(DESTINATION_STORAGE[this.#state.focusedTab]);
    setStorage(
      DESTINATION_STORAGE[this.#state.focusedTab],
      destinationTabVideos.concat(clickedVideoInfo),
    );

    removeCurrentTabVideoId(TAB_TO_STORAGE_KEY[this.#state.focusedTab], videoId);

    videoElement.remove();
  }

  template() {
    const videos = getStorage(TAB_TO_STORAGE_KEY[this.#state.focusedTab]);
    return videos
      .map((video) => new VideoCard(video).template(TAB_TO_STORAGE_KEY[this.#state.focusedTab]))
      .join('');
  }

  render() {
    this.element.innerHTML = this.template();
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
