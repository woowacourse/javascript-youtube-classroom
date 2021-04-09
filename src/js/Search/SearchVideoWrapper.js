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

  #videoItemsMap = new Map();

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

    $.clear(this.#$searchVideoWrapper);
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

  #handleSearchVideoWrapperClick(event) {
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
    video.removeSavedClass();
    showModalSnackbar(SNACKBAR_TEXT.CANCELED_VIDEO_SAVE);
  }

  #isOverScrollEventThreshold() {
    const { scrollTop, clientHeight, scrollHeight } = this.#$searchVideoWrapper;

    return (
      scrollTop + clientHeight <= scrollHeight * NUMBER.SCROLL_EVENT_THRESHOLD
    );
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

        const { videoId } = item.id;
        this.#videoItemsMap.set(videoId, item);
        this.#videosMap.set(videoId, video);
      });
  }
}
