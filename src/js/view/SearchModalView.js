import { scrollToTop, insertImageSrc } from "../utils/dom";
import generateTemplate from "../templates";
import notFountImage from "../../assets/images/not_found.png";

export default class SearchModalView {
  constructor() {
    this.modalContainer = document.querySelector(".modal-container");
    this.searchInputKeyword = document.querySelector("#search-input-keyword");
    this.searchResult = document.querySelector(".search-result");
    this.videoList = document.querySelector(".video-list");
  }

  openSearchModal() {
    this.modalContainer.classList.remove("hide");
  }

  closeSearchModal() {
    this.searchInputKeyword.value = "";
    scrollToTop(this.videoList);
    this.videoList.innerHTML = "";
    this.modalContainer.classList.add("hide");
  }

  renderSkeleton() {
    scrollToTop(this.videoList);
    this.videoList.innerHTML = "";
    this.videoList.insertAdjacentHTML("beforeend", generateTemplate.skeleton());
  }

  renderNoResultPage() {
    this.searchResult.removeChild(this.videoList);
    this.searchResult.classList.add("search-result--no-result");
    this.searchResult.insertAdjacentHTML(
      "beforeend",
      generateTemplate.noResult()
    );

    insertImageSrc(document.querySelector(".no-result__image"), notFountImage);
  }

  renderSearchResult(responseData) {
    document.querySelectorAll(".skeleton").forEach((element) => {
      this.videoList.removeChild(element);
    });

    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      this.videoStorage
    );

    this.videoList.insertAdjacentHTML("beforeend", videoItemTemplate);
  }

  hideSaveButton(target) {
    target.classList.add("hide");
  }
}
