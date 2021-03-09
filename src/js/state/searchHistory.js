import { STORAGE_NAME, VIDEOS } from "../utils/constants.js";

const searchHistory = {
  pageToken: "",
  keywords: [],

  initKeywords() {
    const keywords = localStorage.getItem(STORAGE_NAME.KEYWORDS);

    this.keywords = keywords ? JSON.parse(keywords) : [];
  },

  storeKeywords() {
    localStorage.setItem(STORAGE_NAME.KEYWORDS, JSON.stringify(this.keywords));
  },

  setKeyword(input) {
    const newKeyword = input.trim();

    if (this.getKeywordAll().includes(newKeyword)) {
      this.removeKeyword(newKeyword);
    }

    this.keywords = [newKeyword, ...this.getKeywordAll()].slice(
      0,
      VIDEOS.KEYWORD_HISTORY_LENGTH
    );
    this.storeKeywords();
  },

  getKeyword() {
    return this.keywords[0];
  },

  getKeywordAll() {
    return this.keywords;
  },

  removeKeyword(target) {
    this.keywords = this.keywords.filter(
      (currentKeyword) => currentKeyword !== target
    );

    this.storeKeywords();
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
