import videos from "../../state/videos.js";

import getKeywordHistoryTemplate from "../../templates/keywordHistoryTemplate.js";
import { createSearchedClipTemplate } from "../../templates/videoClipTemplate.js";
import getSkeletonUITemplate from "../../templates/skeletonUITemplate.js";

import {
  $,
  getFormElements,
  hideElement,
  showElement,
} from "../../utils/dom.js";
import { DOM_CONSTANTS, ERROR_MESSAGE, VIDEOS } from "../../utils/constants.js";
import elements from "../../utils/elements.js";
import { showSnackbar } from "../../utils/snackbar.js";

export default class SearchView {
  resetSearchResults() {
    elements.$searchResultsInner.innerHTML = "";
    hideElement(elements.$searchResults);
    hideElement(elements.$notFound);
  }

  resetSearchInput() {
    elements.$searchForm.elements[DOM_CONSTANTS.NAME.SEARCH_KEYWORD].value = "";
  }

  showNotFoundImg() {
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
    items.forEach((item) => fragment.append(createSearchedClipTemplate(item)));
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
    try {
      const selectedTarget = Array.from(
        $(`${DOM_CONSTANTS.ELEMENT.BUTTON}[${DOM_CONSTANTS.DATASET.VIDEO_ID}]`)
      ).find(
        ($saveButton) =>
          $saveButton.dataset.videoId === videoId &&
          $saveButton.dataset.videoSaved === (isSaved ? "saved" : "")
      );

      if (!selectedTarget) {
        throw new Error(ERROR_MESSAGE.CONNOT_FIND_SAVE_BUTTON_ERROR);
      }

      return selectedTarget;
    } catch (e) {
      console.error(e);
      showSnackbar(ERROR_MESSAGE.INVALID_ACTION_ERROR);
    }
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
    getFormElements(
      elements.$searchForm,
      DOM_CONSTANTS.NAME.SEARCH_KEYWORD
    ).value = searchKeyword;
  }

  addSkeletonUITemplate(repeatNumber) {
    elements.$skeletonUIContainer.insertAdjacentHTML(
      "beforeend",
      getSkeletonUITemplate(repeatNumber)
    );
  }
}
