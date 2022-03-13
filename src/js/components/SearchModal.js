import { fetchDataFromKeyword } from "../utils/apiFetch.js";
import { saveLocalStorage, getLocalStorage } from "../utils/localStorage.js";
import { noSearchResultTemplate, makeIframeTemplate, makeSkeletonTemplate } from "../utils/templates.js";
import { LOCAL_DB, NUM } from "../utils/contants.js";
import { verifySaveId } from "../utils/validation.js";

export default class SearchModal {
  constructor() {
    this.modalContainer = document.getElementById("modal-container");
    this.searchForm = document.getElementById("search-form");
    this.searchInputKeyword = document.getElementById("search-input-keyword");
    this.resultLabel = document.getElementById("result-label");
    this.noResultContainer = document.getElementById("no-result");
    this.videoList = document.getElementById("video-list");

    this.searchForm.addEventListener("submit", this.handleSearch);
    this.videoList.addEventListener("click", this.handleVideoItemSave);

    this.observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.renderNextPage();
      }
    });

    this.videos = [];
  }

  show() {
    this.modalContainer.classList.remove("hide");
  }

  handleSearch = (e) => {
    e.preventDefault();

    this.keyword = this.searchInputKeyword.value;
    if (this.keyword.trim() === "") {
      return;
    }
    this.initView();
    this.getDataMatchKeyword(this.keyword);
  };

  initView() {
    this.videoList.replaceChildren();
    this.noResultContainer.replaceChildren();
  }

  async getDataMatchKeyword(keyword) {
    this.renderSkeleton();
    this.videos = await fetchDataFromKeyword(keyword);
    this.removeSkeleton();

    if (this.videos.items.length === 0) {
      this.renderNoVideosImg();
      return;
    }

    this.renderIframe();
    this.observer.observe(this.videoList.lastElementChild);
  }

  renderNoVideosImg() {
    this.resultLabel.setAttribute("hidden", true);
    this.noResultContainer.insertAdjacentHTML("afterbegin", noSearchResultTemplate);
  }

  renderIframe() {
    this.videoList.insertAdjacentHTML(
      "beforeend",
      this.videos.items.map((video) => makeIframeTemplate(video)).join(""),
    );
  }

  renderSkeleton() {
    this.resultLabel.removeAttribute("hidden");
    this.videoList.insertAdjacentHTML(
      "beforeend",
      Array.from({ length: NUM.VIDEO_ITEMS_UNIT }, () => makeSkeletonTemplate).join(""),
    );
  }

  removeSkeleton() {
    this.skeletonCards = [...document.getElementsByClassName("skeleton")];
    this.skeletonCards.forEach((card) => this.videoList.removeChild(card));
  }

  async renderNextPage() {
    this.videos = await fetchDataFromKeyword(this.keyword, this.videos.nextPageToken);
    this.renderIframe();
    this.observer.observe(this.videoList.lastElementChild);
  }

  handleVideoItemSave = ({ target }) => {
    if (!target.classList.contains("video-item__save-button")) {
      return;
    }

    try {
      const videoIdsArray = getLocalStorage(LOCAL_DB.VIDEO_ID);
      const newVideoId = target.id;
      verifySaveId(videoIdsArray, newVideoId);
      saveLocalStorage(LOCAL_DB.VIDEO_ID, [...videoIdsArray, newVideoId]);
      target.remove();
    } catch ({ message }) {
      alert(message);
    }
  };
}
