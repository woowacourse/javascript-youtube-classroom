import videoAPI from '../videoAPI.js';
import validator from '../utils/validator.js';
import videoStorage from '../videoStorage.js';
import { USER_MESSAGE } from '../utils/constants.js';

export default class EventHandler {
  constructor(mainView, modalView) {
    this.mainView = mainView;
    this.modalView = modalView;
    this.setBindEvents();
  }

  setBindEvents() {
    this.mainView.$modalOpenButton.addEventListener('click', this.clickModalOpenButton.bind(this));
    this.mainView.$watchLaterButton.addEventListener(
      'click',
      this.clickWatchLaterButton.bind(this)
    );
    this.mainView.$watchedButton.addEventListener('click', this.clickWatchedButton.bind(this));
    this.mainView.$storedVideoList.addEventListener('click', this.clickSwitchButton.bind(this));
    this.mainView.$storedVideoList.addEventListener('click', this.clickDeleteButton.bind(this));

    this.modalView.bindOnClickSearchButton(this.clickSearchButton.bind(this));
    this.modalView.bindOnClickDimmer(this.clickDimmer.bind(this));
    this.modalView.bindVideoListScroll(this.videoListScroll.bind(this));
    this.modalView.bindOnClickStoreButton(this.clickStoreButton.bind(this));
  }

  clickWatchLaterButton() {
    this.mainView.renderWatchLaterVideos();
  }

  clickWatchedButton() {
    this.mainView.renderWatchedVideos();
  }

  clickSwitchButton(e) {
    if (e.target.classList.contains('switch-show-type')) {
      const { videoId } = e.target.dataset;
      videoStorage.swtichVideoType(videoId);
      this.mainView.switchRenderingType(e);
    }
  }

  clickDeleteButton(e) {
    if (e.target.classList.contains('delete-button')) {
      if (window.confirm(USER_MESSAGE.WANT_DELETE)) {
        const { videoId } = e.target.dataset;
        videoStorage.deleteVideo(videoId);
        this.mainView.deleteSelectedVideo(e);
      }
    }
  }

  clickModalOpenButton() {
    this.modalView.showModal();
  }

  clickDimmer() {
    this.modalView.hideModal();
  }

  clickStoreButton(videoData) {
    videoStorage.storeVideo(videoData);
    this.mainView.renderAddedVideo(videoData);
    this.mainView.decideRenderEmptyImage();
  }

  async clickSearchButton(searchInput) {
    try {
      validator.validateSearchInput(searchInput);
      this.modalView.resetVideoList();
      this.modalView.appendEmptyList();
      this.modalView.appendVideoItem();
      this.modalView.renderSkeletonUI();
      const videoListData = await videoAPI.getVideoListData(searchInput);
      this.modalView.renderVideoList(videoListData);
    } catch (error) {
      alert(error.message);
      this.modalView.focusSearch();
    }
  }

  async videoListScroll(searchInput) {
    try {
      this.modalView.appendEmptyList();
      this.modalView.appendVideoItem();
      this.modalView.renderSkeletonUI();
      const videoListData = await videoAPI.getVideoListData(searchInput);
      this.modalView.renderVideoList(videoListData);
    } catch (error) {
      alert(error.message);
    }
  }
}
