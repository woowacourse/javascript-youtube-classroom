import { $ } from "../../utils/dom.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import SearchManager from "../../manager/SearchManager.js";

export default class SearchModal {
  constructor({ saveVideoManager }) {
    this.searchManager = new SearchManager();
    this.modalContainer = $(".modal");
    $(".search-modal__close-button").addEventListener("click", this.closeModal);
    $(".dimmer").addEventListener("click", this.closeModal);

    new SearchInput({ searchManager: this.searchManager });
    new SearchResult({ searchManager: this.searchManager, saveVideoManager });
  }

  openModal() {
    this.modalContainer.classList.remove("hide");
  }

  closeModal = () => {
    this.modalContainer.classList.add("hide");
  };
}
