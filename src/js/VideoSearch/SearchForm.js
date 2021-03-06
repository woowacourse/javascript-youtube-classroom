import { CLASSNAME, MESSAGE } from "../constants.js";
import { $ } from "../utils/querySelector.js";
import store from "../store.js";
// import { URL } from "../utils/URL.js";
import dummyFetch from "../dummyFetch.js";

export default class SearchForm {
  constructor() {
    this.$youtubeSearchForm = $(CLASSNAME.YOUTUBE_SEARCH_FORM);
    this.$youtubeSearchFormInput = $(CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT);

    this.$youtubeSearchForm.addEventListener(
      "submit",
      this.handleFormSubmit.bind(this)
    );
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const query = this.$youtubeSearchFormInput.value;

    store.postMessage(MESSAGE.KEYWORD_SUBMITTED, { query });

    // console.log(`[SearchForm] MESSAGE.KEYWORD_SUBMITTED post `);

    try {
      // const response = await fetch(URL(query));
      const response = await dummyFetch(query);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { nextPageToken, items } = await response.json();

      store.postMessage(MESSAGE.DATA_LOADED, { nextPageToken, items });

      // console.log(`[SearchForm] MESSAGE.DATA_LOADED post `);

      this.$youtubeSearchFormInput.value = "";
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
