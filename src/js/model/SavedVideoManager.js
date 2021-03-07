import { LOCAL_STORAGE_SAVED_VIDEO_KEY, SNACKBAR_MESSAGE, MAX_NUM_OF_SAVED_VIDEO } from '../constants/index.js';
import { getLocalStorageItem, setLocalStorageItem } from '../util/index.js';

export class SavedVideoManager {
  constructor(defaultValue = []) {
    this.subscribers = [];
    this.savedVideos = getLocalStorageItem({ key: LOCAL_STORAGE_SAVED_VIDEO_KEY, defaultValue });
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const subscriberIndex = this.subscribers.indexOf(subscriber);

    if (subscriberIndex === -1) {
      return;
    }

    this.subscribers.splice(subscriberIndex, 1);
  }

  saveVideo(videoData) {
    if (this.savedVideos.length >= MAX_NUM_OF_SAVED_VIDEO) {
      alert(SNACKBAR_MESSAGE.OVER_MAX_NUM_OF_SAVED_VIDEO);

      return;
    }
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
