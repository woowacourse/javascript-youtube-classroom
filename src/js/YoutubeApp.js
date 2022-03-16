import notFountImage from "../assets/images/not_found.png";
import getSearchResult from "./api/getSearchResult";
import { DELAY_TIME } from "./constants/constants";
import generateTemplate from "./templates";
import videoStorage from "./videoStorage";

import { throttle } from "./utils/utils";
import {
  clearModalContainer,
  removeChildElements,
  render,
  getTotalScrollHeight,
  getCurrentScrollHeight,
  validateInput,
} from "./utils/dom";

export default class YoutubeApp {
  #modalContainer = document.querySelector(".modal-container");
  #searchInputKeyword = document.querySelector("#search-input-keyword");
  #searchResult = document.querySelector(".search-result");
  #videoList = document.querySelector(".video-list");
  #noResult = document.querySelector(".no-result");
  #nextPageToken = "";
  #keyword = "";

  constructor() {
    this.#videoList.addEventListener("click", this.#onClickSaveButton);
    this.#videoList.addEventListener(
      "scroll",
      throttle(this.#onScrollVideoList, DELAY_TIME)
    );
    document
      .querySelector("#search-modal-button")
      .addEventListener("click", this.#onSubmitSearchModalButton);
    document
      .querySelector("#search-button")
      .addEventListener("click", this.#onSubmitSearchButton);
    document
      .querySelector(".dimmer")
      .addEventListener("click", this.#onClickDimmer);
  }

  #onClickDimmer = () => {
    this.#searchInputKeyword.value = "";
    clearModalContainer(this.#videoList);
    this.#modalContainer.classList.add("hide");
  };

  #onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    const { videoId } = target.closest(".video-item").dataset;

    try {
      videoStorage.addVideo(videoId);
    } catch ({ message }) {
      alert(message);
    }

    target.classList.add("hide");
  };

  #onSubmitSearchModalButton = (e) => {
    e.preventDefault();

    this.#modalContainer.classList.remove("hide");
    this.#searchInputKeyword.focus();
  };

  #onSubmitSearchButton = (e) => {
    e.preventDefault();

    this.#videoList.classList.remove("hide");
    this.#searchResult.classList.remove("search-result--no-result");
    this.#noResult.classList.add("hide");

    try {
      validateInput(this.#searchInputKeyword.value);
    } catch ({ message }) {
      alert(message);

      return;
    }

    clearModalContainer(this.#videoList);

    render({
      element: this.#videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    this.#searchKeyword(this.#searchInputKeyword.value);
  };

  #onScrollVideoList = async () => {
    if (
      getTotalScrollHeight(this.#videoList) >
      getCurrentScrollHeight(this.#videoList)
    ) {
      return;
    }

    render({
      element: this.#videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    if (!this.#nextPageToken) {
      removeChildElements(
        this.#videoList,
        document.querySelectorAll(".skeleton")
      );

      return;
    }

    const responseData = await getSearchResult(
      this.#keyword,
      this.#nextPageToken
    );

    this.#nextPageToken = responseData.nextPageToken;

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      videoStorage.getVideo()
    );

    removeChildElements(
      this.#videoList,
      document.querySelectorAll(".skeleton")
    );

    render({
      element: this.#videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  };

  async #searchKeyword(keyword) {
    this.#keyword = keyword;
    const responseData = await getSearchResult(this.#keyword);
    this.#nextPageToken = responseData.nextPageToken;

    // 검색 결과가 없을 경우
    if (responseData.items.length === 0) {
      this.#videoList.classList.add("hide");
      this.#searchResult.classList.add("search-result--no-result");
      this.#noResult.classList.remove("hide");

      document.querySelector(".no-result__image").src = notFountImage;

      return;
    }

    removeChildElements(
      this.#videoList,
      document.querySelectorAll(".skeleton")
    );

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      videoStorage.getVideo()
    );

    render({
      element: this.#videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  }
}
