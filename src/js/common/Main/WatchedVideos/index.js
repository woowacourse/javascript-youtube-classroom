import { getStorage, STORAGE_KEY } from '../../../utils/localStorage';
import VideoCard from '../../VideoCard';

// const removeStoredVideoId = (clickedVideoId) => {
//   const storedVideoInfo = getStorage(STORAGE_KEY.VIDEO_IDS);
//   const filteredVideoIds = storedVideoInfo.filter((video) => video.videoId !== clickedVideoId);
//   setStorage(STORAGE_KEY.VIDEO_IDS, filteredVideoIds);
// };

export default class WatchedVideos {
  #state;

  constructor(element, props) {
    this.element = element;
    this.#state = props;
  }

  template() {
    const videos = getStorage(STORAGE_KEY.WATCHED_VIDEO_LIST);
    return videos.map((video) => new VideoCard(video).template('WATCHED_VIDEOS')).join('');
  }

  render() {
    this.element.innerHTML = this.template();
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.render();
  }
}
