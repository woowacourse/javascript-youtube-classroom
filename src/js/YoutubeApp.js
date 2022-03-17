import VideoStorage from "./VideoStorage";
import SearchModalView from "./view/SearchModalView";
import VideoStorageView from "./view/VideoStorageView";
import getSearchResult from "./api/getSearchResult";
import { DELAY_TIME } from "./constants/constants";
import { throttle, checkKeywordValid, isScrollToBottom } from "./utils/utils";
import { bindEventListener, getTargetVideoData } from "./utils/dom";

export default class YoutubeApp {
  constructor() {
    this.videoList = document.querySelector(".video-list");

    this.#bindEvents();
    this.videoStorage = new VideoStorage();
    this.VideoStorageView = new VideoStorageView();
    this.searchModalView = new SearchModalView();

    this.#reloadStorageData();
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

  #reloadStorageData = () => {
    console.log(this.videoStorage.getStorage());
    if (!this.videoStorage.getStorage().length) {
      this.VideoStorageView.renderEmptyStorage();
      return;
    }

    this.VideoStorageView.renderSavedVideo(this.videoStorage.getStorage());
  };

  #onClickSearchModalButton = () => {
    this.searchModalView.openSearchModal();
  };

  #onClickDimmer = () => {
    this.searchModalView.closeSearchModal();
    this.#reloadStorageData();
  };

  #onClickSaveButton = ({ target }) => {
    if (!target.matches(".video-item__save-button")) return;

    const videoData = getTargetVideoData(target, ".video-item");

    try {
      this.videoStorage.addVideoData(videoData);
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

    const responseData = await getSearchResult(this.keyword);
    this.nextPageToken = responseData.nextPageToken;

    if (responseData.items.length === 0) {
      this.searchModalView.renderNoResultPage();
      return;
    }

    this.searchModalView.renderSearchResult(
      responseData,
      this.videoStorage.getVideoIdArray()
    );
  }

  async searchNextPage() {
    this.searchModalView.renderSkeleton();

    const responseData = await getSearchResult(
      this.keyword,
      this.nextPageToken
    );

    this.nextPageToken = responseData.nextPageToken;
    this.searchModalView.renderSearchResult(
      responseData,
      this.videoStorage.getVideoIdArray()
    );
  }
}
