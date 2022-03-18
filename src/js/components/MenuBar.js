import { $ } from "../utils/dom.js";

export default class MenuBar {
  constructor({ handleOpenModal, handleWatchState }) {
    this.handleOpenModal = handleOpenModal;
    this.handleWatchState = handleWatchState;
    $(".header-nav").addEventListener("click", this.handleMenu);
  }

  handleMenu = ({ target }) => {
    if (target.classList.contains("header-nav__search")) {
      this.handleOpenModal();
    }
    if (target.classList.contains("header-nav__watching")) {
      this.handleWatchState(false);
    }
    if (target.classList.contains("header-nav__watched")) {
      this.handleWatchState(true);
    }
  };
}
