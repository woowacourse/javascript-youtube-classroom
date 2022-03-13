import { fetchDataFromKeyword } from "../utils/apiFetch.js";
import { saveLocalStorage, getLocalStorage } from "../utils/localStorage.js";
import { noSearchResultTemplate, makeIframeTemplate, makeSkeletonTemplate } from "../utils/templates.js";
import { NUM } from "../utils/contants.js";

export class SearchModal {
  constructor() {
    this.modalContainer = document.getElementById("modal-container");
    this.searchInputKeyword = document.getElementById("search-input-keyword");
    this.videoList = document.getElementById("video-list");
    this.resultLabel = document.getElementById("result-label");
    this.noResultContainer = document.getElementById("no-result");
    this.searchButton = document.getElementById("search-button");

    this.searchButton.addEventListener("click", this.handleSearchButton);
    this.videoList.addEventListener("click", this.handleVideoItemSave);
    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.renderNextPage();
      }
    });
  }

  show() {
    this.modalContainer.classList.remove("hide");
  }

  handleSearchButton = () => {
    this.initVideoList();
    this.keyword = this.searchInputKeyword.value;
    this.getDataMatchKeyword(this.keyword);
  };

  initVideoList() {
    this.videos = [];
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
      Array.from({ length: NUM.VIDEO_ITEMS_FOR_UNIT }, () => makeSkeletonTemplate).join(""),
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

  handleVideoItemSave = (e) => {
    if (!e.target.classList.contains("video-item__save-button")) {
      return;
    }

    const proviousLocalStorage = getLocalStorage("videoId");
    if (!localStorage.includes(e.target.id) && proviousLocalStorage.length < NUM.MAX_STORAGE_LENGTH) {
      proviousLocalStorage.push(e.target.id);
      e.target.remove();
    }
    saveLocalStorage("videoId", proviousLocalStorage);
  };
}
