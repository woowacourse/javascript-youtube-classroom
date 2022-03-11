import {
  BUTTON_DISABLED_TEXT,
  ERROR_MESSAGE,
  MAX_SAVE_VIDEO_COUNT,
  MAX_VIDEO_COUNT,
  MAX_VIDEO_LIST_LENGTH,
} from './constants/contants.js';
import SaveVideo from './saveVideo.js';
import SearchVideo from './searchVideo.js';
import {
  videoTemplate,
  videoSkeletonTemplate,
  videoNotFoundTemplate,
} from './template/videoTemplate.js';
import { selectDom, addEvent } from './utils/selectDom.js';

class RenderVideo {
  constructor() {
    this.searchVideo = new SearchVideo();
    this.saveVideo = new SaveVideo();

    this.searchModalButton = selectDom('#search-modal-button');
    this.modalContainer = selectDom('.modal-container');
    this.searchForm = selectDom('#search-form', this.modalContainer);
    this.searchInput = selectDom('#search-input-keyword', this.searchForm);
    this.videoListContainer = selectDom('.video-list', this.modalContainer);
    this.searchResultSection = selectDom('.search-result', this.modalContainer);
    this.addEvents();
  }

  addEvents() {
    addEvent(this.searchModalButton, 'click', this.onSearchModalButtonClick);
    addEvent(this.searchForm, 'submit', this.onSearchFormSubmit);
    addEvent(this.videoListContainer, 'scroll', this.onScrollVideoList);
    addEvent(this.videoListContainer, 'click', this.onSaveButtonClick);
  }

  onScrollVideoList = () => {
    const { scrollHeight, offsetHeight, scrollTop } = this.videoListContainer;
    if (
      scrollHeight - offsetHeight === scrollTop &&
      Array.from(selectDom('.video-list').children).length < MAX_VIDEO_LIST_LENGTH
    ) {
      this.loadVideo();
    }
  };

  onSearchModalButtonClick = () => {
    this.modalContainer.classList.remove('hide');
  };

  onSearchFormSubmit = (e) => {
    e.preventDefault();
    this.videoListContainer.scrollTop = 0;

    if (this.searchVideo.prevSearchKeyword === this.searchInput.value.trim()) {
      return;
    }
    this.videoListContainer.innerHTML = '';
    this.loadVideo();
  };

  onSaveButtonClick = ({ target }) => {
    const isSaveButton = target.classList.contains('video-item__save-button');
    if (isSaveButton && this.saveVideo.saveVideoList.length < MAX_SAVE_VIDEO_COUNT) {
      this.saveVideo.setStorageVideoList(target.closest('li').dataset.videoId);
      target.textContent = BUTTON_DISABLED_TEXT;
      target.disabled = true;
      return;
    }
    if (isSaveButton) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
    }
  };

  renderSearchVideo(searchVideo) {
    if (!searchVideo.length) {
      this.videoListContainer.innerHTML = videoNotFoundTemplate;
      return;
    }

    Array.from(selectDom('.video-list').children).forEach((videoLi) => {
      if (videoLi.className === 'skeleton') {
        videoLi.remove();
      }
    });

    this.videoListContainer.insertAdjacentHTML(
      'beforeend',
      searchVideo
        .map((video) =>
          videoTemplate(video, this.saveVideo.saveVideoList.includes(video.id.videoId))
        )
        .join(' ')
    );
  }

  renderVideoSkeleton() {
    this.videoListContainer.insertAdjacentHTML(
      'beforeend',
      Array.from({ length: MAX_VIDEO_COUNT }, () => videoSkeletonTemplate).join(' ')
    );
  }

  async loadVideo() {
    this.renderVideoSkeleton();
    try {
      await this.searchVideo.handleSearchVideo(this.searchInput.value.trim());
      this.renderSearchVideo(this.searchVideo.searchResults);
    } catch (error) {
      this.searchInput.value = '';
      this.searchInput.focus();
      this.videoListContainer.innerHTML = '';
      return alert(error);
    }
  }
}

export default RenderVideo;
