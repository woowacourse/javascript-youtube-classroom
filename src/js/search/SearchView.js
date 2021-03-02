import { hideElement, showElement } from "../utils/dom.js";
import elements from "../utils/elements.js";

export default class SearchView {
  showNotFoundImg() {
    hideElement(elements.$searchResults);
    showElement(elements.$notFound);
  }
}
