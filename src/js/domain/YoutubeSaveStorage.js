import { YOUTUBE_SETTING, MESSAGE } from '@Constants';

class YoutubeSaveStorage {
  #KEY = 'YOUTUBE_CLASSROOM_LIBRARY';

  #subscribers = [];

  #get() {
    const item = localStorage.getItem(this.#KEY) ?? '[]';
    return JSON.parse(item);
  }

  #set(items) {
    localStorage.setItem(this.#KEY, JSON.stringify(items));
    this.#subscribers.forEach(subscriber => subscriber());
  }

  addSubscriber(subscriber) {
    this.#subscribers.push(subscriber);
  }

  getWatchedList() {
    return this.#get().filter(({ watched }) => watched);
  }

  getWatchLaterList() {
    return this.#get().filter(({ watched }) => !watched);
  }

  addVideo(id, videoData) {
    const list = this.#get();
    if (list.length >= YOUTUBE_SETTING.MAX_SAVE_NUMBER) {
      throw new Error(MESSAGE.MAX_SAVE_VIDEO);
    }
    this.#set([...this.#get(), { id, videoData, watched: false }]);
  }

  toggleVideoWatchStatus(videoId) {
    const updatedList = this.#get(this.#KEY).map(({ id, watched, videoData }) => {
      if (id === videoId) {
        return { id, watched: !watched, videoData };
      }
      return { id, watched, videoData };
    });
    this.#set(updatedList);
  }

  hasVideo(videoId) {
    return this.#get().some(({ id }) => id === videoId);
  }

  isWatchedVideo(videoId) {
    return this.#get()[videoId].watched;
  }

  removeVideo(videoId) {
    this.#set(this.#get().filter(({ id }) => videoId !== id));
  }
}

export default new YoutubeSaveStorage();
