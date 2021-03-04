import elements from "../utils/elements.js";
import videos from "./videos.js";

const loadingSearchResults = {
  loadedCount: 0,

  load() {
    if (++this.loadedCount === videos.getRecentVideos().length) {
      elements.$searchResults.dispatchEvent(new CustomEvent("loadSearchAll"));
    }
  },

  resetLoadCount() {
    this.loadedCount = 0;
  },
};

export default loadingSearchResults;
