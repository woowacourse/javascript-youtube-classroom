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
} from './template/videoTemplate.js';
import { selectDom, addEvent } from './utils/handleElement.js';

class RenderVideo {
  constructor() {
    this.searchVideo = new SearchVideo();
    this.saveVideo = new SaveVideo();

    this.navSection = selectDom('.nav');
    this.playlistTabButton = selectDom('#playlist-tab-button', this.navSection);
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
    addEvent(this.savedVideoListContainer, 'click', this.#onCheckAndDeleteButtonClick);
    addEvent(this.modalOutside, 'click', this.#onCloseModal);
    addEvent(this.searchForm, 'submit', this.#onSearchFormSubmit);
    addEvent(this.searchResultSection, 'scroll', this.#onScrollVideoList);
    addEvent(this.videoListContainer, 'click', this.#onSaveButtonClick);

    this.#onTabButtonClick(
      this.playlistTabButton,
      this.watchedTabButton,
      this.saveVideo.saveVideoList.filter((video) => !video.isChecked)
    );
    this.throttle = null;
  }

  #onNavButtonClick = ({ target: { id: targetId } }) => {
    const navClickHandler = {
      [this.playlistTabButton.id]() {
        this.#onTabButtonClick(
          this.playlistTabButton,
          this.watchedTabButton,
          this.saveVideo.saveVideoList.filter((video) => !video.isChecked)
        );
      },
      [this.watchedTabButton.id]() {
        this.#onTabButtonClick(
          this.watchedTabButton,
          this.playlistTabButton,
          this.saveVideo.saveVideoList.filter((video) => video.isChecked)
        );
      },
      [SEARCH_MODAL_BUTTON_ID]() {
        this.modalContainer.classList.remove(CLASSNAME.HIDE_ELEMENT);
      },
    };

    if (Object.keys(navClickHandler).includes(targetId)) {
      navClickHandler[targetId].call(this);
    }
  };

  #onTabButtonClick = (clickedTabButton, anotherTabButton, videoList) => {
    clickedTabButton.classList.add('selected');
    anotherTabButton.classList.remove('selected');

    this.savedVideoListContainer.replaceChildren();
    if (!videoList.length) {
      this.savedVideoListContainer.insertAdjacentHTML('afterbegin', emptyVideoListTemplate);
      return;
    }
    this.savedVideoListContainer.insertAdjacentHTML(
      'afterbegin',
      videoList.map((video) => savedVideoTemplate(video)).join(' ')
    );
  };

  #onCheckAndDeleteButtonClick = ({ target }) => {
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
    }
  };

  #onCloseModal = () => {
    this.modalContainer.classList.add(CLASSNAME.HIDE_ELEMENT);
  };

  #onSearchFormSubmit = (e) => {
    e.preventDefault();
    this.searchResultSection.scrollTop = 0;

    if (this.searchVideo.prevSearchKeyword === this.searchInput.value.trim()) {
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

      if (this.playlistTabButton.classList.contains('selected')) {
        this.#onTabButtonClick(
          this.playlistTabButton,
          this.watchedTabButton,
          this.saveVideo.saveVideoList.filter((video) => !video.isChecked)
        );
      }
      return;
    }
    if (isSaveButton) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
    }
  };

  #renderUpdatedVideoList(targetVideo) {
    targetVideo.remove();
    if (!this.savedVideoListContainer.children.length) {
      this.savedVideoListContainer.insertAdjacentHTML('afterbegin', emptyVideoListTemplate);
    }
  }

  #renderSearchVideo(searchVideo) {
    if (!searchVideo.length) {
      this.videoListContainer.replaceChildren();
      this.videoListContainer.insertAdjacentHTML('afterbegin', videoNotFoundTemplate);
      return;
    }

    this.videoListContainer.insertAdjacentHTML(
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
    this.skeletonListContainer.classList.add(CLASSNAME.HIDE_ELEMENT);
  }

  #renderVideoSkeleton() {
    this.skeletonListContainer.classList.remove(CLASSNAME.HIDE_ELEMENT);
    if (this.skeletonListContainer.children.length > 0) return;

    this.skeletonListContainer.insertAdjacentHTML('afterbegin', totalVideoSkeletonTemplate);
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

      this.searchVideo.initSearchVideo();
      alert(`에러: '${error.message}'. 개발자에게 문의해주세요.`);
    }
  }
}

export default RenderVideo;
