import BasicStorage from './BasicStorage.js';

export default class PrevSearchResult extends BasicStorage {
  constructor(key) {
    super(key);
    if (!this.getItem()) {
      super.setItem({ prevSearchedVideos: [] });
    }
  }

  setItem({ lastQuery, nextPageToken, prevSearchedVideos }) {
    const prevSearchInfo = this.getItem();
    const newItem = {
      lastQuery: lastQuery ? lastQuery : prevSearchInfo.lastQuery,
      nextPageToken: nextPageToken ? nextPageToken : prevSearchInfo.nextPageToken,
      prevSearchedVideos: prevSearchedVideos ? prevSearchedVideos : prevSearchInfo.prevSearchedVideos,
    };
    super.setItem(newItem);
  }
}
