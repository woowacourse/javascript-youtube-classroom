import MainView from '../view/MainView.js';
import ModalView from '../view/ModalView.js';

export default class EventHandler {
  constructor() {
    this.mainView = new MainView();
    this.modalView = new ModalView();
    this.setBindOnSearchButtons();
  }

  setBindOnSearchButtons() {
    this.mainView.bindModalOpenButton(this.clickModalOpenButton.bind(this));
  }

  clickModalOpenButton() {
    this.modalView.showModal();
  }

  // 검색 버튼 누르면 제목으로 API 요청하기

  // 저장 버튼 누르면 저장하기
}
