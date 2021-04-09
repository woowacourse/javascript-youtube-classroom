import { messenger, MESSAGE } from "../messenger/index.js";
import { CLASSNAME } from "../constants/index.js";
import { getSearchVideoTemplateElement } from "./template.js";
import Video from "./Video.js";

export default class SearchVideo extends Video {
  _mountTemplate() {
    this._$video = getSearchVideoTemplateElement();
    this._$parent.insertAdjacentElement("beforeend", this._$video);
  }

  attachData(item) {
    super.attachData(item);

    const $saveVideoButton = this._$video.querySelector(
      `.${CLASSNAME.SAVE_VIDEO_BUTTON}`
    );
    const $cancelVideoButton = this._$video.querySelector(
      `.${CLASSNAME.CANCEL_VIDEO_BUTTON}`
    );

    $cancelVideoButton.dataset.videoId = this._videoId;
    $saveVideoButton.dataset.videoId = this._videoId;

    messenger.deliverMessage(MESSAGE.HIDE_IF_VIDEO_IS_SAVED, {
      videoId: this._videoId,
      hide: this.addSavedClass.bind(this),
    });

    this.removeSkeletonEffect();
  }
}
