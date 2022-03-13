import {
  ALREADY_SAVED_VIDEO,
  ERROR_MESSAGE,
  MAX_SAVE_VIDEO_COUNT,
  GET_VIDEO_COUNT,
} from './constants/contants.js';
import {
  videoTemplate,
  videoSkeletonTemplate,
  videoNotFoundTemplate,
} from './template/videoTemplate.js';
import { selectDom, addEvent } from './utils/selectDom.js';

class RenderVideo {
  constructor(searchVideo, saveVideo) {
    this.searchVideo = searchVideo;
    this.saveVideo = saveVideo;

    this.searchModalButton = selectDom('#search-modal-button');
    this.modalContainer = selectDom('.modal-container');
    this.searchVideoForm = selectDom('#search-form', this.modalContainer);
    this.searchVideoInput = selectDom('#search-input-keyword', this.searchVideoForm);
    this.renderVideoListWrap = selectDom('.video-list', this.modalContainer);

    addEvent(this.searchModalButton, 'click', this.onClickVideoSearchModal);
    addEvent(this.searchVideoForm, 'submit', this.onSubmitVideoSearch);
    addEvent(this.renderVideoListWrap, 'scroll', this.onScrollVideoList);
    addEvent(this.renderVideoListWrap, 'click', this.onSaveButtonClick);
  }

  onScrollVideoList = () => {
    const { scrollHeight, offsetHeight, scrollTop } = this.renderVideoListWrap;
    if (scrollHeight - offsetHeight === scrollTop) {
      this.renderSearchScreen();
    }
  };

  onClickVideoSearchModal = () => {
    this.modalContainer.classList.remove('hide');
  };

  onSubmitVideoSearch = (e) => {
    e.preventDefault();
    if (this.searchVideo.prevSearchKeyword === this.searchVideoInput.value.trim()) {
      this.renderVideoListWrap.scrollTop = 0;
      return;
    }

    this.renderVideoListWrap.replaceChildren();
    this.renderSearchScreen();
  };

  onSaveButtonClick = ({ target }) => {
    if (!target.classList.contains('video-item__save-button')) {
      return;
    }

    if (this.saveVideo.saveVideoList.length > MAX_SAVE_VIDEO_COUNT) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
      return;
    }

    this.saveVideo.setStorageVideoList(target.closest('li').dataset.videoId);
    target.textContent = ALREADY_SAVED_VIDEO;
    target.disabled = true;
  };

  renderSearchVideo(searchVideo) {
    this.handleSketonUi(this.renderVideoListWrap.children, 'hide');

    if (!searchVideo.length) {
      this.renderVideoListWrap.insertAdjacentHTML('afterbegin', videoNotFoundTemplate);
      return;
    }

    Array.from(this.renderVideoListWrap.children)
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
    if (this.renderVideoListWrap.children.length === 0) {
      this.renderVideoListWrap.insertAdjacentHTML(
        'beforeend',
        Array.from({ length: GET_VIDEO_COUNT }, () => videoSkeletonTemplate).join(' ')
      );
      return;
    }

    this.handleSketonUi(this.renderVideoListWrap.children, 'show');
  }

  async renderSearchScreen() {
    this.renderVideoSkeleton();
    try {
      const searchResults = await this.searchVideo.handleSearchVideo(this.searchInput.value.trim());
      this.renderSearchVideo(searchResults);
    } catch (error) {
      this.searchVideoInput.value = '';
      this.searchVideoInput.focus();
      this.renderVideoListWrap.replaceChildren();
      return alert(error);
    }
  }

  handleSketonUi(videoList, event) {
    Array.from(videoList)
      .filter((videoLi) => videoLi.classList.contains('skeleton'))
      .map((skeletonUi) => (event === 'hide' ? skeletonUi.classList.add('hide-skeleton') : skeletonUi.classList.remove('hide-skeleton')));
  }
}

export default RenderVideo;
