/* eslint-disable max-lines-per-function */
import { $, removeChildren } from './utils/dom';
import VideoItem from './videoItem';
import NotFoundImage from '../assets/images/not_found.png';
import YoutubeJSON from '../youtube-api.json';

class SearchModal {
  apikey = 'AIzaSyCr0ODcPGNBRByd4pZGQucF31LpqN1zGD0';

  baseUrl = 'https://www.googleapis.com/youtube/v3/search';

  nextPageToken = null;

  maxResult = 10;

  testMode = false;

  localStorageVideoListKey = 'local-storage-video-list-key';

  maxSavableVideoCount = 5;

  constructor() {
    this.$modal = $('.search-modal');
    this.$input = $('#search-input-keyword', this.$modal);
    this.$button = $('#search-button', this.$modal);
    this.$searchResult = $('.search-result');
    this.addEvent();
  }

  renderVideoItems(videos) {
    const $searchResult = $('.search-result');
    if ($searchResult.classList.contains('search-result--no-result')) {
      removeChildren($searchResult);
      $searchResult.insertAdjacentHTML(
        'beforeend',
        `<h3>검색 결과</h3><ul class="video-list"></ul>`
      );
    }
    $searchResult.classList.remove('search-result--no-result');

    const videoListTemplate = videos
      .map(video => {
        return `<li class="video-item" data-video-id="${video.id}">
          <img
            src="${video.thumbnailUrl}"
            alt="video-item-thumbnail" class="video-item__thumbnail" />
          <h4 class="video-item__title">${video.title}</h4>
          <p class="video-item__channel-name">${video.channelTitle}</p>
          <p class="video-item__published-date">${video.publishedAt}</p>
          <button class="video-item__save-button button">⬇ 저장</button>
        </li>`;
      })
      .join('\n'); // new line해주지 않으면 insertAdjacentHTML을 사용할때 element가 5개만 생성된다.

    const template = document.createElement('template');
    template.insertAdjacentHTML('beforeend', videoListTemplate);

    const $videoList = $('.video-list', this.$modal);
    template.childNodes.forEach($el => {
      $el.addEventListener('click', this.handleClickSaveButton.bind(this));
      $videoList.insertAdjacentElement('beforeend', $el);
    });
    $videoList.addEventListener('scroll', this.handleScroll.bind(this));
  }

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

  renderSkeletonItems(videoCount) {
    const $videoList = $('.video-list', this.$modal);
    const skeletonListHtmlString = [...Array(videoCount).keys()].map(() => `
      <div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>
    `).join('');

    $videoList.insertAdjacentHTML('beforeend', skeletonListHtmlString);
  }

  addEvent() {
    this.$button.addEventListener('click', this.handleClickButton.bind(this));
  }

  async handleClickButton() {
    const title = this.$input.value;
    this.renderSkeletonItems(this.maxResult);
    let jsonResult = this.testMode
      ? await this.testRequest(this.maxResult, 0)
      : await this.request(title);
    this.removeSkeleton();
    if (jsonResult === null) {
      this.renderNotFound();
      return;
    }
    this.nextPageToken = jsonResult.nextPageToken;
    let videos = jsonResult.items.map(item => new VideoItem(item));
    this.renderVideoItems(videos);
  }

  async handleScroll() {
    const title = $('#search-input-keyword').value;
    if ($('.video-list').scrollHeight - $('.video-list').scrollTop === $('.video-list').clientHeight) {
      this.renderSkeletonItems(this.maxResult);
      const jsonResult = this.testMode
        ? await this.testRequest(this.maxResult, this.nextPageToken)
        : await this.request(title);
      this.nextPageToken = jsonResult.nextPageToken;
      const videos = jsonResult.items.map(item => new VideoItem(item));
      this.removeSkeleton();
      this.renderVideoItems(videos);
    }
  }

  handleClickSaveButton(event) {
    const { target } = event;
    const $videoItem = target.closest('.video-item');
    const videoId = $videoItem.getAttribute('data-video-id');
    const videoList = JSON.parse(localStorage.getItem(this.localStorageVideoListKey)) ?? [];
    if (videoList.length >= this.maxSavableVideoCount) {
      alert(`비디오는 ${this.maxSavableVideoCount}개 이상 저장할 수 없습니다`);
      return;
    }
    localStorage.setItem(this.localStorageVideoListKey, JSON.stringify([...videoList, videoId]));
    target.setAttribute('hidden', true);
  }

  removeSkeleton() {
    const $skeletons = document.querySelectorAll('.skeleton');
    for (let i = 0; i < $skeletons.length; i += 1) {
      $skeletons[i].remove();
    }
  }

  async testRequest(count, nextPageToken) {
    const page = parseInt(nextPageToken, 10);
    try {
      const json = { ...YoutubeJSON };
      json.items = json.items.slice(page * count, (page + 1) * count);
      json.nextPageToken = `${page + 1}`;
      return json;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async request(title) {
    let url = `${this.baseUrl}?part=snippet&type=video&maxResults=${this.maxResult}&q=${title}&pageToken=${this.nextPageToken}&key=${this.apikey}`;
    if (this.nextPageToken === null) {
      url = `${this.baseUrl}?part=snippet&maxResults=${this.maxResult}&q=${title}&key=${this.apikey}`;
    }
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log('json : ', json);
      return json; // *** 응답결과
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default SearchModal;
