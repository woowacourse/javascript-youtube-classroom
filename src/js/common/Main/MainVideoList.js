import { getStorage, setStorage, STORAGE_KEY } from '../../utils/localStorage';
import VideoCardTemplate from '../VideoCard/VideoCard';

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

const EMPTY_VIDEOS_TEMPLATE = `
  아직 저장된 영상이 없습니다.<br>
  영상을 검색 후 저장해 보세요!
`;

export default class MainVideoList {
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
      this.clickDeleteButtonHandler(e.target.closest('.video-item'));
    }
  };

  clickWatchedButtonHandler(videoElement) {
    const { videoId: clickedVideoId } = videoElement.dataset;
    const activeTabStorageKey = TAB_TO_STORAGE_KEY[this.#state.activeTab];

    const clickedVideoInfo = getStorage(activeTabStorageKey).find(
      (video) => video.videoId === clickedVideoId,
    );
    const destinationTabVideos = getStorage(DESTINATION_STORAGE[this.#state.activeTab]);
    setStorage(
      DESTINATION_STORAGE[this.#state.activeTab],
      destinationTabVideos.concat(clickedVideoInfo),
    );

    removeCurrentTabVideoId(TAB_TO_STORAGE_KEY[this.#state.activeTab], clickedVideoId);

    videoElement.remove();
  }

  clickDeleteButtonHandler(videoElement) {
    if (confirm('정말 삭제하시겠습니까?')) {
      const { videoId } = videoElement.dataset;
      removeCurrentTabVideoId(TAB_TO_STORAGE_KEY[this.#state.activeTab], videoId);
      videoElement.remove();
    }
  }

  template() {
    const videos = getStorage(TAB_TO_STORAGE_KEY[this.#state.activeTab]);

    if (!videos.length) {
      return EMPTY_VIDEOS_TEMPLATE;
    }

    return videos
      .map((video) => VideoCardTemplate(video, TAB_TO_STORAGE_KEY[this.#state.activeTab]))
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
