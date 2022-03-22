import {
  BUTTON_SAVED_TEXT,
  ERROR_MESSAGE,
  MAX_SAVE_VIDEO_COUNT,
  MAX_VIDEO_LIST_LENGTH,
  CLASSNAME,
  THROTTLE_TIME_INTERVAL,
} from './constants/contants.js';
import RenderVideo from './renderVideo.js';

import {
  videoTemplate,
  videoNotFoundTemplate,
  totalVideoSkeletonTemplate,
} from './template/videoTemplate.js';
import { selectDom, addEvent, insertHtmlToElement, hideElement } from './utils/handleElement.js';

class RenderSearchVideo extends RenderVideo {
  constructor(searchVideo, saveVideo) {
    super();
    this.searchVideo = searchVideo;
    this.saveVideo = saveVideo;
    this.scrollThrottle = null;
    // Dom 선택
    this.searchModalOutside = selectDom('.dimmer', this.modalContainer);
    this.searchForm = selectDom('#search-form', this.modalContainer);
    this.searchInput = selectDom('#search-input-keyword', this.searchForm);
    this.searchResultSection = selectDom('.search-result', this.modalContainer);
    this.skeletonListContainer = selectDom('.skeleton-list', this.searchResultSection);
    // 이벤트 등록
    addEvent(this.searchModalOutside, 'click', this.#onCloseModal);
    addEvent(this.searchForm, 'submit', this.#onSearchFormSubmit);
    addEvent(this.searchResultSection, 'scroll', this.#onScrollVideoList);
    addEvent(this.videoListContainer, 'click', this.#onSaveButtonClick);
  }

  #onCloseModal = () => {
    hideElement(this.modalContainer);

    if (this.unwatchedTabButton.classList.contains(CLASSNAME.SELECTED_TAB_BUTTON)) {
      this.onTabButtonClick(
        this.unwatchedTabButton,
        this.watchedTabButton,
        this.filterCheckedVideoFromSaveVideoList(false)
      );
    }
  };

  #onSearchFormSubmit = (e) => {
    e.preventDefault();
    this.searchResultSection.scrollTop = 0;

    const searchKeyword = this.searchInput.value.trim();
    if (!!searchKeyword && this.searchVideo.prevSearchKeyword === searchKeyword) {
      return;
    }
    this.searchVideo.initSearchVideo();
    this.videoListContainer.replaceChildren();
    this.#loadVideo(searchKeyword);
  };

  #onScrollVideoList = () => {
    if (
      !this.searchVideo.nextPageToken ||
      Array.from(this.videoListContainer.children).length >= MAX_VIDEO_LIST_LENGTH
    ) {
      return;
    }

    if (!this.scrollThrottle) {
      this.scrollThrottle = setTimeout(() => {
        this.scrollThrottle = null;
        const { scrollHeight, offsetHeight, scrollTop } = this.searchResultSection;
        if (scrollHeight - offsetHeight === scrollTop) {
          this.#loadVideo(this.searchVideo.prevSearchKeyword);
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

  #renderSearchVideo(searchVideo) {
    hideElement(this.skeletonListContainer);

    if (!searchVideo.length) {
      this.videoListContainer.replaceChildren();
      insertHtmlToElement(this.videoListContainer, videoNotFoundTemplate);
      return;
    }

    insertHtmlToElement(
      this.videoListContainer,
      searchVideo
        .map((video) =>
          videoTemplate(
            video,
            this.saveVideo.saveVideoList.some((saveVideo) => saveVideo.videoId === video.id.videoId)
          )
        )
        .join(' '),
      'beforeend'
    );
  }

  #renderVideoSkeleton() {
    hideElement(this.skeletonListContainer, false);
    if (this.skeletonListContainer.children.length > 0) return;

    insertHtmlToElement(this.skeletonListContainer, totalVideoSkeletonTemplate);
  }

  async #loadVideo(searchKeyword) {
    this.#renderVideoSkeleton();
    try {
      this.#renderSearchVideo(await this.searchVideo.handleSearchVideo(searchKeyword));
    } catch (error) {
      this.searchInput.value = '';
      this.searchInput.focus();
      this.videoListContainer.replaceChildren();
      hideElement(this.skeletonListContainer);

      this.searchVideo.initSearchVideo();
      alert(error.message);
    }
  }
}

export default RenderSearchVideo;
