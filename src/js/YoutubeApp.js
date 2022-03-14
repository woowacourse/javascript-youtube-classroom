import generateTemplate from "./templates";
import mockObject from "./mockObject";
import getSearchResult from "./api/getSearchResult";
import notFountImage from "../assets/images/not_found.png";
import { DELAY_TIME } from "./constants/constants";
import { throttle } from "./utils/utils";
import videoStorage from "./VideoStorage";
import {
  clearModalContainer,
  removeChildElements,
  render,
  getTotalScrollHeight,
  getCurrentScrollHeight,
  validateInput,
} from "./utils/dom";

export default class YoutubeApp {
  constructor() {
    this.modalContainer = document.querySelector(".modal-container");
    this.searchInputKeyword = document.querySelector("#search-input-keyword");
    this.searchResult = document.querySelector(".search-result");
    this.videoList = document.querySelector(".video-list");

    this.videoList.addEventListener("click", this.onClickSaveButton);
    this.videoList.addEventListener(
      "scroll",
      throttle(this.onScrollVideoList, DELAY_TIME)
    );
    document
      .querySelector("#search-modal-button")
      .addEventListener("click", this.onSubmitSearchModalButton);
    document
      .querySelector("#search-button")
      .addEventListener("click", this.onSubmitSearchButton);
    document
      .querySelector(".dimmer")
      .addEventListener("click", this.onClickDimmer);
  }

  onClickDimmer = () => {
    this.searchInputKeyword.value = "";
    clearModalContainer(this.videoList);
    this.modalContainer.classList.add("hide");
  };

  onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    const { videoId } = target.closest(".video-item").dataset;

    try {
      videoStorage.addVideo(videoId);
    } catch ({ message }) {
      alert(message);
    }

    target.classList.add("hide");
  };

  onSubmitSearchModalButton = (e) => {
    e.preventDefault();

    this.modalContainer.classList.remove("hide");
  };

  onSubmitSearchButton = (e) => {
    e.preventDefault();

    try {
      validateInput(this.searchInputKeyword.value);
    } catch ({ message }) {
      alert(message);

      return;
    }

    clearModalContainer(this.videoList);

    render({
      element: this.videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    this.searchKeyword(this.searchInputKeyword.value);
  };

  onScrollVideoList = async () => {
    if (
      getTotalScrollHeight(this.videoList) >
      getCurrentScrollHeight(this.videoList)
    ) {
      return;
    }

    render({
      element: this.videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    /**
     * 목 데이터로 검색 결과 대체
     */
    const responseData = {
      items: mockObject(),
    };

    // const responseData = await getSearchResult(
    //   this.keyword,
    //   this.nextPageToken
    // );

    // this.nextPageToken = responseData.nextPageToken;

    // 만약에 nextPageToken이 없을 경우에는 render 하지 않고... alert?? 메시지 띄워주기?!

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      videoStorage.getVideo()
    );

    removeChildElements(this.videoList, document.querySelectorAll(".skeleton"));

    render({
      element: this.videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  };

  async searchKeyword(keyword) {
    // this.keyword = keyword;
    // const responseData = await getSearchResult(this.keyword);
    // this.nextPageToken = responseData.nextPageToken;

    /**
     * 목 데이터로 검색 결과 대체
     */
    const responseData = {
      items: mockObject(),
    };

    // 검색 결과가 없을 경우
    if (responseData.items.length === 0) {
      this.searchResult.removeChild(this.videoList);
      this.searchResult.classList.add("search-result--no-result");

      render({
        element: this.searchResult,
        position: "beforeend",
        template: generateTemplate.noResult(),
      });

      document.querySelector(".no-result__image").src = notFountImage;

      return;
    }

    removeChildElements(this.videoList, document.querySelectorAll(".skeleton"));

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      videoStorage.getVideo()
    );

    render({
      element: this.videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  }
}
