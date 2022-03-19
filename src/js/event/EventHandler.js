import videoAPI from '../videoAPI.js';
import validator from '../utils/validator.js';
import videoStorage from '../videoStorage.js';
import { parseData } from '../utils/mockData.js';

export default class EventHandler {
  constructor(mainView, modalView) {
    this.mainView = mainView;
    this.modalView = modalView;
    this.setBindEvents();
  }

  setBindEvents() {
    this.mainView.bindModalOpenButton(this.clickModalOpenButton.bind(this));
    this.mainView.bindOnClickWatchLaterButton(this.clickWatchLaterButton.bind(this));
    this.mainView.bindOnClickWatchedButton(this.clickWatchedButton.bind(this));
    this.mainView.bindOnClickSwitchButton(this.clickSwitchButton.bind(this));
    this.mainView.bindOnClickDeleteButton(this.clickDeleteButton.bind(this));

    this.modalView.bindOnClickSearchButton(this.clickSearchButton.bind(this));
    this.modalView.bindOnClickDimmer(this.clickDimmer.bind(this));
    this.modalView.bindVideoListScroll(this.videoListScroll.bind(this));
    this.modalView.bindVideoListClickStoreButton(this.clickStoreButton.bind(this));
  }

  clickWatchLaterButton() {
    this.mainView.renderWatchLaterVideos();
  }

  clickWatchedButton() {
    this.mainView.renderWatchedVideos();
  }

  clickSwitchButton(e) {
    if ([...e.target.classList].includes('switch-show-type')) {
      const videoId = e.target.dataset.videoid;
      videoStorage.switchType(videoId);
      this.mainView.switchRenderingType(e);
    }
  }

  clickDeleteButton(e) {
    if ([...e.target.classList].includes('delete-button')) {
      if (confirm('삭제 하시겠습니까?')) {
        const videoId = e.target.dataset.videoid;
        videoStorage.deleteVideoData(videoId);
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
    videoStorage.storeVideoData(videoData);
    this.mainView.renderAddedVideoData(videoData);
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
      // const videoListData = parseData;
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
      // const videoListData = parseData;
      this.modalView.renderVideoList(videoListData);
    } catch (error) {
      alert(error.message);
    }
  }
}
