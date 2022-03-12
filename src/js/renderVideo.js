import {
  ALREADY_SAVED_VIDEO,
  ERROR_MESSAGE,
  MAX_SAVE_VIDEO_COUNT,
  GET_VIDEO_COUNT,
  GET_VIDEO_MAX_COUNT,
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
      this.videoListContainer.children.length < GET_VIDEO_MAX_COUNT
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

    this.videoListContainer.replaceChildren('');
    this.loadVideo();
  };

  onSaveButtonClick = ({ target }) => {
    const isSaveButton = target.classList.contains('video-item__save-button');

    if (isSaveButton && this.saveVideo.saveVideoList.length < MAX_SAVE_VIDEO_COUNT) {
      this.saveVideo.setStorageVideoList(target.closest('li').dataset.videoId);
      target.textContent = ALREADY_SAVED_VIDEO;
      target.disabled = true;
      return;
    }

    if (isSaveButton) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
    }
  };

  renderSearchVideo(searchVideo) {
    this.handleSketonUi(this.videoListContainer.children, 'add');

    if (!searchVideo.length) {
      this.videoListContainer.insertAdjacentHTML('afterbegin', videoNotFoundTemplate);
      return;
    }

    Array.from(this.videoListContainer.children)
      .find((videoLi) => videoLi.classList.contains('skeleton'))
      .insertAdjacentHTML(
        'beforebegin',
        searchVideo
          .map((video) =>
            videoTemplate(video, this.saveVideo.saveVideoList.includes(video.id.videoId)))
          .join(' ')
      );
  }

  renderVideoSkeleton() {
    if (this.videoListContainer.children.length === 0) {
      this.videoListContainer.insertAdjacentHTML(
        'beforeend',
        Array.from({ length: GET_VIDEO_COUNT }, () => videoSkeletonTemplate).join(' ')
      );
    }

    this.handleSketonUi(this.videoListContainer.children, 'remove');
  }

  async loadVideo() {
    this.renderVideoSkeleton();
    try {
      await this.searchVideo.handleSearchVideo(this.searchInput.value.trim());
      this.renderSearchVideo(this.searchVideo.searchResults);
    } catch (error) {
      this.searchInput.value = '';
      this.searchInput.focus();
      this.videoListContainer.replaceChildren('');
      return alert(error);
    }
  }

  handleSketonUi(videoList, event) {
    Array.from(videoList)
      .filter((videoLi) => videoLi.classList.contains('skeleton'))
      .map((skeletonUi) => (event === 'add' ? skeletonUi.classList.add('hide-skeleton') : skeletonUi.classList.remove('hide-skeleton')));
  }
}

export default RenderVideo;
