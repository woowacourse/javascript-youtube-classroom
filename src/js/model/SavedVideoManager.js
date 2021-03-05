import { LOCAL_STORAGE_SAVED_VIDEO_KEY } from '../constants/index.js';
import { getLocalStorageItem, setLocalStorageItem } from '../util/index.js';

export class SavedVideoManager {
  constructor() {
    this.subscribers = [];
    this.savedVideos = getLocalStorageItem({ key: LOCAL_STORAGE_SAVED_VIDEO_KEY, defaultValue: [] });
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const subscriberIndex = this.subscribers.indexOf(subscriber);
    this.subscribers.splice(subscriberIndex, 1);
  }

  saveVideo(videoData) {
    this.setState({ savedVideos: [...this.savedVideos, videoData] });
  }

  getSavedVideos() {
    return [...this.savedVideos];
  }

  getSavedVideoIdList() {
    return this.savedVideos.map(video => video.id);
  }

  setState({ savedVideos }) {
    this.savedVideos = savedVideos;
    setLocalStorageItem({ key: LOCAL_STORAGE_SAVED_VIDEO_KEY, item: this.savedVideos });

    this.notify();
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber());
  }
}
