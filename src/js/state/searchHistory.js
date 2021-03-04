const searchHistory = {
  keywords: [],
  pageToken: "",

  setKeyword(newKeyword) {
    if (this.keywords.includes(newKeyword)) {
      this.removeKeyword(newKeyword);
    }

    this.keywords = [newKeyword, ...this.keywords];

    while (this.keywords.length > 3) {
      this.keywords.pop();
    }
  },

  getKeyword() {
    return this.keywords[0];
  },

  getKeywordAll() {
    return this.keywords;
  },

  removeKeyword(prevKeyword) {
    this.keywords = this.keywords.filter(
      (currentKeyword) => currentKeyword !== prevKeyword
    );
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
