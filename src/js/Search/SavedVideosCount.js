import { CLASSNAME, NUMBER, LOCAL_STORAGE_KEY } from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { $ } from "../utils/index.js";

export default class SavedVideosCount {
  #savedVideosCount =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.SAVED_VIDEOS_COUNT)) || 0;

  #$savedVideosCount = $(`.${CLASSNAME.SAVED_VIDEOS_COUNT}`);

  #$maxSavedVideosCount = $(`.${CLASSNAME.MAX_SAVED_VIDEOS_COUNT}`);

  constructor() {
    this.#addMessageListeners();
    this.#render();
    this.#$maxSavedVideosCount.innerText = NUMBER.MAX_SAVED_VIDEOS_COUNT;
  }

  #addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.SAVED_VIDEO_DELETED,
      this.#setCount.bind(this, { change: -1 })
    );

    messenger.addMessageListener(
      MESSAGE.SAVE_VIDEO_BUTTON_CLICKED,
      ({ resolve, reject, videoId, item }) => {
        if (this.#savedVideosCount >= NUMBER.MAX_SAVED_VIDEOS_COUNT) {
          reject();
        } else {
          resolve();
          this.#setCount({ change: +1 });
          messenger.deliverMessage(MESSAGE.SAVE_VIDEO, {
            videoId,
            item,
          });
        }
      }
    );
  }

  #setCount({ change }) {
    this.#savedVideosCount += change;
    this.#updateLocalStorage();

    this.#render();
  }

  #render() {
    this.#$savedVideosCount.innerText = this.#savedVideosCount;
  }

  #updateLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.SAVED_VIDEOS_COUNT,
      JSON.stringify(this.#savedVideosCount)
    );
  }
}
