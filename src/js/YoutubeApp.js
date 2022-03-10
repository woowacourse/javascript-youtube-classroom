import getSearchResult from "./api/getSearchResult";
import generateTemplate from "./templates";
import notFountImage from "../assets/images/not_found.png";
import { throttle } from "./utils/utils";
import mockObject from "./mockObject";
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
} from "./utils/dom";

const DELAY_TIME = 300;

export default class YoutubeApp {
  constructor(userLibrary) {
    this.modalContainer = document.querySelector(".modal-container");
    this.searchResult = document.querySelector(".search-result");
    this.videoList = document.querySelector(".video-list");

    this.bindEvents();
    this.userLibrary = userLibrary;
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
    addClassList(this.modalContainer, "hide");
  };

  onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    const { videoId } = findTargetDataset(target, ".video-item");
    this.userLibrary.setData(videoId);
    addClassList(target, "hide");
  };

  onSubmitSearchModalButton = (e) => {
    e.preventDefault();
    removeClassList(this.modalContainer, "hide");
  };

  onSubmitSearchButton = (e) => {
    e.preventDefault();

    scrollToTop(this.videoList);
    removeAllChildElements(this.videoList);

    render({
      element: this.videoList,
      position: "beforeend",
      template: generateTemplate.skeleton(),
    });

    this.search(document.querySelector("#search-input-keyword").value);
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

    const responseData = {
      items: mockObject(),
    };

    // const responseData = await getSearchResult(
    //   this.keyword,
    //   this.nextPageToken
    // );

    // this.nextPageToken = responseData.nextPageToken;

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      this.userLibrary
    );

    removeChildElements(this.videoList, document.querySelectorAll(".skeleton"));

    render({
      element: this.videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  };

  async search(keyword) {
    // this.keyword = keyword;
    // const responseData = await getSearchResult(this.keyword);
    // this.nextPageToken = responseData.nextPageToken;
    const responseData = {
      items: mockObject(),
    };

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
      this.userLibrary
    );

    render({
      element: this.videoList,
      position: "beforeend",
      template: videoItemTemplate,
    });
  }
}
