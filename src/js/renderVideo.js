import ControlVideo from './controlVideo.js';
import {
  ALREADY_SAVED_VIDEO,
  ERROR_MESSAGE,
  MAX_SAVE_VIDEO_COUNT,
  GET_VIDEO_COUNT,
  VIDEO_ID_LIST_KEY,
  ARE_YOU_REALLY_DELETE,
  SAVE_VIDEO_TEXT,
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
  constructor(searchVideo) {
    this.searchVideo = searchVideo;
    this.scrollThrottle = true;

    this.searchModalButton = selectDom('#search-modal-button');
    this.willWatchSectionButton = selectDom('#will-watch-section-button');
    this.watchedSectionButton = selectDom('#watched-section-button');

    this.watchVideoWrap = selectDom('.watch-video-wrap');
    this.modalContainer = selectDom('.modal-container');
    this.searchVideoForm = selectDom('#search-form', this.modalContainer);
    this.searchVideoInput = selectDom('#search-input-keyword', this.searchVideoForm);
    
    this.renderVideoListWrap = selectDom('.video-list', this.modalContainer);
    this.renderSkeletonWrap = selectDom('.skeleton-list', this.modalContainer);
    this.searchModalBackground = selectDom('.dimmer', this.modalContainer);
    this.noSearchResultWrap = selectDom('.search-result-no-result', this.modalContainer);

    this.searchResultWrap = selectDom('.search-result', this.modalContainer);
    this.willWatchVideoWrap = selectDom('.will-watch-video', this.watchVideoWrap);
    this.watchedVideoWrap = selectDom('.watched-video', this.watchVideoWrap);

    this.willWatchVideoList = selectDom('.will-watch-video-list', this.watchVideoWrap);
    this.noWillWatchVideoText = selectDom('.no-will-watch-video', this.watchVideoWrap);
    this.watchedVideoList = selectDom('.watched-video-list', this.watchVideoWrap);
    this.noWatchedVideoText = selectDom('.no-watched-video', this.watchVideoWrap);

    addEvent(this.searchModalButton, 'click', this.onClickVideoSearchModal);
    addEvent(this.willWatchSectionButton, 'click', this.onClickWillWatchSection);
    addEvent(this.watchedSectionButton, 'click', this.onClickWatchedSection);

    addEvent(this.searchResultWrap, 'scroll', this.onScrollVideoList);
    addEvent(this.searchVideoForm, 'submit', this.onSubmitVideoSearch);
    addEvent(this.renderVideoListWrap, 'click', this.onSaveButtonClick);
    addEvent(this.searchModalBackground, 'click', this.onClickDimmer);

    addEvent(this.watchVideoWrap, 'click', this.onClickWillWatchVideoButtons);

    this.renderWillWatchVideo();
  }

  onClickWillWatchVideoButtons = ({ target }) => {
    if (target.classList.contains('watched-video-button')) {
      ControlVideo.setVideoIdListByClickWatchedButton(
        target.closest('li').dataset.videoId,
        target.closest('ul').classList
      );
      target.closest('li').remove();
      this.emptyWatchVideo();
    } else if (target.classList.contains('delete-video-button')) {
      if (window.confirm(ARE_YOU_REALLY_DELETE)) {
        ControlVideo.setVideoIdListByDeleteButton(
          target.closest('li').dataset.videoId,
          target.closest('ul').classList
        );
        target.closest('li').remove();
        this.emptyWatchVideo();
      }
    }
  };

  renderWatchedVideo = async () => {
    const watchedVideoItems = [
      ...(await this.searchVideo.getSaveVideoList(ControlVideo.getStorageWatchedVideoList())),
    ].filter(
      ({ id }) =>
        !Array.from(this.watchedVideoList.children)
          .map((watchedVideo) => watchedVideo.dataset.videoId)
          .includes(id)
    );

    this.watchedVideoList.insertAdjacentHTML(
      'afterbegin',
      watchedVideoItems
        .map((watchVideoItem) => watchVideoTemplate(watchVideoItem, 'watched'))
        .join(' ')
    );

    this.emptyWatchVideo();
  };

  renderSearchVideo(searchVideo) {
    this.handleSketonUi(this.renderSkeletonWrap, 'hide');

    if (this.renderVideoListWrap.children.length === 0 && !searchVideo.length) {
      this.noSearchResultWrap.insertAdjacentHTML('afterbegin', videoNotFoundTemplate);
      return;
    }

    if (this.renderVideoListWrap.children.length > 0 && !this.searchVideo.nextPageToken) {
      this.renderVideoListWrap.insertAdjacentHTML('beforeend', videoNoMoreTemplate);
      return;
    }

    this.renderVideoListWrap.insertAdjacentHTML(
      'beforeend',
      searchVideo
        .map((video) =>
          videoTemplate(
            video,
            [
              ...ControlVideo.getStorageWillWatchVideoList(),
              ...ControlVideo.getStorageWatchedVideoList(),
            ].includes(video.id.videoId)
          ))
        .join(' ')
    );
  }

  renderVideoSkeleton() {
    if (this.renderSkeletonWrap.children.length === 0) {
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

  renderWillWatchVideo = async () => {
    const willWatchVideoItems = [
      ...(await this.searchVideo.getSaveVideoList(ControlVideo.getStorageWillWatchVideoList())),
    ].filter(
      ({ id }) =>
        !Array.from(this.willWatchVideoList.children)
          .map((willWatchVideo) => willWatchVideo.dataset.videoId)
          .includes(id)
    );

    this.willWatchVideoList.insertAdjacentHTML(
      'afterbegin',
      willWatchVideoItems
        .map((willWatchVideoItem) => watchVideoTemplate(willWatchVideoItem))
        .join(' ')
    );

    this.emptyWatchVideo();
  };

  emptyWatchVideo() {
    if (this.willWatchVideoList.children.length !== 0) {
      this.noWillWatchVideoText.classList.add('hide-element');
    } else if (this.willWatchVideoList.children.length === 0) {
      this.noWillWatchVideoText.classList.remove('hide-element');
    }
    if (this.watchedVideoList.children.length !== 0) {
      this.noWatchedVideoText.classList.add('hide-element');
    } else if (this.watchedVideoList.children.length === 0) {
      this.noWatchedVideoText.classList.remove('hide-element');
    }
  }

  onClickWatchedSection = () => {
    this.willWatchSectionButton.classList.remove('button-click');
    this.watchedSectionButton.classList.add('button-click');
    this.willWatchVideoWrap.classList.add('hide-element');
    this.watchedVideoWrap.classList.remove('hide-element');

    if (
      Array.from(this.watchedVideoList.children).find(
        (watchedVideo, index) =>
          ControlVideo.getStorageWatchedVideoList()[index] === watchedVideo.dataset.videoId
      )
    ) {
      return;
    }
    this.renderWatchedVideo();
  };

  onClickWillWatchSection = () => {
    this.willWatchSectionButton.classList.add('button-click');
    this.watchedSectionButton.classList.remove('button-click');
    this.willWatchVideoWrap.classList.remove('hide-element');
    this.watchedVideoWrap.classList.add('hide-element');

    if (
      Array.from(this.willWatchVideoList.children).find(
        (willWatchVideo, index) =>
          ControlVideo.getStorageWillWatchVideoList()[index] === willWatchVideo.dataset.videoId
      )
    ) {
      return;
    }
    this.renderWillWatchVideo();
  };

  onClickDimmer = () => {
    this.modalContainer.classList.add('hide');
    this.renderWillWatchVideo();
  };

  onScrollVideoList = () => {
    if (!this.searchVideo.nextPageToken) {
      return;
    }

    const { scrollHeight, offsetHeight, scrollTop } = this.searchResultWrap;
    if (scrollHeight - offsetHeight - 180 <= scrollTop && this.scrollThrottle) {
      this.renderSearchScreen();
      this.scrollThrottle = false;
      setTimeout(() => {
        this.scrollThrottle = true;
      }, 500);
    }
  };

  onSubmitVideoSearch = (e) => {
    e.preventDefault();
    if (this.searchVideo.prevSearchKeyword === this.searchVideoInput.value.trim()) {
      this.searchResultWrap.scrollTop = 0;
      return;
    }

    this.noSearchResultWrap.replaceChildren();
    this.renderVideoListWrap.replaceChildren();
    this.renderSearchScreen();
    this.searchResultWrap.scrollTop = 0;
  };

  onSaveButtonClick = ({ target }) => {
    if (!target.classList.contains('video-item__save-button')) {
      return;
    }

    if (
      [...ControlVideo.getStorageWillWatchVideoList(), ...ControlVideo.getStorageWatchedVideoList()]
        .length > MAX_SAVE_VIDEO_COUNT
    ) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
      return;
    }

    ControlVideo.addStorageVideoList(
      ControlVideo.getStorageWillWatchVideoList(),
      target.closest('li').dataset.videoId,
      VIDEO_ID_LIST_KEY
    );
    target.textContent = ALREADY_SAVED_VIDEO;
    target.disabled = true;
  };

  onClickVideoSearchModal = () => {
    this.modalContainer.classList.remove('hide');
    if (this.renderVideoListWrap.children.length > 0) {
      Array.from(this.renderVideoListWrap.children)
        .map((video) => ([
          ...ControlVideo.getStorageWillWatchVideoList(),
          ...ControlVideo.getStorageWatchedVideoList(),
        ].includes(video.dataset.videoId) ? '' : this.notDisabledVideo(video)));
    }
  };

  notDisabledVideo(video) {
    const saveButton = selectDom('.video-item__save-button', video);
    if (saveButton.disabled === true) {
      saveButton.textContent = SAVE_VIDEO_TEXT;
      saveButton.disabled = false;
    }
  }
}

export default RenderVideo;
