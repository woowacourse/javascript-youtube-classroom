import generateTemplate from "../templates";
import notFountImage from "../../assets/images/not_found.png";

export default class VideoStorageView {
  constructor() {
    this.savedVideoSection = document.querySelector(".saved-video__section");
    this.savedVideoList = document.querySelector(".saved-video-list");
  }

  renderEmptyStorage = () => {
    const message =
      "저장된 영상이 없습니다<br />나만의 영상을 검색하여 저장해보세요";

    this.savedVideoList.classList.add("hide");
    this.savedVideoSection.insertAdjacentHTML(
      "beforeend",
      generateTemplate.noResult(notFountImage, message)
    );
  };

  renderSavedVideo = (videoData, watchedVideoOnly) => {
    const videoItemTemplate = generateTemplate.savedVideoItems(
      videoData,
      watchedVideoOnly
    );
    const noResultDiv = document.querySelector(".no-result");

    this.#renderNavButtonStateChanged(watchedVideoOnly);

    this.savedVideoList.classList.remove("hide");
    this.savedVideoList.innerHTML = videoItemTemplate;

    if (!noResultDiv) {
      return;
    }

    noResultDiv.classList.add("hide");
  };

  #renderNavButtonStateChanged = (watchedVideoOnly) => {
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

  hideElement = (target) => {
    target.classList.add("hide");
  };
}
