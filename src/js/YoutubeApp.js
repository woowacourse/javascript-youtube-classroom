import VideoStorage from "./VideoStorage";
import SearchModalView from "./view/SearchModalView";
import mockObject from "./mockObject";
import getSearchResult from "./api/getSearchResult";
import { DELAY_TIME } from "./constants/constants";
import { throttle, checkKeywordValid, isScrollToBottom } from "./utils/utils";
import { bindEventListener, findTargetDataset } from "./utils/dom";

export default class YoutubeApp {
  constructor() {
    this.videoList = document.querySelector(".video-list");

    this.#bindEvents();
    this.searchModalView = new SearchModalView();
    this.videoStorage = new VideoStorage();
  }

  #bindEvents() {
    bindEventListener(
      document.querySelector("#search-modal-button"),
      "click",
      this.#onClickSearchModalButton
    );
    bindEventListener(
      document.querySelector("#search-button"),
      "click",
      this.#onSubmitSearchButton
    );
    bindEventListener(
      this.videoList,
      "scroll",
      throttle(this.#onScrollVideoList, DELAY_TIME)
    );
    bindEventListener(this.videoList, "click", this.#onClickSaveButton);
    bindEventListener(
      document.querySelector(".dimmer"),
      "click",
      this.#onClickDimmer
    );
  }

  #onClickSearchModalButton = () => {
    this.searchModalView.openSearchModal();
  };

  #onClickDimmer = () => {
    this.searchModalView.closeSearchModal();
  };

  #onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    const { videoId } = findTargetDataset(target, ".video-item");

    try {
      this.videoStorage.addVideoData(videoId);
    } catch ({ message }) {
      alert(message);
    }

    this.searchModalView.hideSaveButton(target);
  };

  #onSubmitSearchButton = (e) => {
    e.preventDefault();

    const searchInputKeyword = document.querySelector("#search-input-keyword");
    try {
      checkKeywordValid(searchInputKeyword.value);
    } catch ({ message }) {
      alert(message);
      return;
    }

    this.search(searchInputKeyword.value);
  };

  #onScrollVideoList = async () => {
    if (isScrollToBottom(this.videoList)) {
      return;
    }

    this.searchNextPage();
  };

  async search(keyword) {
    this.searchModalView.clearVideoList();
    this.searchModalView.renderSkeleton();

    this.keyword = keyword;
    /**
     * 목 데이터로 검색 결과 대체
     */
    // const responseData = {
    //   items: mockObject(),
    //   nextPageToken: "ABCDEF",
    // };

    const responseData = await getSearchResult(this.keyword);
    this.nextPageToken = responseData.nextPageToken;

    // 검색 결과가 없을 경우
    if (responseData.items.length === 0) {
      this.searchModalView.renderNoResultPage();
      return;
    }

    this.searchModalView.renderSearchResult(responseData, this.videoStorage);
  }

  async searchNextPage() {
    this.searchModalView.renderSkeleton();

    /**
     * 목 데이터로 검색 결과 대체
     */
    // const responseData = {
    //   items: mockObject(),
    //   nextPageToken: "ABCDEF",
    // };
    const responseData = await getSearchResult(
      this.keyword,
      this.nextPageToken
    );

    this.nextPageToken = responseData.nextPageToken;
    this.searchModalView.renderSearchResult(responseData, this.videoStorage);
  }
}
