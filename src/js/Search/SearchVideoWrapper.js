import { CLASSNAME, NUMBER, SNACKBAR_TEXT } from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import {
  $,
  fetchYoutubeData,
  showModalSnackbar,
  showSnackbar,
} from "../utils/index.js";
import { SearchVideo } from "../Video/index.js";

export default class SearchVideoWrapper {
  #currentQuery = "";

  #currentNextPageToken = "";

  #throttle = null;

  #videosMap = new Map();

  #$searchVideoWrapper = $(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`);

  constructor() {
    this.#addMessageListeners();
    this.#addEventListeners();
  }

  #addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.KEYWORD_SUBMITTED,
      this.#handleKeywordSubmit.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.DATA_LOADED,
      this.#handleDataLoad.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.SAVED_VIDEO_DELETED,
      this.#handleSavedVideoDelete.bind(this)
    );
  }

  #addEventListeners() {
    this.#$searchVideoWrapper.addEventListener(
      "scroll",
      this.#handlePageScroll.bind(this)
    );

    this.#$searchVideoWrapper.addEventListener(
      "mouseup",
      this.#handleSearchVideoWrapperClick.bind(this)
    );
  }

  #handleKeywordSubmit({ query }) {
    this.#currentQuery = query;
    this.#$searchVideoWrapper.innerHTML = "";
    this.#mountTemplate();
    this.#$searchVideoWrapper.scrollTo({ top: 0 });
  }

  #handleDataLoad({ nextPageToken, items }) {
    this.#currentNextPageToken = nextPageToken;

    this.#attachData(items);
  }

  #handleSavedVideoDelete({ videoId }) {
    const video = this.#videosMap.get(videoId);
    video?.removeSavedClass();
  }

  #handlePageScroll() {
    if (this.#throttle || this.#isOverScrollEventThreshold()) return;

    this.#throttle = setTimeout(async () => {
      try {
        this.#mountTemplate();
        const { nextPageToken, items } = await fetchYoutubeData(
          this.#currentQuery,
          this.#currentNextPageToken
        );
        this.#currentNextPageToken = nextPageToken;
        this.#attachData(items);
      } catch (error) {
        showSnackbar(error.message);
        this.#attachData([]);
      } finally {
        this.#throttle = null;
      }
    }, 0);
  }

  #isOverScrollEventThreshold() {
    const { scrollTop, clientHeight, scrollHeight } = this.#$searchVideoWrapper;

    return (
      scrollTop + clientHeight <= scrollHeight * NUMBER.SCROLL_EVENT_THRESHOLD
    );
  }

  #handleSearchVideoWrapperClick(event) {
    if (!$.containsClass(event.target, CLASSNAME.BUTTON)) {
      return;
    }

    const $button = event.target;
    const $video = $button.closest(`.${CLASSNAME.CLIP}`);
    const { videoId } = $video.dataset;
    const video = this.#videosMap.get(videoId);

    if (!video) {
      return;
    }

    if ($.containsClass($button, CLASSNAME.SAVE_VIDEO_BUTTON)) {
      this.#handleSaveVideoButtonClick(video);
      return;
    }

    if ($.containsClass($button, CLASSNAME.CANCEL_VIDEO_BUTTON)) {
      this.#handleCancelVideoButtonClick(video);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  #handleSaveVideoButtonClick(video) {
    messenger.deliverMessage(MESSAGE.SAVE_VIDEO_BUTTON_CLICKED, {
      callback: video.addSavedClass.bind(video),
      videoId: video.getVideoId(),
      item: video.getItem(),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  #handleCancelVideoButtonClick(video) {
    messenger.deliverMessage(MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED, {
      videoId: video.getVideoId(),
      item: video.getItem(),
    });

    video.removeSavedClass();
    showModalSnackbar(SNACKBAR_TEXT.CANCELED_VIDEO_SAVE);
  }

  #mountTemplate() {
    this.skeletonVideos = Array.from(
      { length: NUMBER.MAX_RESULTS_COUNT },
      () => new SearchVideo(this.#$searchVideoWrapper)
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
        this.#videosMap.set(video.getVideoId(), video);
      });
  }
}
