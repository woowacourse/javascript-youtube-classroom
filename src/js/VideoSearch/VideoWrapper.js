import { CLASSNAME, MESSAGE, MAX_RESULTS_COUNT } from "../constants.js";
// import { URL } from "../utils/URL.js";
import { $ } from "../utils/querySelector.js";
import dummyFetch from "../dummyFetch.js";
import store from "../store.js";
import { SKELETON_TEMPLATE, render } from "../utils/videoInfo.js";

export default class VideoWrapper {
  constructor() {
    this.$modalVideoWrapper = $(CLASSNAME.MODAL_VIDEO_WRAPPER);
    this.$notFoundImg = $(CLASSNAME.NOT_FOUND_IMAGE);
    this.currentQuery = "";
    this.currentNextPageToken = "";

    store.addMessageListener(MESSAGE.KEYWORD_SUBMITTED, ({ query }) => {
      this.$modalVideoWrapper.innerHTML = "";
      this.currentQuery = query;
      this.mountTemplate();
    });
    store.addMessageListener(MESSAGE.DATA_LOADED, this.attachData.bind(this));

    this.$modalVideoWrapper.addEventListener(
      "scroll",
      this.handlePageScroll.bind(this)
    );
  }

  mountTemplate() {
    // console.log(`[VideoWrapper] MESSAGE.KEYWORD_SUBMITTED received `);

    Array.from({ length: MAX_RESULTS_COUNT }).forEach(() => {
      this.$modalVideoWrapper.insertAdjacentHTML(
        "beforeEnd",
        SKELETON_TEMPLATE
      );
    });
  }

  attachData({ nextPageToken, items }) {
    // console.log(`[VideoWrapper] MESSAGE.DATA_LOADED received `);
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
      this.$modalVideoWrapper.scrollHeight * 0.7
    ) {
      return;
    }

    if (this.throttle) return;

    this.throttle = setTimeout(async () => {
      this.throttle = null;

      this.loadData();
    }, 500);
  }

  async loadData() {
    this.mountTemplate();

    try {
      const response = await dummyFetch(
        this.currentQuery,
        this.currentNextPageToken
      );
      // const response = await fetch(URL(this.query, this.nextPageToken));

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
