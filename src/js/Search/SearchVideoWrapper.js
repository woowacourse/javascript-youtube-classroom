/* eslint-disable no-param-reassign */
import { CLASSNAME, NUMBER, SNACKBAR_TEXT } from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { renderSearchVideo, SEARCH_VIDEO_TEMPLATE } from "../Video/index.js";
import { $, fetchYoutubeData, showModalSnackbar } from "../utils/index.js";

export default class SearchVideoWrapper {
  constructor() {
    this.currentQuery = "";
    this.currentNextPageToken = "";
    this.videoItemsMap = new Map();

    this.$searchVideoWrapper = $(`.${CLASSNAME.SEARCH_VIDEO_WRAPPER}`);
    this.$notFoundImg = $(`.${CLASSNAME.NOT_FOUND_IMAGE}`);

    messenger.addMessageListener(MESSAGE.KEYWORD_SUBMITTED, ({ query }) => {
      this.$notFoundImg.classList.add(CLASSNAME.HIDDEN);
      this.$searchVideoWrapper.innerHTML = "";
      this.currentQuery = query;
      this.mountTemplate();
      this.$searchVideoWrapper.scrollTo({ top: 0 });
    });

    messenger.addMessageListener(
      MESSAGE.DATA_LOADED,
      ({ nextPageToken, items }) => {
        if (items.length === 0) {
          this.$searchVideoWrapper.innerHTML = "";
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

      $.removeClass($button, CLASSNAME.CANCEL);
      $button.innerText = "저장";
      showModalSnackbar(SNACKBAR_TEXT.CANCELED_VIDEO_SAVE);
    });

    this.$searchVideoWrapper.addEventListener(
      "scroll",
      this.handlePageScroll.bind(this)
    );

    this.$searchVideoWrapper.addEventListener("click", (event) => {
      if (!event.target.classList.contains(CLASSNAME.SAVE_VIDEO_BUTTON)) {
        return;
      }

      this.onSaveVideoButtonClick(event.target);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onSaveVideoButtonClick($button) {
    const { videoId } = $button.dataset;
    const item = this.videoItemsMap.get(videoId);

    if ($button.classList.contains(CLASSNAME.CANCEL)) {
      messenger.deliverMessage(MESSAGE.CANCEL_VIDEO_BUTTON_CLICKED, {
        videoId,
        item,
      });
      $.removeClass($button, CLASSNAME.CANCEL);
      $button.innerText = "저장";
      showModalSnackbar(SNACKBAR_TEXT.CANCELED_VIDEO_SAVE);
      return;
    }

    const resolve = () => {
      messenger.deliverMessage(MESSAGE.SAVE_VIDEO_BUTTON_CLICKED, {
        videoId,
        item,
      });

      $.addClass($button, CLASSNAME.CANCEL);
      $button.innerText = "취소";
      showModalSnackbar(SNACKBAR_TEXT.VIDEO_SAVED);
    };

    const reject = () => {
      showModalSnackbar(SNACKBAR_TEXT.REACHED_MAX_COUNT);
    };

    messenger.deliverMessage(MESSAGE.SAVE_IF_VIDEOS_COUNT_IS_IN_RANGE, {
      resolve,
      reject,
    });
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

  handlePageScroll() {
    if (this.throttle) return;

    if (
      this.$searchVideoWrapper.scrollTop +
        this.$searchVideoWrapper.clientHeight <=
      this.$searchVideoWrapper.scrollHeight * NUMBER.SCROLL_EVENT_THRESHOLD
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
}
