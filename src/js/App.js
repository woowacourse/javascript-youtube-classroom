import { CLASSNAME } from "./constants.js";
import { $ } from "./utils/querySelector.js";
import VideoSearchModal from "./VideoSearch/VideoSearchModal.js";
import WatchLater from "./WatchLater/WatchLater.js";

export default class App {
  constructor() {
    this.$watchLaterTabButton = $(`.${CLASSNAME.WATCH_LATER_TAB}`);
    this.$historyTabButton = $(`.${CLASSNAME.HISTORY_TAB}`);
    this.$videoSearchTabButton = $(`.${CLASSNAME.VIDEO_SEARCH_TAB}`);

    // TODO: historyTab
    this.watchLater = new WatchLater();
    this.videoSearchModal = new VideoSearchModal();

    this.$videoSearchTabButton.addEventListener(
      "click",
      this.videoSearchModal.open.bind(this.videoSearchModal)
    );
  }
}
