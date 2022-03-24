import { RULES } from '../../constants';
import { getStorage, STORAGE_KEY, setStorage } from '../../utils/localStorage';
import VideoCardTemplate from '../VideoCard/VideoCard';

export default class SearchModalVideoList {
  #state;

  constructor(element) {
    this.element = element;
    this.#state = { allVideos: [] };
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
      const { videoId: clickedVideoId } = clickedVideo.dataset;
      const videoInfo = this.#state.allVideos.find((video) => video.videoId === clickedVideoId);

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

        return VideoCardTemplate(
          video,
          isStoredVideo || isWatchedVideo ? 'STORED_SEARCHED_VIDEOS' : 'SEARCHED_VIDEOS',
        );
      })
      .join('');
  }

  render() {
    this.element.insertAdjacentHTML('beforeend', this.template());
  }

  setVideos(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#state.allVideos = this.#state.allVideos.concat(newState.videos);
    this.render();
  }
}
