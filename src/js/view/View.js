import notFoundImage from "../../assets/images/not_found.png";
import { SNACK_BAR_DELAY_TIME } from "../constants";

import { $, $$, scrollToTop } from "./dom";
import generateTemplate from "./templates";

export default class View {
  #saveVideoContainerVideoList = $(".save-video-container__video-list");
  #saveVideoContainerNoVideoList = $(".save-video-container__no-video-list");
  #snackBarContainer = $(".snack-bar-container");
  #searchResult = $(".search-result");
  #noResult = $(".no-result");
  #videoStorage;

  constructor(videoStorage) {
    this.#videoStorage = videoStorage;
  }

  #renderSaveVideoContainer(renderData, videoList, noVideoList) {
    if (!renderData.length) {
      videoList.classList.add("hide");
      noVideoList.classList.remove("hide");

      return;
    }

    videoList.classList.remove("hide");
    noVideoList.classList.add("hide");

    videoList.innerHTML = renderData
      .map((data) => generateTemplate.saveVideoItem(data))
      .join("");
  }

  renderCheckedVideo() {
    const storage = this.#videoStorage.getVideo();
    const checkedData = storage.filter((data) => data.checked);

    this.#renderSaveVideoContainer(
      checkedData,
      this.#saveVideoContainerVideoList,
      this.#saveVideoContainerNoVideoList
    );
  }

  renderSavedVideo() {
    const storage = this.#videoStorage.getVideo();

    this.#renderSaveVideoContainer(
      storage,
      this.#saveVideoContainerVideoList,
      this.#saveVideoContainerNoVideoList
    );
  }

  renderSkeleton({ element, position, template }) {
    element.insertAdjacentHTML(position, template);
  }

  renderSearchResult({ element, position, template }) {
    this.removeChildElements(element, $$(".skeleton"));
    element.insertAdjacentHTML(position, template);
  }

  renderSnackBar(message) {
    const snackBarTemplate = generateTemplate.snackBar(message);

    this.#snackBarContainer.insertAdjacentHTML("beforeend", snackBarTemplate);

    setTimeout(() => {
      const snackBar = $(".snack-bar-container__snack-bar");
      snackBar.classList.add("hide");
      this.#snackBarContainer.removeChild(snackBar);
    }, SNACK_BAR_DELAY_TIME);
  }

  hideNotFoundImage(videoList) {
    videoList.classList.remove("hide");
    this.#searchResult.classList.remove("search-result--no-result");
    this.#noResult.classList.add("hide");
  }

  showNotFoundImage(videoList) {
    videoList.classList.add("hide");
    this.#searchResult.classList.add("search-result--no-result");
    this.#noResult.classList.remove("hide");

    $(".no-result__image").src = notFoundImage;
  }

  removeChildElements(parentElement, elements) {
    elements.forEach((element) => {
      parentElement.removeChild(element);
    });
  }

  clearModalContainer(videoList) {
    scrollToTop(videoList);
    $$(".video-item").forEach((videoItem) => videoList.removeChild(videoItem));
  }
}
