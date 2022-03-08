const isEmptyKeyword = (keyword) => keyword.trim().length === 0;

const validateKeyword = (keyword) => {
  if (isEmptyKeyword(keyword)) {
    throw new Error('검색어를 입력해 주세요.');
  }
};

const URL = 'https://www.googleapis.com/youtube/v3/search?';

const KEY = 'AIzaSyDw-RH8HlDQGae-opd0hT1-N2pnbIYejO0';

const OPTIONS = {
  part: 'snippet',
  maxResults: 10,
  order: 'date',
  key: KEY,
};

const stringQuery = (props) => {
  const { url, keyword, pageToken, options } = props;
  const query = Object.entries(options).reduce(
    (acc, [key, value]) => (acc += `${key}=${value}&`),
    `${url}q=${keyword}&`
  );

  if (pageToken === '') {
    return query;
  }
  return `${query}pageToken=${pageToken}`;
};

const template = (json) =>
  json.items
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

export default class SearchModal {
  constructor(element) {
    this.element = element;
    this.bindEvents();
    this.pageToken = '';
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

      this.fetchData({
        url: URL,
        keyword,
        options: OPTIONS,
        pageToken: this.pageToken,
      });

      searchErrorMessage.textContent = '';
    } catch (error) {
      searchErrorMessage.textContent = '검색어를 입력해 주세요.';
    }
  }

  async fetchData(props) {
    const result = await fetch(stringQuery(props));
    const json = await result.json();
    this.pageToken = json.nextPageToken;

    this.element
      .querySelector('.video-list')
      .insertAdjacentHTML('beforeend', template(json));
  }
}
