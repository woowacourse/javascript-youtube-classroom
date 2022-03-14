export default class Main {
  constructor(element) {
    this.element = element;
    this.searchModalButton = this.element.querySelector('#search-modal-button');
    this.searchModalButton.addEventListener('click', this.openModalHandler.bind(this));
  }

  openModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  }
}
