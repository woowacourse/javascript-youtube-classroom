import YOUTUBE_API_KEY from "../config/youtubeAPI.js";
import { API, YOUTUBE_URL } from "../utils/constants.js";
import { fetchGET } from "../utils/fetch.js";
import SearchView from "./SearchView.js";

export default class SearchController {
  constructor() {
    this.searchView = new SearchView();
  }

  searchVideos(keyword) {
    const params = {
      part: "snippet",
      key: YOUTUBE_API_KEY,
      q: keyword,
      maxResults: 10,
    };

    fetchGET(YOUTUBE_URL, API.GET.SEARCH, params)
      .then((data) => {
        console.log(data);
        this.fetchVideos(data.items);
      })
      .catch((err) => console.error(err));
  }

  fetchVideos(items) {
    if (items.length === 0) {
      this.searchView.showNotFoundImg();
    } else {
      console.log("videos!!!!");
    }
  }
}
