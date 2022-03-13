import MainView from '../view/MainView.js';
import ModalView from '../view/ModalView.js';
import APIManager from '../managers/APIManager.js';
import validator from '../utils/validator.js';
import storageManager from '../managers/storageManager.js';

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
    storageManager.storeVideoId(videoId);
  }

  async onSearchButtonClick(searchInput) {
    try {
      validator.isValidSearchInput(searchInput);
      this.modalView.resetVideoList();
      this.modalView.appendEmptyList();
      this.modalView.appendVideoItem();
      this.modalView.getSkeletonTemplate();
      const videoListData = await this.getVideoListData(searchInput);
      this.modalView.getData(videoListData);
    } catch (error) {
      alert(error.message);
      this.modalView.showNoResult();
    }
  }

  async onvideoListScroll(searchInput) {
    try {
      this.modalView.appendEmptyList();
      this.modalView.appendVideoItem();
      this.modalView.getSkeletonTemplate();
      const videoListData = await this.getVideoListData(searchInput);
      this.modalView.getData(videoListData);
    } catch (error) {
      alert(error.message);
    }
  }

  async getVideoListData(searchInput) {
    try {
      const rawData = await APIManager.fetchData(searchInput);
      return APIManager.parsingVideoData(rawData);
    } catch (err) {
      throw new Error(err);
    }
  }
}
