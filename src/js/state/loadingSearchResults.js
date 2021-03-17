import { CUSTOM_EVENTS } from "../utils/constants.js";
import elements from "../utils/elements.js";
import videos from "./videos.js";

const loadingSearchResults = {
  loadedCount: 0,

  load() {
    this.loadedCount++;
    if (this.loadedCount === videos.getRecentVideos().length) {
      elements.$searchResults.dispatchEvent(
        new CustomEvent(CUSTOM_EVENTS.LOAD_SEARCH_ALL)
      );
    }
  },

  resetLoadCount() {
    this.loadedCount = 0;
  },
};

export default loadingSearchResults;
