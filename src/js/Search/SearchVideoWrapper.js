/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { CLASSNAME, NUMBER, SNACKBAR_TEXT } from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { renderSearchVideo, SEARCH_VIDEO_TEMPLATE } from "../Video/index.js";
import { $, fetchYoutubeData, showModalSnackbar } from "../utils/index.js";

export default class SearchVideoWrapper {
  constructor() {
    this.initializeVariables();
    this.selectHTMLElements();
    this.addMessageListeners();
    this.addEventListeners();
  }

  initializeVariables() {
    this.currentQuery = "";
    this.currentNextPageToken = "";
    this.videoItemsMap = new Map();
  }

  selectHTMLElements() {
    this.$searchVideoWrapper = $(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`);
    this.$notFoundImg = $(`.${CLASSNAME.NOT_FOUND_IMAGE}`);
  }

  addMessageListeners() {
    messenger.addMessageListener(MESSAGE.KEYWORD_SUBMITTED, ({ query }) => {
      this.currentQuery = query;

      $.hide(this.$notFoundImg);
      $.clear(this.$searchVideoWrapper);

      this.mountTemplate();
      this.$searchVideoWrapper.scrollTo({ top: 0 });
    });

    messenger.addMessageListener(
      MESSAGE.DATA_LOADED,
      ({ nextPageToken, items }) => {
        if (items.length === 0) {
          $.clear(this.$searchVideoWrapper);
          $.show(this.$notFoundImg);

          return;
        }

        this.currentNextPageToken = nextPageToken;

        this.attachData(items);
      }
    );

    messenger.addMessageListener(MESSAGE.SAVED_VIDEO_DELETED, ({ videoId }) => {
      const $button = $(
        `.${CLASSNAME.SAVE_VIDEO_BUTTON}[data-video-id="${videoId}"]`
      );

      this.setButtonSaveMode($button);
    });
  }

  addEventListeners() {
    this.$searchVideoWrapper.addEventListener(
      "scroll",
      this.handlePageScroll.bind(this)
    );

    this.$searchVideoWrapper.addEventListener(
      "click",
      ({ target: $target }) => {
        if (!$target.classList.contains(CLASSNAME.SAVE_VIDEO_BUTTON)) {
          return;
        }

        this.handleSaveVideoButtonClick($target);
      }
    );
  }

  handleSaveVideoButtonClick($button) {
    const { videoId } = $button.dataset;
    const item = this.videoItemsMap.get(videoId);

    if (this.isButtonCancelMode($button)) {
      messenger.deliverMessage(MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED, {
        videoId,
        item,
      });
      this.setButtonSaveMode($button);

      return;
    }

    messenger.deliverMessage(MESSAGE.SAVE_VIDEO_BUTTON_CLICKED, {
      resolve: this.setButtonCancelMode.bind(this, $button),
      reject: this.showModalSnackbar.bind(
        this,
        SNACKBAR_TEXT.REACHED_MAX_COUNT
      ),
      videoId,
      item,
    });
  }

  isButtonCancelMode($button) {
    return $button.classList.contains(CLASSNAME.CANCEL);
  }

  setButtonCancelMode($button) {
    $.addClass($button, CLASSNAME.CANCEL);
    $button.innerText = "취소";
    showModalSnackbar(SNACKBAR_TEXT.VIDEO_SAVED);
  }

  setButtonSaveMode($button) {
    $.removeClass($button, CLASSNAME.CANCEL);
    $button.innerText = "저장";
    showModalSnackbar(SNACKBAR_TEXT.CANCELED_VIDEO_SAVE);
  }

  handlePageScroll() {
    if (this.throttle) return;

    const { scrollTop, clientHeight, scrollHeight } = this.$searchVideoWrapper;

    if (
      scrollTop + clientHeight <=
      scrollHeight * NUMBER.SCROLL_EVENT_THRESHOLD
    ) {
      return;
    }

    this.throttle = setTimeout(async () => {
      this.mountTemplate();
      const { nextPageToken, items } = await fetchYoutubeData(
        this.currentQuery,
        this.currentNextPageToken
      );
      this.currentNextPageToken = nextPageToken;
      this.attachData(items);

      this.throttle = null;
    }, 0);
  }

  mountTemplate() {
    Array.from({ length: NUMBER.MAX_RESULTS_COUNT }).forEach(() => {
      this.$searchVideoWrapper.insertAdjacentHTML(
        "beforeEnd",
        SEARCH_VIDEO_TEMPLATE
      );
    });
  }

  attachData(items) {
    const $$videos = Array.from(this.$searchVideoWrapper.children).slice(
      -NUMBER.MAX_RESULTS_COUNT
    );

    Array.from({ length: NUMBER.MAX_RESULTS_COUNT })
      .map((_, i) => [$$videos[i], items[i]])
      .forEach(([$video, item]) => {
        const { videoId } = item.id;
        this.videoItemsMap.set(videoId, item);

        renderSearchVideo($video, item);
      });
  }
}
