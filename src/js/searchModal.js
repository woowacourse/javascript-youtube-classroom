import { $, removeChildren } from './utils/dom';
import VideoItem from './videoItem';
import NotFoundImage from '../assets/images/not_found.png';

class SearchModal {
  apikey = 'AIzaSyCr0ODcPGNBRByd4pZGQucF31LpqN1zGD0';

  baseUrl = 'https://www.googleapis.com/youtube/v3/search';

  nextPageToken = null;

  constructor() {
    this.$modal = $('.search-modal');
    this.$input = $('#search-input-keyword', this.$modal);
    this.$button = $('#search-button', this.$modal);
    this.addEvent();
  }

  // eslint-disable-next-line max-lines-per-function
  renderVideoItems(videos) {
    const $searchResult = $('.search-result');
    $searchResult.classList.remove('search-result--no-result');
    removeChildren($searchResult);
    $searchResult.insertAdjacentHTML('beforeend', `<h3>검색 결과</h3><ul class="video-list"></ul>`);

    const videoListTemplate = videos
      .map(video => {
        return `<li class="video-item" data-video-id="${video.videoId}">
          <img
            src="${video.thumbnailUrl}"
            alt="video-item-thumbnail" class="video-item__thumbnail">
          <h4 class="video-item__title">${video.title}</h4>
          <p class="video-item__channel-name">${video.channelTitle}</p>
          <p class="video-item__published-date">${video.publishedAt}</p>
          <button class="video-item__save-button button">⬇ 저장</button>
        </li>`;
      })
      .join('');

    $('.video-list', this.$modal).insertAdjacentHTML('beforeend', videoListTemplate);
  }

  // eslint-disable-next-line max-lines-per-function
  renderNotFound() {
    const $searchResult = $('.search-result');
    $searchResult.classList.add('search-result--no-result');
    removeChildren($searchResult);
    $searchResult.insertAdjacentHTML(
      'beforeend',
      `<div class="no-result">
        <img src="${NotFoundImage}" alt="no result image" class="no-result__image">
        <p class="no-result__description">
          검색 결과가 없습니다<br />
          다른 키워드로 검색해보세요
        </p>
      </div>`
    );
  }

  addEvent() {
    this.$button.addEventListener('click', this.handleClickButton.bind(this));
  }

  async handleClickButton() {
    const title = this.$input.value;
    const jsonResult = await this.request(title);
    if (jsonResult === null) {
      this.renderNotFound();
      return;
    }
    const videos = jsonResult.items.map(item => new VideoItem(item));
    this.renderVideoItems(videos);
  }

  async request(title) {
    const url = `${this.baseUrl}?part=snippet&maxResults=15&q=${title}&&key=${this.apikey}`;
    try {
      const response = await fetch(url);
      const json = await response.json();

      if (!response.ok) {
        throw Error(response.statusText);
      }
      return json; // *** 응답결과
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default SearchModal;
