import { getTargetData, confirmRemoveVideo, $ } from "../view/dom";
import generateTemplate from "../view/templates";

export default class YoutubeMainApp {
  #navSaveVideoButton = $(".nav__save-video-button");
  #modalContainer = $(".modal-container");
  #videoList = $(".video-list");
  #searchInputKeyword = $("#search-input-keyword");
  #navWatchedVideoButton = $(".nav__watched-video-button");
  #saveVideoContainerVideoList = $(".save-video-container__video-list");
  #dimmer = $(".dimmer");
  #videoStorage;
  #view;

  constructor(view, videoStorage) {
    this.#view = view;
    this.#videoStorage = videoStorage;
    this.#view.renderSavedVideo();

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
    this.#dimmer.addEventListener("click", this.#onClickDimmer);
  }

  #onClickDimmer = () => {
    this.#searchInputKeyword.value = "";
    this.#view.clearModalContainer(this.#videoList);
    this.#modalContainer.classList.add("hide");
    window.removeEventListener("keyup", this.#onKeyUpEscape);

    if (
      this.#navWatchedVideoButton.classList.contains(
        "nav__watched-video-button--focused"
      )
    ) {
      this.#view.renderCheckedVideo();
      return;
    }

    this.#view.renderSavedVideo();
  };

  #onClickWatchedVideoButton = ({ target }) => {
    target.classList.add("nav__watched-video-button--focused");
    this.#navSaveVideoButton.classList.remove(
      "nav__save-video-button--focused"
    );

    this.#view.renderCheckedVideo();
  };

  #onClickSaveVideoButton = ({ target }) => {
    target.classList.add("nav__save-video-button--focused");
    this.#navWatchedVideoButton.classList.remove(
      "nav__watched-video-button--focused"
    );

    this.#view.renderSavedVideo();
  };

  #onClickWatchedButton = ({ target }) => {
    if (!target.matches(".video-item__watched-video-button")) return;

    const targetParentElement = target.closest(".save-video-item");

    if (
      target.classList.contains("video-item__watched-video-button--focused")
    ) {
      target.classList.remove("video-item__watched-video-button--focused");
      this.#videoStorage.removeChecked(getTargetData(targetParentElement));

      if (
        this.#navWatchedVideoButton.classList.contains(
          "nav__watched-video-button--focused"
        )
      ) {
        this.#view.renderCheckedVideo();
      }

      return;
    }

    this.#videoStorage.addChecked(getTargetData(targetParentElement));
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

    this.#videoStorage.removeVideo(getTargetData(targetParentElement));
    targetGrandParentElement.removeChild(targetParentElement);
  };

  #onKeyUpEscape = (event) => {
    if (event.key !== "Escape") return;

    this.#onClickDimmer();
  };

  #onClickSearchModalButton = () => {
    this.#modalContainer.classList.remove("hide");
    this.#view.clearModalContainer(this.#videoList);
    this.#searchInputKeyword.focus();
    window.addEventListener("keyup", this.#onKeyUpEscape);
  };
}
