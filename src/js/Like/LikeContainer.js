import { CLASSNAME } from "../constants/index.js";
import { $ } from "../utils/DOM.js";
import LikeVideoWrapper from "./LikeVideoWrapper.js";

export default class LikeContainer {
  constructor() {
    this.$likeContainer = $(`.${CLASSNAME.LIKE_CONTAINER}`);

    this.likeVideoWrapper = new LikeVideoWrapper();
  }

  show() {
    $.show(this.$likeContainer);
  }

  hide() {
    $.hide(this.$likeContainer);
  }
}
