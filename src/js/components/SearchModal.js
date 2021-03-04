import { $ } from "../utils/dom.js";

class SearchModal {
  constructor() {
    this.selectDOM();
  }

  selectDOM() {
    this.$target = $(".search-modal");
  }

  showModal() {
    this.$target.classList.add("open");
  }
}

export default SearchModal;
