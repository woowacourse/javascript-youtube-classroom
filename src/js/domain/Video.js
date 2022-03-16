import { ERROR_MESSAGE } from '../constant';

export default class Video {
  #id;

  #thumbnails;

  #channelTitle;

  #title;

  #publishTime;

  #isSaved;

  constructor(builder) {
    this.#id = builder.id;
    this.#thumbnails = builder.thumbnails;
    this.#channelTitle = builder.channelTitle;
    this.#title = builder.title;
    this.#publishTime = builder.publishTime;
    this.#isSaved = builder.isSaved;
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

  static Builder() {
    let id;

    let thumbnails = 'NO_THUNBMNAILS';

    let channelTitle = 'NO_CHANNEL_TITLE';

    let title = 'NO_TITLE';

    let publishTime = '1000/01/01';

    let isSaved = false;

    return {
      setId: function (value) {
        id = value;
        return this;
      },

      setTitle: function (name) {
        title = name;
        return this;
      },

      setThumbnails: function (url) {
        thumbnails = url;
        return this;
      },

      setChannelTitle: function (name) {
        channelTitle = name;
        return this;
      },

      setPublishTime: function (time) {
        publishTime = time;
        return this;
      },

      setIsSaved: function (saved) {
        isSaved = saved;
        return this;
      },

      build: () => {
        if (!id) throw new Error(ERROR_MESSAGE.NO_ID);
        return new Video({
          id,
          thumbnails,
          title,
          channelTitle,
          publishTime,
          isSaved,
        });
      },
    };
  }
}
