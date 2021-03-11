import {
  CLASSNAME,
  LOCAL_STORAGE_KEY,
  MAX_KEYWORDS_COUNT,
  MESSAGE,
} from "../constants.js";
import { $ } from "../utils/querySelector.js";
import messenger from "../Messenger.js";

export default class KeywordHistory {
  constructor() {
    this.keywordHistory =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.KEYWORD_HISTORY)) || [];

    this.$keywordHistorySection = $(CLASSNAME.KEYWORD_HISTORY_SECTION);

    messenger.addMessageListener(
      MESSAGE.KEYWORD_SUBMITTED,
      this.addKeyword.bind(this)
    );

    this.render();
  }

  addKeyword({ query }) {
    this.keywordHistory = this.keywordHistory.filter(
      (keyword) => keyword !== query
    );

    this.keywordHistory.push(query);
    if (this.keywordHistory.length > MAX_KEYWORDS_COUNT) {
      this.keywordHistory.shift();
    }

    localStorage.setItem(
      LOCAL_STORAGE_KEY.KEYWORD_HISTORY,
      JSON.stringify(this.keywordHistory)
    );

    this.render();
  }

  render() {
    this.$keywordHistorySection.innerHTML = `<span class="text-gray-700">최근 검색어: </span>`;
    this.keywordHistory.forEach((keyword) => {
      this.$keywordHistorySection.insertAdjacentHTML(
        "beforeEnd",
        `<a class="chip">${keyword}</a>`
      );
    });
  }
}
