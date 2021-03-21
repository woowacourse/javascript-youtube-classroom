export default class VideoSaveManager {
  static instance;

  constructor() {
    if (VideoSaveManager.instance) {
      return VideoSaveManager.instance;
    }

    this.subscribers = [];
    VideoSaveManager.instance = this;
  }

  subscribe(subscribe) {
    this.subscribers.push(subscribe);
  }

  notify(video) {
    this.subscribers.forEach((subscriber) => subscriber(video));
  }
}
