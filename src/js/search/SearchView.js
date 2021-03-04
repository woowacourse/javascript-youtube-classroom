import searchHistory from "../state/searchHistory.js";
import getKeywordHistoryTemplate from "../templates/keywordHistoryTemplate.js";
import getVideoClipTemplate from "../templates/videoClipTemplate.js";
import { hideElement, showElement } from "../utils/dom.js";
import elements from "../utils/elements.js";

export default class SearchView {
  showNotFoundImg() {
    hideElement(elements.$searchResults);
    showElement(elements.$notFound);
  }

  showSearchResults(items) {
    hideElement(elements.$notFound);
    showElement(elements.$searchResults);

    if (searchHistory.getPageToken() === "") {
      elements.$searchResults.innerHTML = "";
    }

    elements.$searchResults.appendChild(this.appendVideoClips(items));
  }

  appendVideoClips(items) {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.append(getVideoClipTemplate(item)));
    return fragment;
  }

  showKeywordHistory() {
    elements.$keywordHistory.innerHTML = getKeywordHistoryTemplate();
  }
}
