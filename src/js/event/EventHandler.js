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
    this.mainView.bindModalOpenButton(this.clickModalOpenButton.bind(this));
    this.modalView.bindOnClickSearchButton(this.clickSearchButton.bind(this));
    this.modalView.bindOnClickDimmer(this.clickDimmer.bind(this));
    this.modalView.bindVideoListScroll(this.videoListScroll.bind(this));
    this.modalView.bindVideoListClickStoreButton(this.clickStoreButton.bind(this));
  }

  clickModalOpenButton() {
    this.modalView.showModal();
  }

  clickDimmer() {
    this.modalView.hideModal();
  }

  clickStoreButton(videoId) {
    storageManager.storeVideoId(videoId);
  }

  async clickSearchButton(searchInput) {
    try {
      validator.isValidSearchInput(searchInput);
      this.modalView.resetVideoList();
      this.modalView.appendEmptyList();
      this.modalView.appendVideoItem();
      const videoListData = await this.getVideoListData(searchInput);
      this.modalView.getData(videoListData);
    } catch (error) {
      alert(error.message);
      this.modalView.showNoResult();
    }
  }

  async videoListScroll(searchInput) {
    try {
      const videoListData = await this.getVideoListData(searchInput);
      this.modalView.appendEmptyList();
      this.modalView.appendVideoItem();
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
