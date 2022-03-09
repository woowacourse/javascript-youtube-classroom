import getSearchResult from "./api/getSearchResult";
import generatorTemplate from "./templates";
import notFountImage from "../assets/images/not_found.png";

export default class YoutubeApp {
  constructor() {
    this.searchModalButton = document.querySelector("#search-modal-button");
    this.modalContainer = document.querySelector(".modal-container");
    this.searchButton = document.querySelector("#search-button");
    this.searchResult = document.querySelector(".search-result");
    this.videoList = document.querySelector(".video-list");
    this.searchForm = document.querySelector("#search-form");
    this.searchInputKeyword = document.querySelector("#search-input-keyword");

    this.bind();
  }

  bind() {
    this.searchModalButton.addEventListener("click", this.displayModal);
    this.searchButton.addEventListener("click", this.searchMovie);
  }

  // onSubmitSearchModalButton
  displayModal = (e) => {
    e.preventDefault();
    this.modalContainer.classList.remove("hide");
  };

  // onSubmitSearchButton
  searchMovie = (e) => {
    e.preventDefault();
    this.videoList.insertAdjacentHTML(
      "beforeend",
      generatorTemplate.skeleton()
    );
    this.search(this.searchInputKeyword.value);
  };

  async search(keyword) {
    // const resultArray = await getSearchResult(keyword);
    const resultArray = [];

    if (resultArray.length === 0) {
      this.searchResult.removeChild(this.videoList);
      this.searchResult.classList.add("search-result--no-result");
      this.searchResult.insertAdjacentHTML(
        "beforeend",
        generatorTemplate.noResult()
      );

      document.querySelector(".no-result__image").src = notFountImage;
    }

    return resultArray;
  }
}
