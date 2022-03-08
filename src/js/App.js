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

    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', this.searchHandler.bind(this));

    const searchInputKeyword = document.querySelector('#search-input-keyword');
    searchInputKeyword.addEventListener(
      'keypress',
      this.enterKeyHandler.bind(this)
    );
  }

  openModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  }

  closeModalHandler() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.add('hide');
  }

  searchHandler(e) {
    e.preventDefault();
    const searchInputKeyword = document.querySelector('#search-input-keyword');
    const keyword = searchInputKeyword.value;

    if (keyword.trim().length === 0) {
      console.log('empty search keyword');
      return;
    }
    console.log('search keyword:', keyword);
  }

  enterKeyHandler(e) {
    const keycode = e.keyCode;
    const enterKeyCode = 13;
    if (keycode === enterKeyCode) {
      this.searchHandler(e);
    }
  }
}

new App();
