class YoutubeSaveStorage {
  #WATCHED_KEY = 'YOUTUBE_CLASSROOM_WATCHED';

  #WATCH_LATER_KEY = 'YOUTUBE_CLASSROOM_WATCH_LATER';

  #subscribers = [];

  #get(key) {
    const item = localStorage.getItem(key) ?? '[]';
    return JSON.parse(item);
  }

  #set(key, newItem) {
    localStorage.setItem(key, JSON.stringify(newItem));
    this.#subscribers.forEach(subscriber => subscriber());
  }

  addSubscriber(subscriber) {
    this.#subscribers.push(subscriber);
  }

  getWatchedList() {
    return this.#get(this.#WATCHED_KEY);
  }

  getWatchLaterList() {
    return this.#get(this.#WATCH_LATER_KEY);
  }

  addWatchLaterList(id, videoData) {
    this.#set(this.#WATCH_LATER_KEY, [...this.getWatchLaterList(), { id, videoData }]);
  }

  toggleWatchedList(id, videoData) {
    if (this.isInWatchedList(id)) {
      this.removeFromWatchedList();
      return;
    }
    if (this.isInWatchLaterList(id)) this.removeFromWatchLaterList(id);
    this.#set(this.#WATCHED_KEY, [...this.getWatchedList(), { id, videoData }]);
  }

  toggleWatchLaterList({ id, videoData }) {
    if (this.isInWatchLaterList(id)) {
      this.removeFromWatchLaterList(id);
      return;
    }
    if (this.isInWatchedList(id)) this.removeFromWatchedList(id);
    this.#set(this.#WATCHED_KEY, [...this.getWatchLaterList(), { id, videoData }]);
  }

  isInWatchedList(videoId) {
    return this.getWatchedList().some(({ id }) => id === videoId);
  }

  isInWatchLaterList(videoId) {
    return this.getWatchLaterList().some(({ id }) => id === videoId);
  }

  removeFromWatchedList(videoId) {
    this.#set(
      this.#WATCHED_KEY,
      this.getWatchedList().filter(({ id }) => videoId !== id),
    );
  }

  removeFromWatchLaterList(videoId) {
    this.#set(
      this.#WATCH_LATER_KEY,
      this.getWatchLaterList().filter(({ id }) => videoId !== id),
    );
  }
}

export default new YoutubeSaveStorage();
