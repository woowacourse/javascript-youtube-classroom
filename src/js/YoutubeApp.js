import notFountImage from "../assets/images/not_found.png";
import getSearchResult from "./api/getSearchResult";
import { DELAY_TIME } from "./constants/constants";
import generateTemplate from "./templates";
import videoStorage from "./VideoStorage";

import { throttle } from "./utils/utils";
import {
  clearModalContainer,
  removeChildElements,
  render,
  getTotalScrollHeight,
  getCurrentScrollHeight,
  validateInput,
  getTargetData,
  renderSaveVideo,
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
    this.#renderSavedVideo();

    this.#videoList.addEventListener("click", this.#onClickSaveButton);
    this.#videoList.addEventListener(
      "scroll",
      throttle(this.#onScrollVideoList, DELAY_TIME)
    );
    document
      .querySelector("#search-modal-button")
      .addEventListener("click", this.#onClickSearchModalButton);
    document
      .querySelector("#search-button")
      .addEventListener("click", this.#onSubmitSearchButton);
    document
      .querySelector(".dimmer")
      .addEventListener("click", this.#onClickDimmer);
    document
      .querySelector(".save-video-container__video-list")
      .addEventListener("click", this.#onClickDeleteButton);
    document
      .querySelector(".save-video-container__video-list")
      .addEventListener("click", this.#onClickWatchedButton);
  }

  #onClickWatchedButton = ({ target }) => {
    if (!target.matches(".video-item__watched-video-button")) return;

    const targetParentElement = target.closest(".save-video-item");

    if (
      target.classList.contains("video-item__watched-video-button--focused")
    ) {
      target.classList.remove("video-item__watched-video-button--focused");
      videoStorage.removeChecked(getTargetData(targetParentElement));

      return;
    }

    videoStorage.addChecked(getTargetData(targetParentElement));
    target.classList.add("video-item__watched-video-button--focused");
  };

  #onClickDeleteButton = ({ target }) => {
    if (!target.matches(".video-item__delete-video-button")) return;

    const targetGrandParentElement = target.closest(
      ".save-video-container__video-list"
    );
    const targetParentElement = target.closest(".save-video-item");

    if (
      !confirm(
        `${targetParentElement
          .querySelector(".video-item__title")
          .textContent.trim()}\n영상을 정말 삭제하시겠습니까?`
      )
    ) {
      return;
    }

    videoStorage.removeVideo(getTargetData(targetParentElement));
    targetGrandParentElement.removeChild(targetParentElement);
  };

  #renderSavedVideo() {
    const saveVideoData = videoStorage.getVideo();

    if (!saveVideoData.length) {
      document
        .querySelector(".save-video-container__no-video-list")
        .classList.remove("hide");

      document
        .querySelector(".save-video-container__video-list")
        .classList.add("hide");

      return;
    }

    document
      .querySelector(".save-video-container__video-list")
      .classList.remove("hide");

    document
      .querySelector(".save-video-container__no-video-list")
      .classList.add("hide");

    renderSaveVideo({
      element: document.querySelector(".save-video-container__video-list"),
      template: saveVideoData
        .map((data) => generateTemplate.saveVideoItem(data))
        .join(""),
    });
  }

  #onClickSearchModalButton = () => {
    this.#modalContainer.classList.remove("hide");
    this.#searchInputKeyword.focus();
  };

  #onClickDimmer = () => {
    this.#searchInputKeyword.value = "";
    clearModalContainer(this.#videoList);
    this.#modalContainer.classList.add("hide");
    this.#renderSavedVideo();
  };

  #onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    try {
      videoStorage.addVideo(getTargetData(target.closest(".video-item")));
    } catch ({ message }) {
      alert(message);
    }

    target.classList.add("hide");
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
        getCurrentScrollHeight(this.#videoList) ||
      !this.#nextPageToken
    ) {
      return;
    }

    render({
      element: this.#videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    const responseData = await getSearchResult(
      this.#keyword,
      this.#nextPageToken
    );

    // 중복된 요청을 보냈을 경우
    if (this.#nextPageToken === responseData.nextPageToken) {
      removeChildElements(
        this.#videoList,
        document.querySelectorAll(".skeleton")
      );

      return;
    }

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
