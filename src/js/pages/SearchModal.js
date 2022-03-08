const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

const validateKeyword = (keyword) => {
  if (isEmptyKeyword(keyword)) {
    throw new Error('검색어를 입력해 주세요.');
  }
};

const URL = 'https://www.googleapis.com/youtube/v3/search?';

const KEY = 'AIzaSyDw-RH8HlDQGae-opd0hT1-N2pnbIYejO0';

const option = {
  part: 'snippet',
  maxResults: 10,
  order: 'date',
  key: KEY,
};

const stringQuery = (url, keyword, options) => {
  const query = Object.entries(options).reduce(
    (acc, [key, value]) => (acc += `${key}=${value}&`),
    `${url}q=${keyword}&`
  );
  return query;
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

    try {
      validateKeyword(keyword);

      const result = await fetch(stringQuery(URL, keyword, option));
      const json = await result.json();
      this.element.querySelector('.video-list').innerHTML = json.items
        .map((item) => {
          const {
            id: { videoId },
            snippet: {
              thumbnails: {
                medium: { url },
              },
              publishTime,
              channelTitle,
              title,
            },
          } = item;

          return `
        <li class="video-item" data-video-id="${videoId}">
          <img
            src="${url}"
            alt="video-item-thumbnail" class="video-item__thumbnail">
          <h4 class="video-item__title">${title}</h4>
          <p class="video-item__channel-name">${channelTitle}</p>
          <p class="video-item__published-date">${publishTime}</p>
          <button class="video-item__save-button button">⬇ 저장</button>
        </li>
          `;
        })
        .join('');

      searchErrorMessage.textContent = '';
    } catch (error) {
      searchErrorMessage.textContent = '검색어를 입력해 주세요.';
    }
  }
}
