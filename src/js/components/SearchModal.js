import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";

export default class SearchModal {
  constructor({ searchManager }) {
    this.modalContainer = document.getElementById("modal-container");
    this.modalCloseButton = document.getElementById("modal-close-button");
    this.modalCloseButton.addEventListener("click", this.close);

    new SearchInput({ searchManager });
    new SearchResult({ searchManager });
  }

  show() {
    this.modalContainer.classList.remove("hide");
  }

  close = () => {
    this.modalContainer.classList.add("hide");
  };
}
