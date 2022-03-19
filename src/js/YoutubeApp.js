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
    this.savedVideoList = document.querySelector(".saved-video-list");

    this.videoStorage = new VideoStorage();
    this.videoStorageView = new VideoStorageView();
    this.searchModalView = new SearchModalView();

    this.isWatchedVideoOnly = false;

    this.#bindEvents();
    this.#reloadStorageData();
  }

  #bindEvents() {
    bindEventListener(
      document.querySelector("#watch-later-video-button"),
      "click",
      this.#onClickWatchLaterVideoListButton
    );
    bindEventListener(
      document.querySelector("#watched-video-button"),
      "click",
      this.#onClickWatchedVideoListButton
    );
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
    bindEventListener(this.savedVideoList, "click", this.#onClickWatchedButton);
    bindEventListener(this.savedVideoList, "click", this.#onClickDeleteButton);
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
      this.videoStorageView.renderEmptyStorage();
      return;
    }

    this.videoStorageView.renderSavedVideo(
      this.videoStorage.getStorage(),
      this.isWatchedVideoOnly
    );
  };

  #onClickWatchLaterVideoListButton = () => {
    this.isWatchedVideoOnly = false;
    this.#reloadStorageData();
  };

  #onClickWatchedVideoListButton = () => {
    this.isWatchedVideoOnly = true;
    this.#reloadStorageData();
  };

  #onClickSearchModalButton = () => {
    this.searchModalView.openSearchModal();
  };

  #onClickDimmer = () => {
    this.searchModalView.closeSearchModal();
    this.#reloadStorageData();
  };

  #onClickWatchedButton = ({ target }) => {
    if (!target.matches(".video-item__watched-button")) return;

    const videoData = getTargetVideoData(target, ".video-item");
    this.videoStorage.setVideoStateWatched(videoData.videoId);

    this.videoStorageView.hideElement(target.closest(".video-item"));
  };

  #onClickDeleteButton = ({ target }) => {
    if (!target.matches(".video-item__delete-button")) return;

    const videoData = getTargetVideoData(target, ".video-item");
    this.videoStorage.deleteVideo(videoData.videoId);

    this.videoStorageView.hideElement(target.closest(".video-item"));
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
