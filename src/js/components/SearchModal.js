import { fetchDataFromKeyword } from '../utils/apiFetch.js';

export class SearchModal {
  constructor() {
    this.modalContainer = document.getElementById('modal-container');
    this.searchModalDialog = document.getElementsByClassName('search-modal');
    this.searchModalTitle = document.getElementsByClassName('search-modal-title');
    this.searchInputKeyword = document.getElementById('search-input-keyword');

    this.searchButton = document.getElementById('search-button');
    this.searchButton.addEventListener('click', this.handleSearchButton);

    this.initState();
  }

  initState() {
    this.videos = [];
  }

  show = () => {
    this.modalContainer.classList.remove('hide');
  };

  handleSearchButton = () => {
    this.getDataMatchKeyword(this.searchInputKeyword.value);
  };

  async getDataMatchKeyword(keyword) {
    const data = await fetchDataFromKeyword(keyword);
    console.log(data);
  }
}
