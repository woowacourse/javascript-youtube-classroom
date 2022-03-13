export default class SearchInput {
  constructor({ searchManager }) {
    this.searchForm = document.getElementById("search-form");
    this.searchInputKeyword = document.getElementById("search-input-keyword");
    this.searchForm.addEventListener("submit", this.#handleSearch);

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
