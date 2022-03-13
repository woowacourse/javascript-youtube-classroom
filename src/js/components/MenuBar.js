export default class MenuBar {
  constructor({ handleOpenModal }) {
    this.handleOpenModal = handleOpenModal;
    this.searchModalButton = document.getElementById("search-modal-button");
    this.searchModalButton.addEventListener("click", this.handleOpenModal);
  }
}
