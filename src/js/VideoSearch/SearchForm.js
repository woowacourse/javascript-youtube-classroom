import { CLASSNAME, MESSAGE, LOCAL_STORAGE_KEY } from "../constants.js";
import { $ } from "../utils/querySelector.js";
import messenger from "../Messenger.js";
import { fetchData } from "../utils/API.js";

export default class SearchForm {
  constructor() {
    this.query =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.QUERY)) || "";

    this.$youtubeSearchForm = $(`.${CLASSNAME.YOUTUBE_SEARCH_FORM}`);
    this.$youtubeSearchFormInput = $(`.${CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT}`);

    this.$youtubeSearchForm.addEventListener(
      "submit",
      this.handleFormSubmit.bind(this)
    );

    this.searchKeyword();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.query = this.$youtubeSearchFormInput.value;

    localStorage.setItem(LOCAL_STORAGE_KEY.QUERY, JSON.stringify(this.query));

    this.searchKeyword();
  }

  async searchKeyword() {
    if (this.query === "") return;

    messenger.deliverMessage(MESSAGE.KEYWORD_SUBMITTED, {
      query: this.query,
    });

    try {
      const { nextPageToken, items } = await fetchData(this.query);

      messenger.deliverMessage(MESSAGE.DATA_LOADED, {
        nextPageToken,
        items,
      });

      this.$youtubeSearchFormInput.value = "";
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
