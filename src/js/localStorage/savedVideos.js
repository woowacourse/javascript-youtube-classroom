import { ALERT_MESSAGE, MAX_SAVE_COUNT } from '../constant';
import { rootStore } from '../store/rootStore';
import RootLocalStorage from './rootLocalStorage';

export default class SavedVideos extends RootLocalStorage {
  constructor(key) {
    super(key);
  }

  save(data) {
    if (this.cached.length >= MAX_SAVE_COUNT) {
      throw new Error(ALERT_MESSAGE.EXCEED_MAX_SAVE_VOLUME);
    }
    this.cache(data);
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  saveVideo(video) {
    this.save([...this.cached, { ...video, saved: true, watched: false }]);
  }

  getWatchedVideo() {
    return this.cached.filter(video => video.watched);
  }

  getWatchedVideoLength() {
    return this.getWatchedVideo().length;
  }

  getWatchingVideoLength() {
    return this.cached.length - this.getWatchedVideoLength();
  }

  changeWatchedInLocalStorage(videoId) {
    const payload = this.cached.map(video => {
      if (video.videoId === videoId) {
        video.watched = !video.watched;
      }
      return video;
    });
    this.save(payload);
  }

  deleteVideoInLocalStorage(videoId) {
    const payload = this.cached.filter(video => video.videoId !== videoId);
    this.save(payload);

    const videos = rootStore.state.videos;
    const newVideos = videos.map(video => {
      if (video.videoId === videoId) {
        video.saved = false;
      }
      return video;
    });
    rootStore.setState({ videos: newVideos });
  }

  hasWatchedVideo() {
    return this.getWatchedVideoLength() !== 0;
  }

  hasWatchingVideo() {
    return this.getWatchingVideoLength() !== 0;
  }
}

export const savedVideosStorage = new SavedVideos('savedVideos');
