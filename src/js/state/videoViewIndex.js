import { VIDEO_VIEW_NAME } from "../utils/constants.js";

const videoViewIndex = {
  viewName: "",

  init() {
    this.viewName = VIDEO_VIEW_NAME.WATCH_LATER;
  },

  setViewName(viewName) {
    this.viewName = viewName;
  },

  getCurrentViewName() {
    return this.viewName;
  },
};

videoViewIndex.init();

export default videoViewIndex;
