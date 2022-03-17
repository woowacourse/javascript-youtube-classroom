export default class YoutubeMainApp {
  #modalContainer = document.querySelector(".modal-container");
  #searchInputKeyword = document.querySelector("#search-input-keyword");

  constructor() {
    document
      .querySelector("#search-modal-button")
      .addEventListener("click", this.#onClickSearchModalButton);
  }

  #onClickSearchModalButton = () => {
    this.#modalContainer.classList.remove("hide");
    this.#searchInputKeyword.focus();
  };
}
