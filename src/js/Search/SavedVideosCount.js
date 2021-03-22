import { CLASSNAME, NUMBER, LOCAL_STORAGE_KEY } from "../constants/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";
import { $ } from "../utils/index.js";

export default class SavedVideosCount {
  constructor() {
    this.initializeVariables();
    this.selectHTMLElements();
    this.addMessageListeners();
    this.render();
    this.$maxSavedVideosCount.innerText = NUMBER.MAX_SAVED_VIDEOS_COUNT;
  }

  initializeVariables() {
    this.savedVideosCount =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.SAVED_VIDEOS_COUNT)) ||
      0;
  }

  selectHTMLElements() {
    this.$savedVideosCount = $(`.${CLASSNAME.SAVED_VIDEOS_COUNT}`);
    this.$maxSavedVideosCount = $(`.${CLASSNAME.MAX_SAVED_VIDEOS_COUNT}`);
  }

  addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.SAVED_VIDEOS_COUNT_CHANGED,
      this.setCount.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.SAVE_IF_VIDEOS_COUNT_IS_IN_RANGE,
      ({ resolve, reject }) => {
        if (this.savedVideosCount >= NUMBER.MAX_SAVED_VIDEOS_COUNT) {
          reject();
          return;
        }

        resolve();
        this.setCount({ change: +1 });
      }
    );
  }

  setCount({ change }) {
    this.savedVideosCount += change;

    localStorage.setItem(
      LOCAL_STORAGE_KEY.SAVED_VIDEOS_COUNT,
      JSON.stringify(this.savedVideosCount)
    );

    this.render();
  }

  render() {
    this.$savedVideosCount.innerText = this.savedVideosCount;
  }
}
