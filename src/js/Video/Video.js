import { CLASSNAME } from "../constants/index.js";
import { $ } from "../utils/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { getSearchVideoTemplateElement } from "./template.js";

export default class Video {
  static #DOMAIN = "https://www.youtube.com";

  static #getPublishedAtLocaleString(dateString) {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  #$parent = null;

  #$video = null;

  #item = [];

  constructor($parent) {
    if (!($parent instanceof HTMLElement)) {
      throw new Error("Invalid parent Element", $parent);
    }

    this.#$parent = $parent;
    this.#mountTemplate();
  }

  #mountTemplate(position = "beforeEnd") {
    this.#$video = getSearchVideoTemplateElement();
    this.#$parent.insertAdjacentElement(position, this.#$video);
  }

  attachData(item) {
    this.#item = item;

    const {
      id: { videoId },
      snippet: { title, channelId, channelTitle, publishedAt },
    } = item;

    const $iframe = this.#$video.querySelector(`.${CLASSNAME.VIDEO_ID}`);
    const $videoTitle = this.#$video.querySelector(`.${CLASSNAME.VIDEO_TITLE}`);
    const $channelTitle = this.#$video.querySelector(
      `.${CLASSNAME.CHANNEL_TITLE}`
    );
    const $publishedAt = this.#$video.querySelector(
      `.${CLASSNAME.PUBLISHED_AT}`
    );

    this.#$video.dataset.videoId = videoId;

    $iframe.src = `${Video.#DOMAIN}/embed/${videoId}`;

    $videoTitle.innerText = title;

    $channelTitle.href = `${Video.#DOMAIN}/channel/${channelId}`;
    $channelTitle.innerText = channelTitle;

    $publishedAt.innerText = Video.#getPublishedAtLocaleString(publishedAt);

    // SearchVideo Only
    const $saveVideoButton = this.#$video.querySelector(
      `.${CLASSNAME.SAVE_VIDEO_BUTTON}`
    );
    const $cancelVideoButton = this.#$video.querySelector(
      `.${CLASSNAME.CANCEL_VIDEO_BUTTON}`
    );

    $cancelVideoButton.dataset.videoId = videoId;
    $saveVideoButton.dataset.videoId = videoId;

    messenger.deliverMessage(MESSAGE.HIDE_IF_VIDEO_IS_SAVED, {
      videoId,
      hide: this.addSavedClass.bind(this),
    });

    // Remove Skeleton Effect

    this.#$video.classList.remove(CLASSNAME.SKELETON);
  }

  addSavedClass() {
    $.addClass(this.#$video, CLASSNAME.SAVED);
  }

  removeSavedClass() {
    $.removeClass(this.#$video, CLASSNAME.SAVED);
  }
}
