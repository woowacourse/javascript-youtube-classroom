// import getSearchResult from "./api/getSearchResult";
import generatorTemplate from "./templates";

export default class YoutubeApp {
  constructor() {
    this.searchModalButton = document.querySelector("#search-modal-button");
    this.modalContainer = document.querySelector(".modal-container");
    this.searchButton = document.querySelector("#search-button");
    this.videoList = document.querySelector(".video-list");

    this.bind();
  }

  bind() {
    this.searchModalButton.addEventListener("click", this.displayModal);
    this.searchButton.addEventListener("click", this.searchMovie);
  }

  displayModal = (e) => {
    e.preventDefault();
    this.modalContainer.classList.remove("hide");
  };

  searchMovie = (e) => {
    e.preventDefault();
    this.videoList.insertAdjacentHTML(
      "beforeend",
      generatorTemplate.skeleton()
    );
  };

  // async search(keyword) {
  //   const resultArray = await getSearchResult(keyword);
  //   return resultArray;
  // }
}
