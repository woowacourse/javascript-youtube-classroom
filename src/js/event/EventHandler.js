import MainView from '../view/MainView.js';
import ModalView from '../view/ModalView.js';
import validator from '../utils/validator.js';
import storageManager from '../managers/storageManager.js';
import videoAPICaller from '../managers/videoAPICaller.js';

export default class EventHandler {
  constructor() {
    this.mainView = new MainView();
    this.modalView = new ModalView();
    this.setBindEvents();
  }

  setBindEvents() {
    this.mainView.bindModalOpenButton(this.onModalOpenButtonClick.bind(this));
    this.modalView.bindOnClickSearchButton(this.onSearchButtonClick.bind(this));
    this.modalView.bindOnClickDimmer(this.onDimmerClick.bind(this));
    this.modalView.bindVideoListScroll(this.onvideoListScroll.bind(this));
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
      storageManager.storeVideoId(videoId);
    } catch (error) {
      alert(error.message);
    }
  }

  async onSearchButtonClick(inputValue) {
    try {
      validator.isValidSearchInput(inputValue);
      this.modalView.resetVideoList();
      this.modalView.showLoadingVideoItems();
      const videoListData = await videoAPICaller.getVideoListData(inputValue);
      this.modalView.updateVideoItems(videoListData);
      this.modalView.controlScrollSearch(!videoListData[0].isLastPage);
    } catch (error) {
      this.modalView.showNoResult();
      alert(error.message);
    }
  }

  async onvideoListScroll(inputValue) {
    try {
      this.modalView.showLoadingVideoItems();
      const videoListData = await videoAPICaller.getVideoListData(inputValue);
      this.modalView.updateVideoItems(videoListData);
      this.modalView.controlScrollSearch(!videoListData[0].isLastPage);
    } catch (error) {
      alert(error.message);
    }
  }
}
