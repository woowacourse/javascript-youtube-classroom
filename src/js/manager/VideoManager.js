export default class VideoManager {
  static instance;

  constructor() {
    if (VideoManager.instance) {
      return VideoManager.instance;
    }

    this.subscribers = {};
    VideoManager.instance = this;
  }

  subscribe({ key, subscribe }) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }

    this.subscribers[key].push(subscribe);
  }

  notify({ key, data }) {
    this.subscribers[key]?.forEach((subscriber) => subscriber(data));
  }
}
