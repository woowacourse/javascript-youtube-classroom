import { VIDEO_VIEW_NAME } from "../utils/constants.js";

const videoViewIndex = {
  viewName: "",

  init() {
    this.viewName = VIDEO_VIEW_NAME.WATCHED;
  },

  setViewName(viewName) {
    this.viewName = viewName;
  },

  getCurrentViewName() {
    return this.viewName;
  },
};

export default videoViewIndex;
