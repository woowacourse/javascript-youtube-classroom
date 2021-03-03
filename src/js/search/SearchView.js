import getVideoClipTemplate from "../templates/videoClipTemplate.js";
import { hideElement, showElement } from "../utils/dom.js";
import elements from "../utils/elements.js";

export default class SearchView {
  showNotFoundImg() {
    hideElement(elements.$searchResults);
    showElement(elements.$notFound);
  }

  showSearchResults(items) {
    elements.$searchResults.innerHTML = items
      .map((item) => getVideoClipTemplate(item))
      .join("");
  }
}
