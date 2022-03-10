export default class Video {
  #id;

  #thumbnails;

  #channelTitle;

  #title;

  #publishTime;

  #isSaved;

  constructor(id, thumbnails, channelTitle, title, publishTime, isSaved) {
    this.#id = id;
    this.#thumbnails = thumbnails;
    this.#channelTitle = channelTitle;
    this.#title = title;
    this.#publishTime = publishTime;
    this.#isSaved = isSaved;
  }

  get id() {
    return this.#id;
  }

  get thumbnails() {
    return this.#thumbnails;
  }

  get title() {
    return this.#title;
  }

  get channelTitle() {
    return this.#channelTitle;
  }

  get publishTime() {
    return this.#publishTime;
  }

  get isSaved() {
    return this.#isSaved;
  }
}
