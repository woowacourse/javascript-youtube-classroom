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
    if (this.videoStorage.checkTypeVideoEmpty(this.isWatchedVideoOnly)) {
      this.videoStorageView.renderEmptyStorage();
      return;
    }

    this.videoStorageView.renderSavedVideo(
      this.videoStorage.getStorage(),
      this.isWatchedVideoOnly
    );
  };

  #onClickWatchLaterVideoListButton = () => {
    if (!this.isWatchedVideoOnly) {
      return;
    }

    this.isWatchedVideoOnly = false;
    this.videoStorageView.renderNavButtonStateChanged(this.isWatchedVideoOnly);

    this.#reloadStorageData();
  };

  #onClickWatchedVideoListButton = () => {
    if (this.isWatchedVideoOnly) {
      return;
    }

    this.isWatchedVideoOnly = true;
    this.videoStorageView.renderNavButtonStateChanged(this.isWatchedVideoOnly);

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

    this.#reloadStorageData();
  };

  #onClickDeleteButton = ({ target }) => {
    if (!target.matches(".video-item__delete-button")) {
      return;
    }

    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    const videoData = getTargetVideoData(target, ".video-item");
    this.videoStorage.deleteVideo(videoData.videoId);

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

    try {
      const responseData = await getSearchResult(this.keyword);

      if (responseData === null) {
        this.searchModalView.unrenderSkeleton();
        return;
      }

      this.nextPageToken = responseData.nextPageToken;
      if (responseData.items.length === 0) {
        this.searchModalView.renderNoResultPage();
        return;
      }

      this.searchModalView.renderSearchResult(
        responseData,
        this.videoStorage.getVideoIdArray()
      );
    } catch {
      this.searchModalView.unrenderSkeleton();
    }
  }

  async searchNextPage() {
    this.searchModalView.renderSkeleton();

    try {
      const responseData = await getSearchResult(
        this.keyword,
        this.nextPageToken
      );

      if (responseData === null) {
        this.searchModalView.unrenderSkeleton();
        return;
      }

      this.nextPageToken = responseData.nextPageToken;
      this.searchModalView.renderSearchResult(
        responseData,
        this.videoStorage.getVideoIdArray()
      );
    } catch {
      this.searchModalView.unrenderSkeleton();
    }
  }
}
