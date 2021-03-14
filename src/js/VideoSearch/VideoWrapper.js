import {
  CLASSNAME,
  MESSAGE,
  MAX_RESULTS_COUNT,
  SCROLL_EVENT_THRESHOLD,
} from "../constants.js";
import { $ } from "../utils/querySelector.js";
import messenger from "../Messenger.js";
import render from "../Video/render.js";
import TEMPLATE from "../Video/template.js";
import { fetchYoutubeData } from "../utils/API.js";

export default class VideoWrapper {
  constructor() {
    this.currentQuery = "";
    this.currentNextPageToken = "";

    this.$modalVideoWrapper = $(`.${CLASSNAME.MODAL_VIDEO_WRAPPER}`);
    this.$notFoundImg = $(`.${CLASSNAME.NOT_FOUND_IMAGE}`);

    messenger.addMessageListener(MESSAGE.KEYWORD_SUBMITTED, ({ query }) => {
      this.$notFoundImg.classList.add(CLASSNAME.HIDDEN);
      this.$modalVideoWrapper.innerHTML = "";
      this.currentQuery = query;
      this.mountTemplate();
    });

    messenger.addMessageListener(
      MESSAGE.DATA_LOADED,
      ({ nextPageToken, items }) => {
        if (items.length === 0) {
          this.$modalVideoWrapper.innerHTML = "";
          this.$notFoundImg.classList.remove(CLASSNAME.HIDDEN);
          return;
        }

        this.currentNextPageToken = nextPageToken;

        this.attachData(items);
      }
    );

    this.$modalVideoWrapper.addEventListener(
      "scroll",
      this.handlePageScroll.bind(this)
    );

    this.$modalVideoWrapper.addEventListener("click", (event) => {
      if (!event.target.classList.contains(CLASSNAME.SAVE_VIDEO_BUTTON)) {
        return;
      }

      this.saveVideo(event.target);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  saveVideo($button) {
    const { videoId } = $button.dataset;

    messenger.deliverMessage(MESSAGE.SAVE_VIDEO_BUTTON_CLICKED, { videoId });
    $button.classList.add(CLASSNAME.HIDDEN);
  }

  mountTemplate() {
    Array.from({ length: MAX_RESULTS_COUNT }).forEach(() => {
      this.$modalVideoWrapper.insertAdjacentHTML("beforeEnd", TEMPLATE);
    });
  }

  attachData(items) {
    const $$videos = Array.from(this.$modalVideoWrapper.children).slice(
      -MAX_RESULTS_COUNT
    );

    Array.from({ length: MAX_RESULTS_COUNT })
      .map((_, i) => [$$videos[i], items[i]])
      .forEach(([$video, item]) => render($video, item));
  }

  handlePageScroll() {
    if (this.throttle) return;

    if (
      this.$modalVideoWrapper.scrollTop +
        this.$modalVideoWrapper.clientHeight <=
      this.$modalVideoWrapper.scrollHeight * SCROLL_EVENT_THRESHOLD
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
