import BasicStorage from './BasicStorage.js';

export default class PrevSearchResult extends BasicStorage {
  constructor(key) {
    super(key);
    if (!this.getItem()) {
      super.setItem({ prevSearchedVideos: [] });
    }
  }
  setItem({ lastQuery, nextPageToken, prevSearchedVideos }) {
    const prevSearchResult = this.getItem();
    const newItem = {
      lastQuery: lastQuery ? lastQuery : prevSearchResult.lastQuery,
      nextPageToken: nextPageToken
        ? nextPageToken
        : prevSearchResult.nextPageToken,
      prevSearchedVideos: prevSearchedVideos
        ? prevSearchedVideos
        : prevSearchResult.prevSearchedVideos,
    };
    super.setItem(newItem);
  }
}
