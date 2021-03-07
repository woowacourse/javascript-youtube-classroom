import {
  CLASSNAME,
  LOCAL_STORAGE_KEY,
  MAX_KEYWORDS_COUNT,
  MESSAGE,
} from "../constants.js";
import { $ } from "../utils/querySelector.js";
import deliveryMan from "../deliveryMan.js";

export default class KeywordHistory {
  constructor() {
    this.$keywordHistorySection = $(CLASSNAME.KEYWORD_HISTORY_SECTION);
    this.keywordHistory =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.KEYWORD_HISTORY)) || [];

    deliveryMan.addMessageListener(
      MESSAGE.KEYWORD_SUBMITTED,
      this.addKeyword.bind(this)
    );

    this.render();
  }

  addKeyword({ query }) {
    // console.log(`[KeywordHistory] MESSAGE.KEYWORD_SUBMITTED received `);

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
