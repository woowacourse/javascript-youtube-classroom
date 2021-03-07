import {
  CLASSNAME,
  MESSAGE,
  // API_END_POINT,
  LOCAL_STORAGE_KEY,
} from "../constants.js";
import { $ } from "../utils/querySelector.js";
import deliveryMan from "../deliveryMan.js";
import dummyFetch from "../dummyFetch.js";

export default class SearchForm {
  constructor() {
    this.query =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.QUERY)) || "";
    this.$youtubeSearchForm = $(CLASSNAME.YOUTUBE_SEARCH_FORM);
    this.$youtubeSearchFormInput = $(CLASSNAME.YOUTUBE_SEARCH_FORM_INPUT);

    this.fetchData();

    this.$youtubeSearchForm.addEventListener(
      "submit",
      this.handleFormSubmit.bind(this)
    );
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.query = this.$youtubeSearchFormInput.value;

    localStorage.setItem(LOCAL_STORAGE_KEY.QUERY, JSON.stringify(this.query));

    this.fetchData();
  }

  async fetchData() {
    if (this.query === "") return;

    // console.log(`[SearchForm] MESSAGE.KEYWORD_SUBMITTED post `);

    deliveryMan.deliverMessage(MESSAGE.KEYWORD_SUBMITTED, {
      query: this.query,
    });

    try {
      // const response = await fetch(API_END_POINT(this.query));
      const response = await dummyFetch(this.query);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { nextPageToken, items } = await response.json();

      // console.log(
      //   `[SearchForm] MESSAGE.DATA_LOADED post: `,
      //   nextPageToken,
      //   items
      // );

      deliveryMan.deliverMessage(MESSAGE.DATA_LOADED, {
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
