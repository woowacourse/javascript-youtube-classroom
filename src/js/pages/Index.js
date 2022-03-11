export default class Index {
  constructor(element) {
    this.element = element;
    this.configureDOMs();
    this.bindEvents();
  }

  configureDOMs() {
    this.searchModalButton = this.element.querySelector('#search-modal-button');
  }

  bindEvents() {
    this.searchModalButton.addEventListener('click', this.openModalHandler.bind(this));
  }

  openModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  }
}
