import { $ } from "../utils/dom";

export default class MenuBar {
  constructor({ handleOpenModal }) {
    this.handleOpenModal = handleOpenModal;
    $(".classroom-nav__button").addEventListener("click", this.handleOpenModal);
  }
}
