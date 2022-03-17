import { $ } from "../utils/dom";

export default class MenuBar {
  constructor({ handleOpenModal }) {
    this.handleOpenModal = handleOpenModal;
    $(".header-nav__button").addEventListener("click", this.handleOpenModal);
  }
}
