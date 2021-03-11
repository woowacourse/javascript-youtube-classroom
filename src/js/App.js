import { CLASSNAME } from "./constants.js";
import { $c } from "./utils/querySelector.js";
import VideoSearchModal from "./VideoSearch/VideoSearchModal.js";
import WatchLater from "./WatchLater/WatchLater.js";

export default class App {
  constructor() {
    this.$watchLaterTabButton = $c(CLASSNAME.WATCH_LATER_TAB);
    this.$historyTabButton = $c("js-watch-later-tab");
    this.$videoSearchTabButton = $c(CLASSNAME.VIDEO_SEARCH_TAB);

    // TODO: historyTab
    this.watchLater = new WatchLater();
    this.videoSearchModal = new VideoSearchModal();

    this.$videoSearchTabButton.addEventListener(
      "click",
      this.videoSearchModal.open.bind(this.videoSearchModal)
    );
  }
}
