import { CLASSNAME, LOCAL_STORAGE_KEY, NUMBER } from "../constants/index.js";
import { $, fetchYoutubeData, showModalSnackbar } from "../utils/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";

export default class KeywordHistory {
  #keywordHistory = new Map(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.KEYWORD_HISTORY))
  );

  #$keywordHistorySection = $(`.${CLASSNAME.KEYWORD_HISTORY_SECTION}`);

  constructor() {
    this.#addMessageListeners();
    this.#addEventListeners();
    this.#render();
  }

  #addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.KEYWORD_SUBMITTED,
      this.addKeyword.bind(this)
    );
  }

  #addEventListeners() {
    this.#$keywordHistorySection.addEventListener(
      "click",
      this.#handleKeywordHistorySectionClick.bind(this)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async #handleKeywordHistorySectionClick(event) {
    if (!$.containsClass(event.target, "chip")) {
      return;
    }

    const query = event.target.innerText;
    messenger.deliverMessage(MESSAGE.KEYWORD_SUBMITTED, { query });

    try {
      const { nextPageToken, items } = await fetchYoutubeData(query);
      messenger.deliverMessage(MESSAGE.DATA_LOADED, { nextPageToken, items });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      showModalSnackbar(error.message);
      messenger.deliverMessage(MESSAGE.DATA_LOADED, { items: [] });
    }
  }

  #render() {
    const keywords = Array.from(this.#keywordHistory)
      .sort(([, time1], [, time2]) => time2 - time1)
      .slice(0, NUMBER.MAX_KEYWORDS_COUNT)
      .map(([keyword]) => `<span class="chip">${keyword}</span>`)
      .join("");

    this.#$keywordHistorySection.innerHTML = `<span class="text-gray-700">최근 검색어: </span>${keywords}`;
  }

  addKeyword({ query }) {
    this.#keywordHistory.set(query, Date.now());
    this.#updateLocalStorage();
    this.#render();
  }

  #updateLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY.KEYWORD_HISTORY,
      JSON.stringify(this.#keywordHistory, (key, value) =>
        value instanceof Map ? Array.from(value) : value
      )
    );
  }
}
