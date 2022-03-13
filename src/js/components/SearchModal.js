import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";

export default class SearchModal {
  constructor({ searchManager }) {
    this.modalContainer = document.getElementById("modal-container");

    new SearchInput({ searchManager });
    new SearchResult({ searchManager });
  }

  show() {
    this.modalContainer.classList.remove("hide");
  }
}
