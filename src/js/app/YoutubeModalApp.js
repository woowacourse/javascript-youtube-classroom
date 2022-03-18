import getSearchResult from "../api/getSearchResult";
import { DELAY_TIME } from "../constants";
import generateTemplate from "../view/templates";
import videoStorage from "../videoStorage";
import { throttle, validateInput } from "../utils";
import {
  clearModalContainer,
  getTotalScrollHeight,
  getCurrentScrollHeight,
  getTargetData,
  $,
  $$,
} from "../view/dom";

export default class YoutubeModalApp {
  #modalContainer = $(".modal-container");
  #videoList = $(".video-list");
  #searchInputKeyword = $("#search-input-keyword");
  #navWatchedVideoButton = $(".nav__watched-video-button");
  #nextPageToken = "";
  #keyword = "";
  #render;

  constructor(render) {
    this.#render = render;
    this.#videoList.addEventListener("click", this.#onClickSaveButton);
    this.#videoList.addEventListener(
      "scroll",
      throttle(this.#onScrollVideoList, DELAY_TIME)
    );
    $("#search-button").addEventListener("click", this.#onSubmitSearchButton);
    $(".dimmer").addEventListener("click", this.#onClickDimmer);
  }

  #onClickDimmer = () => {
    this.#searchInputKeyword.value = "";
    clearModalContainer(this.#videoList);
    this.#modalContainer.classList.add("hide");

    if (
      this.#navWatchedVideoButton.classList.contains(
        "nav__watched-video-button--focused"
      )
    ) {
      this.#render.checkedVideo();
      return;
    }

    this.#render.savedVideo();
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
    this.#render.hideNotFoundImage(this.#videoList);

    try {
      validateInput(this.#searchInputKeyword.value);
    } catch ({ message }) {
      alert(message);

      return;
    }

    clearModalContainer(this.#videoList);

    this.#render.searchResult({
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

    this.#render.searchResult({
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
      this.#render.removeChildElements(this.#videoList, $$(".skeleton"));

      return;
    }

    this.#nextPageToken = responseData.nextPageToken;

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      videoStorage.getVideo()
    );

    this.#render.removeChildElements(this.#videoList, $$(".skeleton"));

    this.#render.searchResult({
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
      this.#render.notFoundImage(this.#videoList);

      return;
    }

    this.#render.removeChildElements(this.#videoList, $$(".skeleton"));

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      videoStorage.getVideo()
    );

    this.#render.searchResult({
      element: this.#videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  }
}
