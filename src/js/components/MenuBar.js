import { $ } from "../utils/dom.js";

export default class MenuBar {
  constructor({ handleOpenModal, handleWatchState }) {
    this.header = $(".header");
    this.nav = $(".header-nav", this.header);
    this.navWatching = $(".header-nav__watching", this.nav);
    this.navWatched = $(".header-nav__watched", this.nav);
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
      this.navWatching.classList.add("active");
      this.navWatched.classList.remove("active");
    }
    if (target.classList.contains("header-nav__watched")) {
      this.handleWatchState(true);
      this.navWatched.classList.add("active");
      this.navWatching.classList.remove("active");
    }
  };
}
