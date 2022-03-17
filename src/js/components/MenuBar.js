import { $ } from "../utils/dom";

export default class MenuBar {
  constructor({ handleOpenModal }) {
    this.handleOpenModal = handleOpenModal;
    $(".header-nav__search").addEventListener("click", this.handleOpenModal);
  }
}
