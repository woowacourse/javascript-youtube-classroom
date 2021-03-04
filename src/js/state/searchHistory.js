import { STORAGE_NAME, VIDEOS } from "../utils/constants.js";

const searchHistory = {
  pageToken: "",

  setKeyword(newKeyword) {
    const keywords = this.getKeywordAll();

    if (keywords.includes(newKeyword)) {
      this.removeKeyword(newKeyword);
    }

    const updatedKeywords = [newKeyword, ...keywords];
    localStorage.setItem(
      STORAGE_NAME.KEYWORDS,
      JSON.stringify(updatedKeywords.slice(0, VIDEOS.KEYWORD_HISTORY_LENGTH))
    );
  },

  getKeyword() {
    return this.getKeywordAll()[0];
  },

  getKeywordAll() {
    const keyword = localStorage.getItem(STORAGE_NAME.KEYWORDS);

    return keyword ? JSON.parse(keyword) : [];
  },

  removeKeyword(prevKeyword) {
    const keywords = this.getKeywordAll().filter(
      (currentKeyword) => currentKeyword !== prevKeyword
    );

    localStorage.setItem(STORAGE_NAME.KEYWORDS, JSON.stringify(keywords));
  },

  setPageToken(newToken) {
    this.pageToken = newToken;
  },

  getPageToken() {
    return this.pageToken;
  },

  resetPageToken() {
    this.pageToken = "";
  },
};

export default searchHistory;
