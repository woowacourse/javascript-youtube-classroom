import {
  BUTTON_SAVED_TEXT,
  ERROR_MESSAGE,
  MAX_SAVE_VIDEO_COUNT,
  MAX_VIDEO_LIST_LENGTH,
  SEARCH_MODAL_BUTTON_ID,
  CLASSNAME,
  DELETE_CONFIRM_MESSAGE,
  THROTTLE_TIME_INTERVAL,
} from './constants/contants.js';

import SaveVideo from './saveVideo.js';
import SearchVideo from './searchVideo.js';

import {
  videoTemplate,
  videoNotFoundTemplate,
  savedVideoTemplate,
  emptyVideoListTemplate,
  totalVideoSkeletonTemplate,
  saveButtonTemplate,
} from './template/videoTemplate.js';
import { selectDom, addEvent, insertHtmlToElement, hideElement } from './utils/handleElement.js';

class RenderVideo {
  constructor() {
    this.searchVideo = new SearchVideo();
    this.saveVideo = new SaveVideo();

    this.navSection = selectDom('.nav');
    this.unwatchedTabButton = selectDom('#unwatched-tab-button', this.navSection);
    this.watchedTabButton = selectDom('#watched-tab-button', this.navSection);
    this.savedVideoListContainer = selectDom('.saved-video-list');

    this.modalContainer = selectDom('.modal-container');
    this.modalOutside = selectDom('.dimmer', this.modalContainer);
    this.searchForm = selectDom('#search-form', this.modalContainer);
    this.searchInput = selectDom('#search-input-keyword', this.searchForm);
    this.searchResultSection = selectDom('.search-result', this.modalContainer);
    this.videoListContainer = selectDom('.video-list', this.searchResultSection);
    this.skeletonListContainer = selectDom('.skeleton-list', this.searchResultSection);

    addEvent(this.navSection, 'click', this.#onNavButtonClick);
    addEvent(this.savedVideoListContainer, 'click', this.#onCheckOrDeleteButtonClick);
    addEvent(this.modalOutside, 'click', this.#onCloseModal);
    addEvent(this.searchForm, 'submit', this.#onSearchFormSubmit);
    addEvent(this.searchResultSection, 'scroll', this.#onScrollVideoList);
    addEvent(this.videoListContainer, 'click', this.#onSaveButtonClick);

    this.#onTabButtonClick(
      this.unwatchedTabButton,
      this.watchedTabButton,
      this.#filterCheckedVideoFromSaveVideoList(false)
    );
    this.throttle = null;
  }

  #onNavButtonClick = ({ target: { id: targetId } }) => {
    const navClickHandler = {
      [this.unwatchedTabButton.id]() {
        this.#onTabButtonClick(
          this.unwatchedTabButton,
          this.watchedTabButton,
          this.#filterCheckedVideoFromSaveVideoList(false)
        );
      },
      [this.watchedTabButton.id]() {
        this.#onTabButtonClick(
          this.watchedTabButton,
          this.unwatchedTabButton,
          this.#filterCheckedVideoFromSaveVideoList()
        );
      },
      [SEARCH_MODAL_BUTTON_ID]() {
        hideElement(this.modalContainer, false);
      },
    };

    if (Object.keys(navClickHandler).includes(targetId)) {
      navClickHandler[targetId].call(this);
    }
  };

  #onTabButtonClick = (clickedTabButton, anotherTabButton, videoList) => {
    clickedTabButton.classList.add(CLASSNAME.SELECTED_TAB_BUTTON);
    anotherTabButton.classList.remove(CLASSNAME.SELECTED_TAB_BUTTON);

    this.savedVideoListContainer.replaceChildren();
    if (!videoList.length) {
      insertHtmlToElement(this.savedVideoListContainer, 'afterbegin', emptyVideoListTemplate);
      return;
    }
    insertHtmlToElement(
      this.savedVideoListContainer,
      'afterbegin',
      videoList.map((video) => savedVideoTemplate(video)).join(' ')
    );
  };

  #onCheckOrDeleteButtonClick = ({ target }) => {
    const targetVideo = target.closest('li');
    if (!targetVideo) return;

    if (target.classList.contains(CLASSNAME.VIDEO_CHECK_BUTTON)) {
      this.saveVideo.toggleVideoIsCheckedFromStorage(targetVideo.dataset);
      this.#renderUpdatedVideoList(targetVideo);
      return;
    }

    if (
      target.classList.contains(CLASSNAME.VIDEO_DELETE_BUTTON) &&
      confirm(DELETE_CONFIRM_MESSAGE(targetVideo.dataset.title))
    ) {
      this.saveVideo.removeVideoFromStorage(targetVideo.dataset);
      this.#renderUpdatedVideoList(targetVideo);

      if (!this.videoListContainer.children.length) return;
      const deletedVideoSaveButtonInSearchResult = selectDom(
        `[data-video-id="${targetVideo.dataset.videoId}"] > button`,
        this.videoListContainer
      );
      // eslint-disable-next-line no-unused-expressions
      deletedVideoSaveButtonInSearchResult &&
        deletedVideoSaveButtonInSearchResult.replaceWith(
          new DOMParser().parseFromString(saveButtonTemplate, 'text/html').body.childNodes[0]
        );
    }
  };

  #onCloseModal = () => {
    hideElement(this.modalContainer);

    if (this.unwatchedTabButton.classList.contains(CLASSNAME.SELECTED_TAB_BUTTON)) {
      this.#onTabButtonClick(
        this.unwatchedTabButton,
        this.watchedTabButton,
        this.#filterCheckedVideoFromSaveVideoList(false)
      );
    }
  };

  #onSearchFormSubmit = (e) => {
    e.preventDefault();
    this.searchResultSection.scrollTop = 0;

    if (
      !!this.searchInput.value.trim() &&
      this.searchVideo.prevSearchKeyword === this.searchInput.value.trim()
    ) {
      return;
    }
    this.searchVideo.initSearchVideo();
    this.videoListContainer.replaceChildren();
    this.#loadVideo();
  };

  #onScrollVideoList = () => {
    if (
      !this.searchVideo.nextPageToken ||
      Array.from(this.videoListContainer.children).length >= MAX_VIDEO_LIST_LENGTH
    ) {
      return;
    }

    if (!this.throttle) {
      this.throttle = setTimeout(() => {
        this.throttle = null;
        const { scrollHeight, offsetHeight, scrollTop } = this.searchResultSection;
        if (scrollHeight - offsetHeight === scrollTop) {
          this.#loadVideo();
        }
      }, THROTTLE_TIME_INTERVAL);
    }
  };

  #onSaveButtonClick = ({ target }) => {
    const isSaveButton = target.classList.contains(CLASSNAME.VIDEO_SAVE_BUTTON);
    if (isSaveButton && this.saveVideo.saveVideoList.length < MAX_SAVE_VIDEO_COUNT) {
      this.saveVideo.saveVideoInformationToStorage(target.closest('li').dataset);
      target.textContent = BUTTON_SAVED_TEXT;
      target.disabled = true;
      return;
    }
    if (isSaveButton) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
    }
  };

  #renderUpdatedVideoList(targetVideo) {
    targetVideo.remove();
    if (!this.savedVideoListContainer.children.length) {
      insertHtmlToElement(this.savedVideoListContainer, 'afterbegin', emptyVideoListTemplate);
    }
  }

  #renderSearchVideo(searchVideo) {
    hideElement(this.skeletonListContainer);

    if (!searchVideo.length) {
      this.videoListContainer.replaceChildren();
      insertHtmlToElement(this.videoListContainer, 'afterbegin', videoNotFoundTemplate);
      return;
    }

    insertHtmlToElement(
      this.videoListContainer,
      'beforeend',
      searchVideo
        .map((video) =>
          videoTemplate(
            video,
            this.saveVideo.saveVideoList.some((saveVideo) => saveVideo.videoId === video.id.videoId)
          )
        )
        .join(' ')
    );
  }

  #renderVideoSkeleton() {
    hideElement(this.skeletonListContainer, false);
    if (this.skeletonListContainer.children.length > 0) return;

    insertHtmlToElement(this.skeletonListContainer, 'afterbegin', totalVideoSkeletonTemplate);
  }

  async #loadVideo() {
    this.#renderVideoSkeleton();
    try {
      await this.searchVideo.handleSearchVideo(this.searchInput.value.trim());
      this.#renderSearchVideo(this.searchVideo.searchResults);
    } catch (error) {
      this.searchInput.value = '';
      this.searchInput.focus();
      this.videoListContainer.replaceChildren();
      hideElement(this.skeletonListContainer);

      this.searchVideo.initSearchVideo();
      alert(error.message);
    }
  }

  #filterCheckedVideoFromSaveVideoList(isChecked = true) {
    return isChecked
      ? this.saveVideo.saveVideoList.filter((video) => video.isChecked)
      : this.saveVideo.saveVideoList.filter((video) => !video.isChecked);
  }
}

export default RenderVideo;
