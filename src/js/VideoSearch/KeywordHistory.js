import { CLASSNAME, MAX_KEYWORDS_COUNT } from "../constants.js";
import { $ } from "../querySelector.js";
import store from "../store.js";

export default class KeywordHistory {
  constructor() {
    this.$keywordHistorySection = $(CLASSNAME.KEYWORD_HISTORY_SECTION);
    this.keywordHistory = [];

    store.addStateListener("query", this.addKeyword.bind(this));
  }

  addKeyword(query) {
    this.keywordHistory = this.keywordHistory.filter(
      (keyword) => keyword !== query
    );
    this.keywordHistory.push(query);
    if (this.keywordHistory.length > MAX_KEYWORDS_COUNT) {
      this.keywordHistory.shift();
    }

    this.$keywordHistorySection.innerHTML = `<span class="text-gray-700">최근 검색어: </span>`;
    this.keywordHistory.forEach((keyword) => {
      this.$keywordHistorySection.insertAdjacentHTML(
        "beforeEnd",
        `<a class="chip">${keyword}</a>`
      );
    });
  }
}
