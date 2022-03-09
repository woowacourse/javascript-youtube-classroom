import MainView from '../view/MainView.js';
import ModalView from '../view/ModalView.js';

export default class EventHandler {
  constructor() {
    this.mainView = new MainView();
    this.modalView = new ModalView();
    this.setBindOnSearchButtons();
    this.setBindOnClickDimmer();
    this.setBindVideoListScroll();
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

  clickSearchButton() {
    this.modalView.resetVideoList();
    this.modalView.appendEmptyList();
    this.modalView.appendVideoItem();
    this.modalView.getData();
  }

  videoListScroll() {
    this.modalView.videoListScroll();
  }

  // 검색 버튼 누르면 제목으로 API 요청하기

  // 저장 버튼 누르면 저장하기
}
