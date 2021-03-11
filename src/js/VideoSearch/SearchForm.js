import {
  CLASSNAME,
  MESSAGE,
  API_END_POINT,
  LOCAL_STORAGE_KEY,
} from "../constants.js";
import { $c } from "../utils/querySelector.js";
import messenger from "../Messenger.js";

export default class SearchForm {
  constructor() {
    this.query =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.QUERY)) || "";

    this.$youtubeSearchForm = $c(CLASSNAME.YOUTUBE_SEARCH_FORM);
    this.$youtubeSearchFormInput = $c(CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT);

    this.$youtubeSearchForm.addEventListener(
      "submit",
      this.handleFormSubmit.bind(this)
    );

    this.fetchData();
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.query = this.$youtubeSearchFormInput.value;

    localStorage.setItem(LOCAL_STORAGE_KEY.QUERY, JSON.stringify(this.query));

    this.fetchData();
  }

  async fetchData() {
    if (this.query === "") return;

    messenger.deliverMessage(MESSAGE.KEYWORD_SUBMITTED, {
      query: this.query,
    });

    try {
      const response = await fetch(API_END_POINT(this.query));
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error.message);
      }

      const { nextPageToken, items } = body;
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
