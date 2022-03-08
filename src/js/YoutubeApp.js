// import getSearchResult from "./api/getSearchResult";

export default class YoutubeApp {
  constructor() {
    this.searchModalButton = document.querySelector("#search-modal-button");
    this.modalContainer = document.querySelector(".modal-container");

    this.bind();
  }

  bind() {
    this.searchModalButton.addEventListener("click", this.displayModal);
  }

  displayModal = (e) => {
    e.preventDefault();
    this.modalContainer.classList.remove("hide");
  };

  // async search(keyword) {
  //   const resultArray = await getSearchResult(keyword);
  //   return resultArray;
  // }
}
