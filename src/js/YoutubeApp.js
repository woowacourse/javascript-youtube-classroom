import generateTemplate from "./templates";
import mockObject from "./mockObject";
import getSearchResult from "./api/getSearchResult";
import notFountImage from "../assets/images/not_found.png";
import { DELAY_TIME } from "./constants/constants";
import { throttle } from "./utils/utils";
import {
  addClassList,
  removeClassList,
  bindEventListener,
  findTargetDataset,
  scrollToTop,
  removeAllChildElements,
  removeChildElements,
  render,
  totalScrollHeight,
  currentScrollHeight,
  removeChildElement,
  insertImageSrc,
  inputClear,
  alertMessage,
  validateInput,
} from "./utils/dom";

export default class YoutubeApp {
  constructor(userStorage) {
    this.modalContainer = document.querySelector(".modal-container");
    this.searchInputKeyword = document.querySelector("#search-input-keyword");
    this.searchResult = document.querySelector(".search-result");
    this.videoList = document.querySelector(".video-list");

    this.bindEvents();
    this.userStorage = userStorage;
  }

  bindEvents() {
    bindEventListener(
      document.querySelector("#search-modal-button"),
      "click",
      this.onSubmitSearchModalButton
    );
    bindEventListener(
      document.querySelector("#search-button"),
      "click",
      this.onSubmitSearchButton
    );
    bindEventListener(
      this.videoList,
      "scroll",
      throttle(this.onScrollVideoList, DELAY_TIME)
    );
    bindEventListener(this.videoList, "click", this.onClickSaveButton);
    bindEventListener(
      document.querySelector(".dimmer"),
      "click",
      this.onClickDimmer
    );
  }

  onClickDimmer = () => {
    inputClear(this.searchInputKeyword);
    scrollToTop(this.videoList);
    removeAllChildElements(this.videoList);
    addClassList(this.modalContainer, "hide");
  };

  onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    const { videoId } = findTargetDataset(target, ".video-item");

    try {
      this.userStorage.addStorage(videoId);
    } catch ({ message }) {
      alertMessage(message);
    }

    addClassList(target, "hide");
  };

  onSubmitSearchModalButton = (e) => {
    e.preventDefault();
    removeClassList(this.modalContainer, "hide");
  };

  onSubmitSearchButton = (e) => {
    e.preventDefault();

    try {
      validateInput(this.searchInputKeyword.value);
    } catch ({ message }) {
      alertMessage(message);
      return;
    }

    scrollToTop(this.videoList);
    removeAllChildElements(this.videoList);

    render({
      element: this.videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    this.searchInputKeyword = document.querySelector("#search-input-keyword");
    this.search(this.searchInputKeyword.value);
  };

  onScrollVideoList = async () => {
    if (
      totalScrollHeight(this.videoList) > currentScrollHeight(this.videoList)
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
    // const responseData = {
    //   items: mockObject(),
    // };

    const responseData = await getSearchResult(
      this.keyword,
      this.nextPageToken
    );

    this.nextPageToken = responseData.nextPageToken;

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      this.userStorage
    );

    removeChildElements(this.videoList, document.querySelectorAll(".skeleton"));

    render({
      element: this.videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  };

  async search(keyword) {
    this.keyword = keyword;
    const responseData = await getSearchResult(this.keyword);
    this.nextPageToken = responseData.nextPageToken;

    /**
     * 목 데이터로 검색 결과 대체
     */
    // const responseData = {
    //   items: mockObject(),
    // };

    // 검색 결과가 없을 경우
    if (responseData.items.length === 0) {
      removeChildElement(this.searchResult, this.videoList);
      addClassList(this.searchResult, "search-result--no-result");
      render({
        element: this.searchResult,
        position: "beforeend",
        template: generateTemplate.noResult(),
      });

      insertImageSrc(
        document.querySelector(".no-result__image"),
        notFountImage
      );

      return;
    }

    removeChildElements(this.videoList, document.querySelectorAll(".skeleton"));

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      this.userStorage
    );

    render({
      element: this.videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  }
}
