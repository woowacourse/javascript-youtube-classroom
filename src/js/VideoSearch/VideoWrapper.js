import {
  CLASSNAME,
  MESSAGE,
  MAX_RESULTS_COUNT,
  API_END_POINT,
  SCROLL_EVENT_THRESHOLD,
  THROTTLE_TIME_IN_MS,
} from "../constants.js";
import { $c } from "../utils/querySelector.js";
import messenger from "../Messenger.js";
import { SKELETON_TEMPLATE, render } from "../utils/videoInfo.js";

export default class VideoWrapper {
  constructor() {
    this.currentQuery = "";
    this.currentNextPageToken = "";

    this.$modalVideoWrapper = $c(CLASSNAME.MODAL_VIDEO_WRAPPER);
    this.$notFoundImg = $c(CLASSNAME.NOT_FOUND_IMAGE);

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

        this.attachData({ nextPageToken, items });
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
      this.$modalVideoWrapper.insertAdjacentHTML(
        "beforeEnd",
        SKELETON_TEMPLATE
      );
    });
  }

  attachData({ nextPageToken, items }) {
    this.currentNextPageToken = nextPageToken;

    const $$videos = Array.from(this.$modalVideoWrapper.children).slice(
      -MAX_RESULTS_COUNT
    );

    Array.from({ length: MAX_RESULTS_COUNT })
      .map((_, i) => [$$videos[i], items[i]])
      .forEach(([$video, item]) => render($video, item));
  }

  handlePageScroll() {
    if (
      this.$modalVideoWrapper.scrollTop +
        this.$modalVideoWrapper.clientHeight <=
      this.$modalVideoWrapper.scrollHeight * SCROLL_EVENT_THRESHOLD
    ) {
      return;
    }

    if (this.throttle) return;

    this.throttle = setTimeout(() => {
      this.throttle = null;
      this.loadData();
    }, THROTTLE_TIME_IN_MS);
  }

  async loadData() {
    this.mountTemplate();

    try {
      const response = await fetch(
        API_END_POINT(this.currentQuery, this.currentNextPageToken)
      );
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error.message);
      }

      const { nextPageToken, items } = body;

      this.attachData({ nextPageToken, items });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
