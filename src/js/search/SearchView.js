import searchHistory from "../state/searchHistory.js";
import videos from "../state/videos.js";

import getKeywordHistoryTemplate from "../templates/keywordHistoryTemplate.js";
import getVideoClipTemplate from "../templates/videoClipTemplate.js";
import getSkeletonUITemplate from "../templates/skeletonUITemplate.js";

import { $, hideElement, showElement } from "../utils/dom.js";
import { VIDEOS } from "../utils/constants.js";
import elements from "../utils/elements.js";

export default class SearchView {
  resetSearchResults() {
    elements.$searchResultsInner.innerHTML = "";
    hideElement(elements.$searchResults);
    hideElement(elements.$notFound);
  }

  showNotFoundImg(pageToken) {
    if (pageToken !== "") {
      return;
    }

    hideElement(elements.$searchResults);
    hideElement(elements.$skeletonSearchResults);
    showElement(elements.$notFound);
  }

  showSearchResults(recentVideos, pageToken) {
    if (pageToken === "") {
      this.resetSearchResults();
    }

    elements.$searchResultsInner.appendChild(
      this.appendVideoClips(recentVideos)
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
    elements.$savedVideoCount.innerText = `
      저장된 영상 개수: ${videos.getSavedVideoCount()} / ${
      VIDEOS.SAVED_VIDEOS_MAX_COUNT
    } 개
    `;
  }

  showSkeletonClip() {
    showElement(elements.$skeletonSearchResults);
  }

  selectSaveButton(videoId, isSaved = false) {
    return Array.from($("button[data-video-id]")).find(
      ($saveButton) =>
        $saveButton.dataset.videoId === videoId &&
        $saveButton.dataset.videoSaved === (isSaved ? "saved" : "")
    );
  }

  showSaveCancelButton(videoId) {
    const currentSaveButton = this.selectSaveButton(videoId);
    const currentSaveCancelButton = this.selectSaveButton(videoId, true);

    hideElement(currentSaveButton);
    showElement(currentSaveCancelButton);
  }

  showSaveButton(videoId) {
    const currentSaveButton = this.selectSaveButton(videoId);
    const currentSaveCancelButton = this.selectSaveButton(videoId, true);

    hideElement(currentSaveCancelButton);
    showElement(currentSaveButton);
  }

  setSearchInputValue(searchKeyword) {
    elements.$searchForm.elements["search-keyword"].value = searchKeyword;
  }

  addSkeletonUITemplate(repeatNumber) {
    elements.$skeletonUIContainer.insertAdjacentHTML(
      "beforeend",
      getSkeletonUITemplate(repeatNumber)
    );
  }
}
