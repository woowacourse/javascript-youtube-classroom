import Video from "./Video.js";
import { getMainVideoTemplateElement } from "./template.js";
import { $ } from "../utils/index.js";
import { CLASSNAME, VIDEO_TYPE } from "../constants/index.js";

export default class MainVideo extends Video {
  #videoType = VIDEO_TYPE.WATCH_LATER;

  #like = false;

  constructor($parent) {
    super($parent);
    this.#updateVideoType();
  }

  _mountTemplate() {
    this._$video = getMainVideoTemplateElement();
    this._$parent.insertAdjacentElement("afterbegin", this._$video);
  }

  hasSkeletonEffect() {
    return $.containsClass(this._$video, CLASSNAME.SKELETON);
  }

  toggleLike(force) {
    this.#setLike(force ?? !this.#like);

    return this.#like;
  }

  #setLike(isLiked) {
    this.#like = isLiked;
    $.toggleClass(this._$video, "like", this.#like);
  }

  setVideoType(nextVideoType) {
    this.#videoType = nextVideoType;
    this.#updateVideoType();
  }

  #updateVideoType() {
    Object.values(VIDEO_TYPE).forEach((type) =>
      $.removeClass(this._$video, type)
    );
    $.addClass(this._$video, this.#videoType);
  }

  toJSON() {
    return { ...super.toJSON(), like: this.#like, videoType: this.#videoType };
  }
}
