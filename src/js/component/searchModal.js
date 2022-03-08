import youtubeSearchAPI from "../api/YoubeSearchapi.js";
import template from "./templates.js";

class SearchModal {
  constructor() {
    this.$modalContainer = document.querySelector(".modal-container");
    this.$dimmer = document.querySelector(".dimmer");
    this.$searchInputKeyword = document.querySelector("#search-input-keyword");
    this.$searchButton = document.querySelector("#search-button");
    this.$videoListContainer = document.querySelector(".video-list");
    this.pageToken = null;
    this.bindEvent();
  }

  toggleModalContainerView() {
    this.$modalContainer.classList.toggle("hide");
  }

  bindEvent() {
    this.$searchInputKeyword.addEventListener(
      "keypress",
      this.searchVideo.bind(this)
    );
    this.$searchButton.addEventListener("click", this.searchVideo.bind(this));
  }

  searchVideo(event) {
    if (
      (event.type === "keypress" && event.key === "Enter") ||
      event.type === "click"
    ) {
      this.$videoListContainer.replaceChildren();
      this.pageToken = null;
      this.$searchInputKeyword.blur();
      this.callApi();
    }
  }

  async callApi() {
    const { value } = this.$searchInputKeyword;
    const data = await youtubeSearchAPI.searchByPage(value, this.pageToken);
    this.pageToken = data.nextPageToken;
    data.items.forEach((item) => {
      const {
        id,
        thumbnails: {
          default: { url },
        },
        channelTitle,
        title,
        publishTime,
      } = item.snippet;

      this.$videoListContainer.insertAdjacentHTML(
        "beforeend",
        template.videoItems({
          id,
          publishTime: new Date(publishTime),
          title,
          channelTitle,
          url,
        })
      );
    });
  }
}

export default SearchModal;
