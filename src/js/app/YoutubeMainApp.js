import videoStorage from "../videoStorage";
import {
  clearModalContainer,
  getTargetData,
  confirmRemoveVideo,
  $,
} from "../view/dom";

export default class YoutubeMainApp {
  #navSaveVideoButton = $(".nav__save-video-button");
  #modalContainer = $(".modal-container");
  #videoList = $(".video-list");
  #searchInputKeyword = $("#search-input-keyword");
  #navWatchedVideoButton = $(".nav__watched-video-button");
  #saveVideoContainerVideoList = $(".save-video-container__video-list");
  #render;

  constructor(render) {
    this.#render = render;
    this.#render.savedVideo();

    this.#saveVideoContainerVideoList.addEventListener(
      "click",
      this.#onClickDeleteButton
    );
    this.#saveVideoContainerVideoList.addEventListener(
      "click",
      this.#onClickWatchedButton
    );
    this.#navWatchedVideoButton.addEventListener(
      "click",
      this.#onClickWatchedVideoButton
    );
    this.#navSaveVideoButton.addEventListener(
      "click",
      this.#onClickSaveVideoButton
    );
    $("#search-modal-button").addEventListener(
      "click",
      this.#onClickSearchModalButton
    );
  }

  #onClickWatchedVideoButton = ({ target }) => {
    target.classList.add("nav__watched-video-button--focused");
    this.#navSaveVideoButton.classList.remove(
      "nav__save-video-button--focused"
    );

    this.#render.checkedVideo();
  };

  #onClickSaveVideoButton = ({ target }) => {
    target.classList.add("nav__save-video-button--focused");
    this.#navWatchedVideoButton.classList.remove(
      "nav__watched-video-button--focused"
    );

    this.#render.savedVideo();
  };

  #onClickWatchedButton = ({ target }) => {
    if (!target.matches(".video-item__watched-video-button")) return;

    const targetParentElement = target.closest(".save-video-item");

    if (
      target.classList.contains("video-item__watched-video-button--focused")
    ) {
      target.classList.remove("video-item__watched-video-button--focused");
      videoStorage.removeChecked(getTargetData(targetParentElement));

      if (
        this.#navWatchedVideoButton.classList.contains(
          "nav__watched-video-button--focused"
        )
      ) {
        this.#render.checkedVideo();
      }

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

    if (confirmRemoveVideo(targetParentElement)) {
      return;
    }

    videoStorage.removeVideo(getTargetData(targetParentElement));
    targetGrandParentElement.removeChild(targetParentElement);
  };

  #onClickSearchModalButton = () => {
    this.#modalContainer.classList.remove("hide");
    clearModalContainer(this.#videoList);
    this.#searchInputKeyword.focus();
  };
}
