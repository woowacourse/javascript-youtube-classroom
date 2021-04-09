import Video from "./Video.js";
import { getMainVideoTemplateElement } from "./template.js";
import { $ } from "../utils/index.js";
import { CLASSNAME } from "../constants/index.js";

export default class MainVideo extends Video {
  _mountTemplate() {
    this._$video = getMainVideoTemplateElement();
    this._$parent.insertAdjacentElement("afterbegin", this._$video);
  }

  attachData(item) {
    super.attachData(item);

    const $iconsWrapper = this._$video.querySelector(
      `.${CLASSNAME.ICONS_WRAPPER}`
    );

    $iconsWrapper.dataset.videoId = this._videoId;

    this.removeSkeletonEffect();
  }

  hasSkeletonEffect() {
    return $.containsClass(this._$video, CLASSNAME.SKELETON);
  }

  getVideoElement() {
    return this._$video;
  }
}
