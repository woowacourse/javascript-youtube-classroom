import {
  MESSAGE,
  MAX_SAVED_VIDEOS_COUNT,
  LOCAL_STORAGE_KEY,
} from "../constants.js";
import deliveryMan from "../deliveryMan.js";

export default class WatchLater {
  constructor() {
    this.savedVideoIds =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.SAVED_VIDEO_IDS)) || [];

    deliveryMan.addMessageListener(
      MESSAGE.SAVE_VIDEO_BUTTON_CLICKED,
      ({ videoId }) => {
        // console.log(`[WatchLater] MESSAGE.VIDEO_BUTTON_CLICKED received `);

        this.savedVideoIds.push(videoId);
        this.savedVideoIds = this.savedVideoIds.slice(-MAX_SAVED_VIDEOS_COUNT);

        localStorage.setItem(
          LOCAL_STORAGE_KEY.SAVED_VIDEO_IDS,
          JSON.stringify(this.savedVideoIds)
        );

        // console.log(`[WatchLater] MESSAGE.VIDEO_SAVED post `);
        deliveryMan.deliverMessage(MESSAGE.VIDEO_SAVED, {
          savedVideosCount: this.savedVideoIds.length,
        });
      }
    );

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
