import { $ } from "../utils/dom";

export default class MenuBar {
  constructor({ handleOpenModal, handleWatchState }) {
    this.handleOpenModal = handleOpenModal;
    this.handleWatchState = handleWatchState;
    $(".header-nav__search").addEventListener("click", this.handleOpenModal);
    $(".header-nav__watched").addEventListener("click", this.handleWatched);
    $(".header-nav__watching").addEventListener("click", this.handleWatching);

    $(".header-nav").addEventListener("click", this.handleMenu);
  }

  handleWatched = () => {
    this.handleWatchState(true);
  };

  handleWatching = () => {
    this.handleWatchState(false);
  };
}
