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
  videoNoMoreTemplate,
  watchVideoTemplate,
} from './template/videoTemplate.js';
import { selectDom, addEvent } from './utils/selectDom.js';

class RenderVideo {
  constructor(searchVideo, saveVideo) {
    this.searchVideo = searchVideo;
    this.saveVideo = saveVideo;

    this.searchModalButton = selectDom('#search-modal-button');
    this.willWatchSectionButton = selectDom('#will-watch-section-button');
    this.watchedSectionButton = selectDom('#watched-section-button');

    this.renderResultWrap = selectDom('.search-result', this.modalContainer);
    this.willWatchVideoWrap = selectDom('.will-watch-video');
    this.watchedVideoWrap = selectDom('.watched-video');

    this.willWatchVideoList = selectDom('.will-watch-video-list');
    this.noWillWatchVideoText = selectDom('.no-will-watch-video');

    this.modalContainer = selectDom('.modal-container');
    this.searchVideoForm = selectDom('#search-form', this.modalContainer);
    this.searchVideoInput = selectDom('#search-input-keyword', this.searchVideoForm);
    this.renderVideoListWrap = selectDom('.video-list', this.modalContainer);
    this.renderSkeletonWrap = selectDom('.skeleton-list', this.modalContainer);
    this.searchModalBackground = selectDom('.dimmer', this.modalContainer);

    addEvent(this.searchModalButton, 'click', this.onClickVideoSearchModal);
    addEvent(this.willWatchSectionButton, 'click', this.onClickWillWatchSection);
    addEvent(this.watchedSectionButton, 'click', this.onClickWatchedSection);

    addEvent(this.renderResultWrap, 'scroll', this.onScrollVideoList);
    addEvent(this.searchVideoForm, 'submit', this.onSubmitVideoSearch);
    addEvent(this.renderVideoListWrap, 'click', this.onSaveButtonClick);
    addEvent(this.searchModalBackground, 'click', this.onClickDimmer);

    this.renderWillWatchVideo();
  }

  renderWillWatchVideo = async () => {
    const willWatchVideoItems = await this.saveVideo.getSaveVideoList();
    this.willWatchVideoList.insertAdjacentHTML('afterbegin', willWatchVideoItems.map((willWatchVideoItem) => watchVideoTemplate(willWatchVideoItem)).join(' '));

    if (this.willWatchVideoList.children.length !== 0) {
      this.noWillWatchVideoText.classList.add('hide-element');
    }
  };

  onClickWatchedSection = () => {
    this.willWatchVideoWrap.classList.add('hide-element');
    this.watchedVideoWrap.classList.remove('hide-element');
  };

  onClickWillWatchSection = () => {
    this.willWatchVideoWrap.classList.remove('hide-element');
    this.watchedVideoWrap.classList.add('hide-element');
  };

  onClickDimmer = () => {
    this.modalContainer.classList.add('hide');
  };

  onScrollVideoList = () => {
    if (!this.searchVideo.nextPageToken) {
      return;
    }

    const { scrollHeight, offsetHeight, scrollTop } = this.renderResultWrap;
    if (scrollHeight - offsetHeight <= scrollTop) {
      this.renderSearchScreen();
    }
  };

  onClickVideoSearchModal = () => {
    this.modalContainer.classList.remove('hide');
  };

  onSubmitVideoSearch = (e) => {
    e.preventDefault();
    if (this.searchVideo.prevSearchKeyword === this.searchVideoInput.value.trim()) {
      this.renderResultWrap.scrollTop = 0;
      return;
    }

    this.renderVideoListWrap.replaceChildren();
    this.renderSearchScreen();
  };

  onSaveButtonClick = ({ target }) => {
    if (!target.classList.contains('video-item__save-button')) {
      return;
    }

    if (this.saveVideo.saveVideoIdList.length > MAX_SAVE_VIDEO_COUNT) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
      return;
    }

    this.saveVideo.setStorageVideoList(target.closest('li').dataset.videoId);
    target.textContent = ALREADY_SAVED_VIDEO;
    target.disabled = true;
  };

  renderSearchVideo(searchVideo) {
    this.handleSketonUi(this.renderSkeletonWrap, 'hide');

    if (this.renderVideoListWrap.children.length === 0 && !searchVideo.length) {
      this.renderVideoListWrap.insertAdjacentHTML('afterbegin', videoNotFoundTemplate);
      return;
    }

    if (this.renderVideoListWrap.children.length > 0 && !this.searchVideo.nextPageToken) {
      this.renderVideoListWrap.insertAdjacentHTML('beforeend', videoNoMoreTemplate);
      return;
    }

    this.renderVideoListWrap
      .insertAdjacentHTML(
        'beforeend',
        searchVideo
          .map((video) =>
            videoTemplate(video, this.saveVideo.saveVideoIdList.includes(video.id.videoId)))
          .join(' ')
      );
  }

  renderVideoSkeleton() {
    if (this.renderSkeletonWrap.children.length === 0) {
      this.renderResultWrap.scrollTop = 0;
      this.renderSkeletonWrap.insertAdjacentHTML(
        'afterbegin',
        Array.from({ length: GET_VIDEO_COUNT }, () => videoSkeletonTemplate).join(' ')
      );
      return;
    }

    this.handleSketonUi(this.renderSkeletonWrap, 'show');
  }

  async renderSearchScreen() {
    this.renderVideoSkeleton();
    try {
      const searchResults =
        await this.searchVideo.handleSearchVideo(this.searchVideoInput.value.trim());
      this.renderSearchVideo(searchResults);
    } catch (error) {
      this.searchVideoInput.value = '';
      this.searchVideoInput.focus();
      this.renderVideoListWrap.replaceChildren();
      return alert(error);
    }
  }

  handleSketonUi(skeletonWrap, event) {
    skeletonWrap.classList.toggle('hide-element', event === 'hide');
  }
}

export default RenderVideo;