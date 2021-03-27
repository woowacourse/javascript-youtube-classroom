export default class VideoList {
  #videos = [];
  #videoKeys = ['videoId', 'title', 'channelTitle', 'publishedAt', 'thumbnail'];

  getVideos() {
    return this.#videos;
  }

  setVideos(videos) {
    if (!this.isVideoList(videos)) {
      return;
    }
    this.#videos = videos;
  }

  isVideoList(items) {
    return items.every(item => this.isRightVideoFormat(item));
  }

  isRightVideoFormat(item) {
    return Object.keys(item).every(key => this.#videoKeys.includes(key));
  }
}
