import { STORAGE_NAME, VIDEOS } from "../utils/constants.js";

const searchHistory = {
  pageToken: "",
  keywords: [],
  recentKeyword: "",

  initKeywords() {
    const keywords = localStorage.getItem(STORAGE_NAME.KEYWORDS);

    this.keywords = keywords ? JSON.parse(keywords) : [];
  },

  storeKeywords() {
    localStorage.setItem(STORAGE_NAME.KEYWORDS, JSON.stringify(this.keywords));
  },

  setKeyword(input) {
    this.recentKeyword = input.trim();

    if (this.getKeywordAll().includes(this.recentKeyword)) {
      this.removeKeyword(this.recentKeyword);
    }

    this.keywords = [this.recentKeyword, ...this.getKeywordAll()].slice(
      0,
      VIDEOS.KEYWORD_HISTORY_LENGTH
    );
    this.storeKeywords();
  },

  getKeyword() {
    return this.recentKeyword;
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
