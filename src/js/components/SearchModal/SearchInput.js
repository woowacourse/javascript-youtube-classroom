export default class SearchInput {
  constructor({ searchManager }) {
    this.searchInputKeyword = document.querySelector(".modal-input__keyword");
    document.querySelector(".modal-input__form").addEventListener("submit", this.#handleSearch);

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
