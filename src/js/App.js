import '../css/index.css';

class App {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    const searchModalButton = document.querySelector('#search-modal-button');

    searchModalButton.addEventListener(
      'click',
      this.openModalHandler.bind(this)
    );

    const dimmer = document.querySelector('.dimmer');
    dimmer.addEventListener('click', this.closeModalHandler.bind(this));
  }

  openModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  }

  closeModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.add('hide');
  }
}

new App();
