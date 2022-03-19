import generateTemplate from "../templates";
import notFountImage from "../../assets/images/not_found.png";

export default class VideoStorageView {
  constructor() {
    this.savedVideoSection = document.querySelector(".saved-video__section");
    this.savedVideoList = document.querySelector(".saved-video-list");
    this.noResultDiv = document.querySelector(".no-result");
  }

  renderEmptyStorage = () => {
    this.savedVideoList.classList.add("hide");
    this.noResultDiv.classList.remove("hide");
    document.querySelector(".no-result__image").src = notFountImage;
  };

  renderSavedVideo = (videoData, watchedVideoOnly) => {
    const videoItemTemplate = generateTemplate.savedVideoItems(
      videoData,
      watchedVideoOnly
    );

    this.savedVideoList.classList.remove("hide");
    this.savedVideoList.innerHTML = videoItemTemplate;

    if (!this.noResultDiv) {
      return;
    }

    this.noResultDiv.classList.add("hide");
  };

  renderNavButtonStateChanged = (watchedVideoOnly) => {
    if (watchedVideoOnly) {
      document
        .querySelector("#watch-later-video-button")
        .classList.remove("selected");
      document.querySelector("#watched-video-button").classList.add("selected");
      return;
    }

    document
      .querySelector("#watch-later-video-button")
      .classList.add("selected");
    document
      .querySelector("#watched-video-button")
      .classList.remove("selected");
  };
}
