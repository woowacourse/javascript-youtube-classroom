import { SEARCH_MODAL_BUTTON_ID, CLASSNAME, DELETE_CONFIRM_MESSAGE } from './constants/contants.js';
import RenderVideo from './renderVideo.js';

import { emptyVideoListTemplate, saveButtonTemplate } from './template/videoTemplate.js';
import { selectDom, addEvent, insertHtmlToElement, hideElement } from './utils/handleElement.js';

class RenderSaveVideo extends RenderVideo {
  constructor(saveVideo) {
    super();
    this.saveVideo = saveVideo;

    addEvent(this.navSection, 'click', this.#onNavButtonClick);
    addEvent(this.savedVideoListContainer, 'click', this.#onCheckOrDeleteButtonClick);

    this.onTabButtonClick(
      this.unwatchedTabButton,
      this.watchedTabButton,
      this.filterCheckedVideoFromSaveVideoList(false)
    );
  }

  #onNavButtonClick = ({ target: { id: targetId } }) => {
    const navClickHandler = {
      [this.unwatchedTabButton.id]() {
        this.onTabButtonClick(
          this.unwatchedTabButton,
          this.watchedTabButton,
          this.filterCheckedVideoFromSaveVideoList(false)
        );
      },
      [this.watchedTabButton.id]() {
        this.onTabButtonClick(
          this.watchedTabButton,
          this.unwatchedTabButton,
          this.filterCheckedVideoFromSaveVideoList()
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

  #renderUpdatedVideoList(targetVideo) {
    targetVideo.remove();
    if (!this.savedVideoListContainer.children.length) {
      insertHtmlToElement(this.savedVideoListContainer, emptyVideoListTemplate);
    }
  }
}

export default RenderSaveVideo;
