import {
  ALREADY_SAVED_VIDEO,
  ERROR_MESSAGE,
  MAX_SAVE_VIDEO_COUNT,
  ARE_YOU_REALLY_DELETE,
  SAVE_VIDEO_TEXT,
} from './constants/contants.js';
import {
  videoTemplate,
  videoNotFoundTemplate,
  videoNoMoreTemplate,
  watchVideoTemplate,
} from './template/videoTemplate.js';
import { selectDom, addEvent } from './utils/selectDom.js';

class RenderVideo {
  constructor(searchVideo, controlVideo) {
    this.searchVideo = searchVideo;
    this.controlVideo = controlVideo;
    this.canScroll = true;

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
      this.controlVideo.setVideoIdListByClickWatchedButton(
        target.closest('li').dataset.videoId,
        target.closest('ul').dataset.video
      );
      target.closest('li').remove();
      this.emptyWillWatchVideo();
    } else if (target.classList.contains('delete-video-button')) {
      if (window.confirm(ARE_YOU_REALLY_DELETE)) {
        this.controlVideo.setVideoIdListByDeleteButton(
          target.closest('li').dataset.videoId,
          target.closest('ul').dataset.video
        );
        target.closest('li').remove();
        this.emptyWatchedVideo();
      }
    }
  };

  renderWillWatchVideo = async () => {
    const willWatchVideoElementIdList = Array.from(
      this.willWatchVideoList.children,
      (willWatchVideo) => willWatchVideo.dataset.videoId
    );
    const willWatchVideoItems =
      await this.searchVideo.getSaveVideoList(this.controlVideo.willWatchVideoIdList);

    this.willWatchVideoList.insertAdjacentHTML(
      'afterbegin',
      willWatchVideoItems.filter(({ id }) => ![...willWatchVideoElementIdList].includes(id))
        .map((willWatchVideoItem) => watchVideoTemplate(willWatchVideoItem))
        .join(' ')
    );

    this.emptyWillWatchVideo();
  };

  renderWatchedVideo = async () => {
    const watchedVideoElementIdList = Array.from(
      this.watchedVideoList.children,
      (watchedVideo) => watchedVideo.dataset.videoId
    );
    const watchedVideoItems =
      await this.searchVideo.getSaveVideoList(this.controlVideo.getStorageWatchedVideoList());

    this.watchedVideoList.insertAdjacentHTML(
      'afterbegin',
      watchedVideoItems.filter(({ id }) => ![...watchedVideoElementIdList].includes(id))
        .map((watchVideoItem) => watchVideoTemplate(watchVideoItem, 'watched'))
        .join(' ')
    );

    this.emptyWatchedVideo();
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

    const videoIdList =
      [...this.controlVideo.willWatchVideoIdList, ...this.controlVideo.watchedVideoIdList];

    this.renderVideoListWrap.insertAdjacentHTML(
      'beforeend',
      searchVideo
        .map((video) =>
          videoTemplate(
            video,
            [...videoIdList].includes(video.id.videoId)
          ))
        .join(' ')
    );

    this.canScroll = true;
  }

  renderVideoSkeleton() {
    this.handleSketonUi(this.renderSkeletonWrap, 'show');
  }

  async renderSearchScreen() {
    this.renderVideoSkeleton();
    try {
      const searchResults = await this.searchVideo.handleSearchVideo(
        this.searchVideoInput.value.trim()
      );
      this.renderSearchVideo(searchResults);
    } catch (error) {
      this.searchVideoInput.value = '';
      this.searchVideoInput.focus();
      this.renderVideoListWrap.replaceChildren();
      this.canScroll = true;
      return alert(error);
    }
  }

  handleSketonUi(skeletonWrap, event) {
    skeletonWrap.classList.toggle('hide-element', event === 'hide');
  }

  emptyWillWatchVideo() {
    this.noWillWatchVideoText.classList.toggle('hide-element', this.willWatchVideoList.children.length !== 0);
  }

  emptyWatchedVideo() {
    this.noWatchedVideoText.classList.toggle('hide-element', this.watchedVideoList.children.length !== 0);
  }

  onClickWatchedSection = () => {
    this.willWatchSectionButton.classList.remove('button-click');
    this.watchedSectionButton.classList.add('button-click');
    this.willWatchVideoWrap.classList.add('hide-element');
    this.watchedVideoWrap.classList.remove('hide-element');

    if (
      Array.from(this.watchedVideoList.children).find(
        (watchedVideo, index) =>
          this.controlVideo.watchedVideoIdList[index] === watchedVideo.dataset.videoId
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
          this.controlVideo.willWatchVideoIdList[index] === willWatchVideo.dataset.videoId
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
    if (scrollHeight - offsetHeight - 180 <= scrollTop && this.canScroll) {
      this.renderSearchScreen();
      this.canScroll = false;
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
      this.controlVideo.willWatchVideoIdList.length + this.controlVideo.watchedVideoIdList.length >
      MAX_SAVE_VIDEO_COUNT
    ) {
      alert(ERROR_MESSAGE.CANNOT_SAVE_VIDEO_ANYMORE);
      return;
    }

    this.controlVideo.addStorageVideoList(target.closest('li').dataset.videoId);
    target.textContent = ALREADY_SAVED_VIDEO;
    target.disabled = true;
  };

  onClickVideoSearchModal = () => {
    this.modalContainer.classList.remove('hide');
    if (this.renderVideoListWrap.children.length > 0) {
      const videoIdList =
        [...this.controlVideo.willWatchVideoIdList, ...this.controlVideo.watchedVideoIdList];
      Array.from(this.renderVideoListWrap.children, (video) =>
        (videoIdList.includes(video.dataset.videoId)
          ? ''
          : this.notDisabledVideo(video)));
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
