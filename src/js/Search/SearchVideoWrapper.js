/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { CLASSNAME, NUMBER, SNACKBAR_TEXT } from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { $, fetchYoutubeData, showModalSnackbar } from "../utils/index.js";
import { Video } from "../Video/index.js";

export default class SearchVideoWrapper {
  #currentQuery = "";

  #currentNextPageToken = "";

  #throttle = null;

  #videoItemsMap = new Map();

  #videosMap = new Map();

  #$searchVideoWrapper = $(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`);

  constructor() {
    this.#addMessageListeners();
    this.#addEventListeners();
  }

  #addMessageListeners() {
    messenger.addMessageListener(MESSAGE.KEYWORD_SUBMITTED, ({ query }) => {
      this.#currentQuery = query;

      $.clear(this.#$searchVideoWrapper);
      this.#mountTemplate();
      this.#$searchVideoWrapper.scrollTo({ top: 0 });
    });

    messenger.addMessageListener(
      MESSAGE.DATA_LOADED,
      ({ nextPageToken, items }) => {
        this.#currentNextPageToken = nextPageToken;

        this.#attachData(items);
      }
    );

    messenger.addMessageListener(MESSAGE.SAVED_VIDEO_DELETED, ({ videoId }) => {
      const video = this.#videosMap.get(videoId);
      video.removeSavedClass();
    });
  }

  #addEventListeners() {
    this.#$searchVideoWrapper.addEventListener(
      "scroll",
      this.#handlePageScroll.bind(this)
    );

    this.#$searchVideoWrapper.addEventListener("click", (event) => {
      if (!event.target.classList.contains(CLASSNAME.BUTTON)) {
        return;
      }

      const $button = event.target;
      const { videoId } = $button.dataset;

      if ($.containsClass($button, CLASSNAME.SAVE_VIDEO_BUTTON)) {
        this.#handleSaveVideoButtonClick(videoId);
        return;
      }

      if ($.containsClass($button, CLASSNAME.CANCEL_VIDEO_BUTTON)) {
        this.#handleCancelVideoButtonClick(videoId);
      }
    });
  }

  #handleSaveVideoButtonClick(videoId) {
    const item = this.#videoItemsMap.get(videoId);
    const video = this.#videosMap.get(videoId);

    messenger.deliverMessage(MESSAGE.SAVE_VIDEO_BUTTON_CLICKED, {
      resolve: () => {
        video.addSavedClass();
        showModalSnackbar(SNACKBAR_TEXT.VIDEO_SAVED);
      },

      reject: showModalSnackbar.bind(null, SNACKBAR_TEXT.REACHED_MAX_COUNT),
      videoId,
      item,
    });
  }

  #handleCancelVideoButtonClick(videoId) {
    const item = this.#videoItemsMap.get(videoId);
    const video = this.#videosMap.get(videoId);

    messenger.deliverMessage(MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED, {
      videoId,
      item,
    });
    video.removeSavedMode();
    showModalSnackbar(SNACKBAR_TEXT.CANCELED_VIDEO_SAVE);
  }

  #handlePageScroll() {
    if (this.#throttle) return;

    const { scrollTop, clientHeight, scrollHeight } = this.#$searchVideoWrapper;

    if (
      scrollTop + clientHeight <=
      scrollHeight * NUMBER.SCROLL_EVENT_THRESHOLD
    ) {
      return;
    }

    this.#throttle = setTimeout(async () => {
      this.#mountTemplate();
      const { nextPageToken, items } = await fetchYoutubeData(
        this.#currentQuery,
        this.#currentNextPageToken
      );
      this.#currentNextPageToken = nextPageToken;
      this.#attachData(items);

      this.#throttle = null;
    }, 0);
  }

  #mountTemplate() {
    this.skeletonVideos = Array.from(
      { length: NUMBER.MAX_RESULTS_COUNT },
      () => new Video(this.#$searchVideoWrapper)
    );
  }

  #attachData(items) {
    while (items.length < this.skeletonVideos.length) {
      this.skeletonVideos.pop().remove();
    }

    items
      .map((item, index) => [this.skeletonVideos[index], item])
      .forEach(([video, item]) => {
        video.attachData(item);

        const { videoId } = item.id;
        this.#videoItemsMap.set(videoId, item);
        this.#videosMap.set(videoId, video);
      });
  }
}
