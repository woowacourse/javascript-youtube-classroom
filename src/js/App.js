import { CLASSNAME } from "./constants.js";
import { $ } from "./querySelector.js";
import VideoSearchModal from "./VideoSearch/VideoSearchModal.js";

export default class App {
  constructor() {
    this.$watchLaterTabButton = $(".js-watch-later-tab");
    this.$historyTabButton = $(".js-watch-later-tab");
    this.$videoSearchTabButton = $(CLASSNAME.VIDEO_SEARCH_TAB);

    // TODO: watchLaterTab
    // TODO: historyTab
    this.videoSearchModal = new VideoSearchModal();

    this.$videoSearchTabButton.addEventListener(
      "click",
      this.videoSearchModal.open.bind(this.videoSearchModal)
    );
  }
}
