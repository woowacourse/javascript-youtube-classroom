import { $ } from "../../utils/dom.js";

export default class SearchInput {
  constructor({ searchManager }) {
    this.modalInputContainer = $(".modal-input__container");
    this.modalInputForm = $(".modal-input__form", this.modalInputContainer);
    this.searchInputKeyword = $(".modal-input__keyword", this.modalInputContainer);
    this.modalInputForm.addEventListener("submit", this.#handleSearch);

    this.searchManager = searchManager;
  }

  #handleSearch = (e) => {
    e.preventDefault();

    const { value } = this.searchInputKeyword;
    if (value.trim() === "") {
      return;
    }

    this.searchManager.updateKeyword(value);
  };
}
