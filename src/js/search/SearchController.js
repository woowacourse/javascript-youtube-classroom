import YOUTUBE_API_KEY from "../config/youtubeAPI.js";
import { API, YOUTUBE_URL } from "../utils/constants.js";
import SearchView from "./SearchView.js";

export default class SearchController {
  constructor() {
    this.searchView = new SearchView();
  }

  searchVideos(keyword) {
    const results = 10;
    new Promise((resolve, reject) => {
      fetch(
        `${YOUTUBE_URL}/${API.GET.SEARCH}?part=snippet&key=${YOUTUBE_API_KEY}&q=${keyword}&maxResults=${results}`
      )
        .then((data) => resolve(data.json()))
        .catch((err) => reject(err));
    })
      .then((data) => console.log(data.items))
      .catch((err) => console.error(err));
  }
}
