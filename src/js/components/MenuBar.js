import { $ } from "../utils/dom.js";

export default class MenuBar {
  constructor({ handleOpenModal, handleWatchState }) {
    this.header = $(".header");
    this.nav = $(".header-nav", this.header);
    this.nav.addEventListener("click", this.handleMenu);

    this.handleOpenModal = handleOpenModal;
    this.handleWatchState = handleWatchState;
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
