const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

const validateKeyword = (keyword) => {
  if (isEmptyKeyword(keyword)) {
    throw new Error('검색어를 입력해 주세요.');
  }
};

export default class SearchModal {
  constructor(element) {
    this.element = element;
    this.bindEvents();
  }

  bindEvents() {
    const dimmer = this.element.querySelector('.dimmer');
    dimmer.addEventListener('click', this.closeModalHandler.bind(this));

    const searchForm = this.element.querySelector('#search-form');
    searchForm.addEventListener('submit', this.searchHandler.bind(this));
  }

  closeModalHandler() {
    this.element.classList.add('hide');
  }

  async searchHandler(e) {
    e.preventDefault();
    const searchInputKeyword = this.element.querySelector(
      '#search-input-keyword'
    );
    const keyword = searchInputKeyword.value;
    const searchErrorMessage = this.element.querySelector(
      '#search-error-message'
    );

    const URL = 'https://www.googleapis.com/youtube/v3/search?';
    const KEY = 'AIzaSyDw-RH8HlDQGae-opd0hT1-N2pnbIYejO0';
    const option = {
      part: 'snippet',
      maxResults: 10,
      order: 'date',
      key: KEY,
    };

    const stringQuery = (url, options) => {
      const query = Object.entries(options).reduce(
        (acc, [key, value]) => (acc += `${key}=${value}&`),
        url
      );
      return query;
    };

    try {
      validateKeyword(keyword);

      const result = await fetch(stringQuery(URL, option));
      const json = await result.json();

      searchErrorMessage.textContent = '';
    } catch (error) {
      searchErrorMessage.textContent = '검색어를 입력해 주세요.';
    }
  }
}
