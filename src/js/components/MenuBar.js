export default class MenuBar {
  constructor({ openModal }) {
    this.openModal = openModal;
    this.searchModalButton = document.getElementById("search-modal-button");
    this.searchModalButton.addEventListener("click", this.openModal);
  }
}
