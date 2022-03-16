import { $, $$ } from "../../utils/dom.js";
import { LOCAL_DB, NUM } from "../../utils/contants.js";
import { fetchDataFromKeyword } from "../../utils/api.js";
import { getVideoListTemplate, getSkeletonTemplate, getEmptyResultTemplate } from "../../utils/templates.js";
import { getLocalStorage, saveLocalStorage } from "../../utils/localStorage.js";
import { verifySaveId } from "../../utils/validation.js";

export default class SearchResult {
  constructor({ searchManager }) {
    this.videoList = $(".modal-result__list");
    this.noResultContainer = $(".modal-result__empty");
    this.resultLabel = $(".modal-result__label");
    this.videoList.addEventListener("click", this.#handleVideoItemSave);

    this.searchManager = searchManager;
    this.searchManager.subscribe(this.#initResult);
    this.searchManager.subscribe(this.#getDataMatchKeyword);

    this.observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.#renderNextPage();
      }
    });

    this.videos = [];
  }

  #initResult = () => {
    this.videoList.replaceChildren();
    this.noResultContainer.replaceChildren();
  };

  #getDataMatchKeyword = async () => {
    this.#renderSkeleton();
    this.videos = await fetchDataFromKeyword(this.searchManager.getKeyword());
    this.#removeSkeleton();

    if (this.videos.items.length === 0) {
      this.#renderNoVideosImg();
      return;
    }

    this.#renderVideoList();
    this.observer.observe(this.videoList.lastElementChild);
  };

  #renderNoVideosImg() {
    this.resultLabel.setAttribute("hidden", true);
    this.noResultContainer.insertAdjacentHTML("afterbegin", getEmptyResultTemplate);
  }

  #renderVideoList() {
    this.videoList.insertAdjacentHTML(
      "beforeend",
      this.videos.items.map((video) => getVideoListTemplate(video)).join(""),
    );
  }

  #renderSkeleton() {
    this.resultLabel.removeAttribute("hidden");
    this.videoList.insertAdjacentHTML(
      "beforeend",
      Array.from({ length: NUM.VIDEO_ITEMS_UNIT }, () => getSkeletonTemplate).join(""),
    );
  }

  #removeSkeleton() {
    $$(".skeleton").forEach((card) => this.videoList.removeChild(card));
  }

  async #renderNextPage() {
    if (this.videos.nextPageToken === undefined) {
      return;
    }

    this.videos = await fetchDataFromKeyword(this.searchManager.getKeyword(), this.videos.nextPageToken);
    this.#renderVideoList();
    this.observer.observe(this.videoList.lastElementChild);
  }

  #handleVideoItemSave = ({ target }) => {
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
