export default class MenuBar {
  constructor({ handleOpenModal }) {
    this.handleOpenModal = handleOpenModal;
    this.searchModalButton = document.querySelector(".classroom-nav__button");
    this.searchModalButton.addEventListener("click", this.handleOpenModal);
  }
}
