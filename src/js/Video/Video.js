import { CLASSNAME } from "../constants/index.js";
import { $ } from "../utils/index.js";

export default class Video {
  static #DOMAIN = "https://www.youtube.com";

  static #getPublishedAtLocaleString(dateString) {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  _$parent = null;

  _$video = null;

  _item = [];

  constructor($parent) {
    if (!($parent instanceof HTMLElement)) {
      throw new Error("Invalid parent Element", $parent);
    }
    this._$parent = $parent;
    this._mountTemplate();
  }

  // eslint-disable-next-line class-methods-use-this
  _mountTemplate() {
    throw new Error("mountTemplate은 각 하위 class에서 정의하여야 합니다.");
  }

  attachData(item) {
    this._item = item;

    const {
      id: { videoId },
      snippet: { title, channelId, channelTitle, publishedAt },
    } = item;

    const $iframe = this._$video.querySelector(`.${CLASSNAME.VIDEO_ID}`);
    const $videoTitle = this._$video.querySelector(`.${CLASSNAME.VIDEO_TITLE}`);
    const $channelTitle = this._$video.querySelector(
      `.${CLASSNAME.CHANNEL_TITLE}`
    );
    const $publishedAt = this._$video.querySelector(
      `.${CLASSNAME.PUBLISHED_AT}`
    );

    this._videoId = videoId;
    this._$video.dataset.videoId = videoId;

    $iframe.src = `${Video.#DOMAIN}/embed/${videoId}`;

    $videoTitle.innerText = title;

    $channelTitle.href = `${Video.#DOMAIN}/channel/${channelId}`;
    $channelTitle.innerText = channelTitle;

    $publishedAt.innerText = Video.#getPublishedAtLocaleString(publishedAt);
  }

  removeSkeletonEffect() {
    this._$video.classList.remove(CLASSNAME.SKELETON);
  }

  addSavedClass() {
    $.addClass(this._$video, CLASSNAME.SAVED);
  }

  removeSavedClass() {
    $.removeClass(this._$video, CLASSNAME.SAVED);
  }

  remove() {
    this._$video.remove();
  }
}
