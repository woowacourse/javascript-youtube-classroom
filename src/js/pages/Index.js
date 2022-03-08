export default class Index {
  constructor(element) {
    this.element = element;
    this.bindEvents();
  }

  bindEvents() {
    const searchModalButton = this.element.querySelector(
      '#search-modal-button'
    );

    searchModalButton.addEventListener(
      'click',
      this.openModalHandler.bind(this)
    );
  }

  openModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  }
}
