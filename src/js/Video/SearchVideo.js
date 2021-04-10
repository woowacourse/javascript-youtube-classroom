import { messenger, MESSAGE } from "../messenger/index.js";
import { getSearchVideoTemplateElement } from "./template.js";
import Video from "./Video.js";

export default class SearchVideo extends Video {
  _mountTemplate() {
    this._$video = getSearchVideoTemplateElement();
    this._$parent.insertAdjacentElement("beforeend", this._$video);
  }

  attachData(item) {
    super.attachData(item);

    messenger.deliverMessage(MESSAGE.HIDE_IF_VIDEO_IS_SAVED, {
      videoId: this._videoId,
      hide: this.addSavedClass.bind(this),
    });
  }
}
