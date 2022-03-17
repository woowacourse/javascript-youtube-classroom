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

  clickStoreButton(videoData) {
    videoStorage.storeVideoData(videoData);
    this.mainView.renderAddedVideoData(videoData);
  }

  async clickSearchButton(searchInput) {
    try {
      validator.validateSearchInput(searchInput);
      this.modalView.resetVideoList();
      this.modalView.appendEmptyList();
      this.modalView.appendVideoItem();
      this.modalView.renderSkeletonUI();
      // const videoListData = await this.getVideoListData(searchInput);
      const videoListData = parseData;
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
      // const videoListData = await this.getVideoListData(searchInput);
      const videoListData = parseData;
      this.modalView.renderVideoList(videoListData);
    } catch (error) {
      alert(error.message);
    }
  }

  async getVideoListData(searchInput) {
    try {
      const rawData = await videoAPI.fetchData(searchInput);
      return videoAPI.parsingVideoData(rawData);
    } catch (error) {
      throw new Error(error);
    }
  }
}
