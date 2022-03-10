import { parseData } from '../utils/constants.js';
import MainView from '../view/MainView.js';
import ModalView from '../view/ModalView.js';
import APIManager from '../managers/APIManager.js';
import validator from '../utils/validator.js';

export default class EventHandler {
  constructor() {
    this.mainView = new MainView();
    this.modalView = new ModalView();
    this.setBindOnSearchButtons();
    this.setBindOnClickDimmer();
    this.setBindVideoListScroll();
    this.throttle = null;
  }

  setBindOnSearchButtons() {
    this.mainView.bindModalOpenButton(this.clickModalOpenButton.bind(this));
    this.modalView.bindOnClickSearchButton(this.clickSearchButton.bind(this));
  }

  setBindOnClickDimmer() {
    this.modalView.bindOnClickDimmer(this.clickDimmer.bind(this));
  }

  setBindVideoListScroll() {
    this.modalView.bindVideoListScroll(this.videoListScroll.bind(this));
  }

  clickModalOpenButton() {
    this.modalView.showModal();
  }

  clickDimmer() {
    this.modalView.hideModal();
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
    }
  }

  videoListScroll(searchInput) {
    this.$videoList = document.querySelector('.video-list');
    if (!this.throttle) {
      this.throttle = setTimeout(async () => {
        this.throttle = null;
        if (
          this.$videoList.scrollHeight - this.$videoList.scrollTop <=
          this.$videoList.offsetHeight
        ) {
          this.modalView.appendEmptyList();
          this.modalView.appendVideoItem();
          const videoListData = await this.getVideoListData(searchInput);
          this.modalView.getData(videoListData);
        }
      }, 1000);
    }
  }

  // 유튜브 request하는 메소드
  async getVideoListData(searchInput) {
    try {
      const rawData = await APIManager.fetchData(searchInput);
      return APIManager.parsingVideoData(rawData);
    } catch (err) {
      alert(err.message);
    }
  }
}
