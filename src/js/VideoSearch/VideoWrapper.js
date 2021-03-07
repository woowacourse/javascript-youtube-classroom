import {
  CLASSNAME,
  MESSAGE,
  MAX_RESULTS_COUNT,
  API_END_POINT,
  SCROLL_EVENT_THRESHOLD,
  THROTTLE_TIME_IN_MS,
} from "../constants.js";
import { $ } from "../utils/querySelector.js";
import dummyFetch from "../dummyFetch.js";
import deliveryMan from "../deliveryMan.js";
import { SKELETON_TEMPLATE, render } from "../utils/videoInfo.js";

export default class VideoWrapper {
  constructor() {
    this.$modalVideoWrapper = $(CLASSNAME.MODAL_VIDEO_WRAPPER);
    this.$notFoundImg = $(CLASSNAME.NOT_FOUND_IMAGE);
    this.currentQuery = "";
    this.currentNextPageToken = "";

    deliveryMan.addMessageListener(MESSAGE.KEYWORD_SUBMITTED, ({ query }) => {
      // console.log(`[VideoWrapper] MESSAGE.KEYWORD_SUBMITTED received `);

      this.$notFoundImg.classList.add(CLASSNAME.HIDDEN);
      this.$modalVideoWrapper.innerHTML = "";
      this.currentQuery = query;
      this.mountTemplate();
    });
    deliveryMan.addMessageListener(
      MESSAGE.DATA_LOADED,
      ({ nextPageToken, items }) => {
        // console.log(`[VideoWrapper] MESSAGE.DATA_LOADED received `);
        // console.log("nextPageToken: ", nextPageToken);
        // console.log("items: ", items);

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

    // console.log(
    //   `[VideoWrapper] MESSAGE.VIDEO_SAVED post. videoId: `,
    //   videoId
    // );
    deliveryMan.dispatchMessage(MESSAGE.VIDEO_SAVED, { videoId });
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

    this.throttle = setTimeout(async () => {
      this.throttle = null;

      this.loadData();
    }, THROTTLE_TIME_IN_MS);
  }

  async loadData() {
    this.mountTemplate();

    try {
      const response = await dummyFetch(
        this.currentQuery,
        this.currentNextPageToken
      );
      // const response = await fetch(
      //   API_END_POINT(this.currentQuery, this.currentNextPageToken)
      // );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { nextPageToken, items } = await response.json();

      this.attachData({ nextPageToken, items });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
