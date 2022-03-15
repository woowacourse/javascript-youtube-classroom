import Video from './Video.js';

export default class VideoBulider {
  #id;

  #thumbnails;

  #channelTitle;

  #title;

  #publishTime;

  #isSaved;

  setId(id) {
    this.#id = id;
    return this;
  }

  setTitle(title) {
    this.#title = title;
    return this;
  }

  setThumbnails(url) {
    this.#thumbnails = url;
    return this;
  }

  setChannelTitle(name) {
    this.#channelTitle = name;
    return this;
  }

  setPublishTime(time) {
    this.#publishTime = time;
    return this;
  }

  setIsSaved(isSaved) {
    this.#isSaved = isSaved;
    return this;
  }

  build() {
    return new Video(
      this.#id,
      this.#thumbnails,
      this.#channelTitle,
      this.#title,
      this.#publishTime,
      this.#isSaved,
    );
  }
}
