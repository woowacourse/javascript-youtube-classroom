import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import SearchManager from "../../manager/SearchManager.js";

export default class SearchModal {
  constructor() {
    this.searchManager = new SearchManager();
    this.modalContainer = document.querySelector(".modal");

    document.querySelector(".search-modal__close-button").addEventListener("click", this.closeModal);
    document.querySelector(".dimmer").addEventListener("click", this.closeModal);

    new SearchInput({ searchManager: this.searchManager });
    new SearchResult({ searchManager: this.searchManager });
  }

  openModal() {
    this.modalContainer.classList.remove("hide");
  }

  closeModal = () => {
    this.modalContainer.classList.add("hide");
  };
}
