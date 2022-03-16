import { scrollToTop } from "../utils/dom";
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

  clearVideoList() {
    scrollToTop(this.videoList);
    this.videoList.innerHTML = "";
  }

  renderSkeleton() {
    this.videoList.insertAdjacentHTML("beforeend", generateTemplate.skeleton());
  }

  unrenderSkeleton() {
    document.querySelectorAll(".skeleton").forEach((element) => {
      this.videoList.removeChild(element);
    });
  }

  renderNoResultPage() {
    const message = "검색 결과가 없습니다<br />다른 키워드로 검색해보세요";

    this.searchResult.removeChild(this.videoList);
    this.searchResult.classList.add("search-result--no-result");
    this.searchResult.insertAdjacentHTML(
      "beforeend",
      generateTemplate.noResult(notFountImage, message)
    );
  }

  renderSearchResult(responseData, videoStorage) {
    this.unrenderSkeleton();
    const videoItemTemplate = generateTemplate.videoItems(
      responseData.items,
      videoStorage
    );

    this.videoList.insertAdjacentHTML("beforeend", videoItemTemplate);
  }

  hideSaveButton(target) {
    target.classList.add("hide");
  }
}
