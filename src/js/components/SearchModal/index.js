import { $ } from "../../utils/dom.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import SearchManager from "../../manager/SearchManager.js";

export default class SearchModal {
  constructor({ videoManager }) {
    this.modalContainer = $(".modal");
    this.modalCloseButton = $(".search-modal__close-button", this.modalContainer);
    this.modalCloseButton.addEventListener("click", this.closeModal);
    this.dimmer = $(".dimmer", this.modalContainer);
    this.dimmer.addEventListener("click", this.closeModal);

    this.searchManager = new SearchManager();
    new SearchInput({ searchManager: this.searchManager });
    new SearchResult({ searchManager: this.searchManager, videoManager });
  }

  openModal() {
    this.modalContainer.classList.remove("hide");
  }

  closeModal = () => {
    this.modalContainer.classList.add("hide");
  };
}
