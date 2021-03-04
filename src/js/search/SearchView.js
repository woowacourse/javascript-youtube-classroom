import searchHistory from "../state/searchHistory.js";
import videos from "../state/videos.js";
import getKeywordHistoryTemplate from "../templates/keywordHistoryTemplate.js";
import getVideoClipTemplate from "../templates/videoClipTemplate.js";
import { $, hideElement, showElement } from "../utils/dom.js";
import elements from "../utils/elements.js";

export default class SearchView {
  showNotFoundImg() {
    hideElement(elements.$searchResults);
    showElement(elements.$notFound);
  }

  showSearchResults() {
    hideElement(elements.$notFound);
    showElement(elements.$searchResults);

    if (searchHistory.getPageToken() === "") {
      elements.$searchResults.innerHTML = "";
    }

    elements.$searchResults.appendChild(
      this.appendVideoClips(videos.getRecentVideos())
    );
  }

  appendVideoClips(items) {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.append(getVideoClipTemplate(item)));
    return fragment;
  }

  showKeywordHistory() {
    elements.$keywordHistory.innerHTML = getKeywordHistoryTemplate();
  }

  showSavedVideoCount() {
    console.log(videos.getSavedVideoCount());
    elements.$savedVideoCount.innerText = `저장된 영상 개수: ${videos.getSavedVideoCount()}개`;
  }

  hideSavedVideoButton(videoId) {
    const currentSaveButton = Array.from($("button[data-video-id]")).find(
      ($saveButton) => $saveButton.dataset.videoId === videoId
    );
    hideElement(currentSaveButton);
  }
}
