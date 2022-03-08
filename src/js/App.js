import '../css/index.css';

const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

const validateKeyword = (keyword) => {
  if (isEmptyKeyword(keyword)) {
    throw new Error('검색어를 입력해 주세요.');
  }
};

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

    const searchForm = document.querySelector('#search-form');
    searchForm.addEventListener('submit', this.searchHandler.bind(this));
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
    const searchErrorMessage = document.querySelector('#search-error-message');

    try {
      validateKeyword(keyword);
      searchErrorMessage.textContent = '';
    } catch (error) {
      searchErrorMessage.textContent = '검색어를 입력해 주세요.';
    }
  }
}

new App();
