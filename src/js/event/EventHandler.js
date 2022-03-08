import MainView from '../view/MainView.js';
import ModalView from '../view/ModalView.js';

export default class EventHandler {
  constructor() {
    this.mainView = new MainView();
    this.modalView = new ModalView();
    this.setBindOnSearchButtons();
    this.setBindOnClickDimmer();
  }

  setBindOnSearchButtons() {
    this.mainView.bindModalOpenButton(this.clickModalOpenButton.bind(this));
  }

  setBindOnClickDimmer() {
    this.modalView.bindOnClickDimmer(this.clickDimmer.bind(this));
  }

  clickModalOpenButton() {
    this.modalView.showModal();
  }

  clickDimmer() {
    this.modalView.hideModal();
  }

  // 검색 버튼 누르면 제목으로 API 요청하기

  // 저장 버튼 누르면 저장하기
}
