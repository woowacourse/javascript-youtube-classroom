import MainView from '../view/MainView.js';
import ModalView from '../view/ModalView.js';
import validator from '../utils/validator.js';
import searchVideoAPICaller from '../managers/searchVideoAPICaller.js';
import videoStore from '../managers/videoStore.js';
import storeVideoAPICaller from '../managers/storeVideoAPICaller.js';

export default class EventHandler {
  constructor() {
    this.mainView = new MainView();
    this.modalView = new ModalView();
    this.setBindEvents();
  }

  setBindEvents() {
    this.mainView.bindModalOpenButton(this.onModalOpenButtonClick.bind(this));
    this.mainView.bindWillSeeButton(this.onWillSeeButtonClick.bind(this));
    this.mainView.bindSawButton(this.onSawButtonClick.bind(this));

    this.modalView.bindOnClickSearchButton(this.onSearchButtonClick.bind(this));
    this.modalView.bindOnClickDimmer(this.onDimmerClick.bind(this));
    this.modalView.bindVideoListScroll(this.onVideoListScroll.bind(this));
    this.modalView.bindVideoListClickStoreButton(this.onStoreButtonClick.bind(this));
  }

  onModalOpenButtonClick() {
    this.modalView.showModal();
  }

  onDimmerClick() {
    this.modalView.hideModal();
  }

  onStoreButtonClick(videoId) {
    try {
      videoStore.storeVideoWithVideoId(videoId);
    } catch (error) {
      alert(error.message);
    }
  }

  async onSearchButtonClick(inputValue) {
    try {
      validator.checkSearchInput(inputValue);
      this.modalView.resetVideoList();
      this.modalView.showLoadingVideoItems();
      const videoListData = await searchVideoAPICaller.getVideoListData(inputValue);
      this.modalView.updateVideoItems(videoListData);
      this.modalView.controlScrollSearch(!videoListData[0].isLastPage);
    } catch (error) {
      this.modalView.showNoResult();
      alert(error.message);
    }
  }

  async onVideoListScroll(inputValue) {
    try {
      this.modalView.showLoadingVideoItems();
      const videoListData = await searchVideoAPICaller.getVideoListData(inputValue);
      this.modalView.updateVideoItems(videoListData);
      this.modalView.controlScrollSearch(!videoListData[0].isLastPage);
    } catch (error) {
      alert(error.message);
    }
  }

  async onWillSeeButtonClick() {
    const videoList = videoStore.getWillSeeVideoList();
    if (videoList.length === 0) {
      return;
    }
    this.showStoredVideoItems(videoList);
  }

  async onSawButtonClick() {
    const videoList = videoStore.getSawVideoList();
    if (videoList.length === 0) {
      return;
    }
    this.showStoredVideoItems(videoList);
  }

  async showStoredVideoItems(videoList) {
    const videoIdList = videoList.map(video => video.id);
    const renderedVideoIdList = this.mainView.getRenderedVideoIdList();
    console.log(renderedVideoIdList);
    const willRequestVideoIdList = videoIdList.filter(id => !renderedVideoIdList.includes(id));
    console.log(willRequestVideoIdList);
    this.mainView.showSkeletonVideoList(willRequestVideoIdList);
    const videoData = await storeVideoAPICaller.getVideoListData(willRequestVideoIdList);
    console.log(videoData);
    this.mainView.updateVideoItems(videoData);
  }
}
