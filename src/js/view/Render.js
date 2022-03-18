import notFoundImage from "../../assets/images/not_found.png";

import videoStorage from "../videoStorage";
import { $ } from "./dom";
import generateTemplate from "./templates";

export default class Render {
  #saveVideoContainerVideoList = $(".save-video-container__video-list");
  #saveVideoContainerNoVideoList = $(".save-video-container__no-video-list");
  #searchResult = $(".search-result");
  #noResult = $(".no-result");

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

  checkedVideo() {
    const storage = videoStorage.getVideo();
    const checkedData = storage.filter((data) => data.checked);

    this.#renderSaveVideoContainer(
      checkedData,
      this.#saveVideoContainerVideoList,
      this.#saveVideoContainerNoVideoList
    );
  }

  savedVideo() {
    const storage = videoStorage.getVideo();

    this.#renderSaveVideoContainer(
      storage,
      this.#saveVideoContainerVideoList,
      this.#saveVideoContainerNoVideoList
    );
  }

  searchResult({ element, position, template }) {
    element.insertAdjacentHTML(position, template);
  }

  hideNotFoundImage(videoList) {
    videoList.classList.remove("hide");
    this.#searchResult.classList.remove("search-result--no-result");
    this.#noResult.classList.add("hide");
  }

  notFoundImage(videoList) {
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
}
