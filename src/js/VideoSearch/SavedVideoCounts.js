import { CLASSNAME, MESSAGE, MAX_SAVED_VIDEOS_COUNT } from "../constants.js";
import deliveryMan from "../deliveryMan.js";
import { $ } from "../utils/querySelector.js";

export default class SavedVideosCount {
  constructor() {
    this.savedVideoIds = [];

    this.$savedVideosCount = $(CLASSNAME.SAVED_VIDEOS_COUNT);
    this.$maxSavedVideosCount = $(CLASSNAME.MAX_SAVED_VIDEOS_COUNT);

    this.$savedVideosCount.innerText = this.savedVideoIds.length;
    this.$maxSavedVideosCount.innerText = MAX_SAVED_VIDEOS_COUNT;

    deliveryMan.addMessageListener(MESSAGE.VIDEO_SAVED, ({ videoId }) => {
      // console.log(`[SavedVideoCounts] MESSAGE.VIDEO_SAVED received `);

      this.savedVideoIds.push(videoId);
      this.savedVideoIds = this.savedVideoIds.slice(-MAX_SAVED_VIDEOS_COUNT);

      this.$savedVideosCount.innerText = this.savedVideoIds.length;
    });

    deliveryMan.addMessageListener(
      MESSAGE.HIDE_IF_VIDEO_IS_SAVED,
      ({ videoId, callback }) => {
        // console.log(
        //   `[SavedVideoCounts] HIDE_IF_VIDEO_IS_SAVED received videoId: `,
        //   videoId
        // );

        if (this.savedVideoIds.includes(videoId)) {
          // console.log(
          //   `[SavedVideoCounts] HIDE_IF_VIDEO_IS_SAVED callback invoked videoId: `,
          //   videoId,
          //   callback
          // );
          callback();
        }
      }
    );
  }
}
