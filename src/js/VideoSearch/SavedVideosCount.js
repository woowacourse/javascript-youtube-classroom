import {
  CLASSNAME,
  MESSAGE,
  MAX_SAVED_VIDEOS_COUNT,
  LOCAL_STORAGE_KEY,
} from "../constants.js";
import deliveryMan from "../deliveryMan.js";
import { $ } from "../utils/querySelector.js";

export default class SavedVideosCount {
  constructor() {
    this.savedVideosCount =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.SAVED_VIDEOS_COUNT)) ||
      0;

    this.$savedVideosCount = $(CLASSNAME.SAVED_VIDEOS_COUNT);
    this.$maxSavedVideosCount = $(CLASSNAME.MAX_SAVED_VIDEOS_COUNT);

    this.$savedVideosCount.innerText = this.savedVideosCount;
    this.$maxSavedVideosCount.innerText = MAX_SAVED_VIDEOS_COUNT;

    deliveryMan.addMessageListener(
      MESSAGE.VIDEO_SAVED,
      this.setCount.bind(this)
    );
  }

  setCount({ savedVideosCount }) {
    this.savedVideosCount = savedVideosCount;

    localStorage.setItem(
      LOCAL_STORAGE_KEY.SAVED_VIDEOS_COUNT,
      JSON.stringify(this.savedVideosCount)
    );

    this.$savedVideosCount.innerText = this.savedVideosCount;
  }
}
