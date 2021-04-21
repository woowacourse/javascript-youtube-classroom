import { CLASSNAME, NUMBER } from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { $ } from "../utils/index.js";

export default class SavedVideosCount {
  #$savedVideosCount = $(`.${CLASSNAME.SAVED_VIDEOS_COUNT}`);

  #$maxSavedVideosCount = $(`.${CLASSNAME.MAX_SAVED_VIDEOS_COUNT}`);

  constructor() {
    this.#addMessageListeners();
    this.#$maxSavedVideosCount.innerText = NUMBER.MAX_SAVED_VIDEOS_COUNT;
  }

  #addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.SAVED_VIDEO_COUNT_CHANGED,
      this.#render.bind(this)
    );
  }

  #render({ count }) {
    this.#$savedVideosCount.innerText = count;
  }
}
