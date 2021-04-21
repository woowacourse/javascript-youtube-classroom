import { CLASSNAME, LOCAL_STORAGE_KEY } from "../constants/index.js";
import { $, fetchYoutubeData } from "../utils/index.js";
import { messenger, MESSAGE } from "../messenger/index.js";

export default class SearchForm {
  #query = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.QUERY)) || "";

  #$youtubeSearchForm = $(`.${CLASSNAME.SEARCH_FORM}`);

  #$youtubeSearchFormInput = $(`.${CLASSNAME.SEARCH_FORM_INPUT}`);

  constructor() {
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.#$youtubeSearchForm.addEventListener(
      "submit",
      this.#handleFormSubmit.bind(this)
    );
  }

  #handleFormSubmit(event) {
    event.preventDefault();

    this.#query = this.#$youtubeSearchFormInput.value;
    this.#updateLocalStorage();
    this.searchKeyword();
  }

  async searchKeyword() {
    if (this.#query === "") {
      return;
    }

    try {
      messenger.deliverMessage(MESSAGE.KEYWORD_SUBMITTED, {
        query: this.#query,
      });

      const { nextPageToken, items } = await fetchYoutubeData(this.#query);

      messenger.deliverMessage(MESSAGE.DATA_LOADED, { nextPageToken, items });

      this.#$youtubeSearchFormInput.value = "";
    } catch (error) {
      messenger.deliverMessage(MESSAGE.DATA_LOADED, { items: [] });
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  #updateLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY.QUERY, JSON.stringify(this.#query));
  }
}
