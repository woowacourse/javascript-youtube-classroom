import { $, $$ } from "../../utils/dom.js";
import { NUM } from "../../utils/contants.js";
import { fetchDataFromKeyword } from "../../utils/api.js";
import { getThumnailTemplate, getSkeletonTemplate, getEmptyResultTemplate } from "../../utils/templates.js";
import { verifySaveId } from "../../utils/validation.js";
import { toastMessage } from "../../utils/common.js";

export default class SearchResult {
  constructor({ searchManager, videoManager }) {
    this.videoList = $(".modal-result__list");
    this.noResultContainer = $(".modal-result__empty");
    this.resultLabel = $(".modal-result__label");
    this.videoList.addEventListener("click", this.#handleVideoItemSave);

    this.searchManager = searchManager;
    this.searchManager.subscribe(this.#initResult);
    this.searchManager.subscribe(this.#getDataMatchKeyword);
    this.videoManager = videoManager;

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

    if (this.videos.errorMessage) {
      toastMessage(this.videos.errorMessage);
      return;
    }

    this.#renderVideoList();
  };

  #renderNoVideosImg() {
    this.resultLabel.setAttribute("hidden", true);
    this.noResultContainer.insertAdjacentHTML("afterbegin", getEmptyResultTemplate);
  }

  #renderVideoList() {
    if (this.videos.items.length === 0) {
      this.#renderNoVideosImg();
      return;
    }

    this.videoList.insertAdjacentHTML(
      "beforeend",
      this.videos.items.map((video) => getThumnailTemplate(video)).join(""),
    );
    this.observer.observe(this.videoList.lastElementChild);
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
  }

  #handleVideoItemSave = ({ target }) => {
    if (!target.classList.contains("video-item__save-button")) {
      return;
    }

    try {
      const savedVideoArray = this.videoManager.getSavedIds();
      const { id, title, channelTitle, date } = target.dataset;
      verifySaveId(savedVideoArray, id);
      this.videoManager.saveVideos({ id, title, channelTitle, date });
      target.remove();
    } catch ({ message }) {
      toastMessage(message);
    }
  };
}
