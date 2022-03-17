/* eslint-disable max-lines-per-function */
import SearchModal from './searchModal';
import { $ } from './utils/dom';
import { renderSkeletonItems, removeSkeleton } from './views/render';
import { MAX_RENDER_VIDEOS_COUNT } from './constants/constant';
import searchResultRequest from './utils/request';
import VideoItem from './videoItem';
import dummyData from '../dummyData.js';

export default class MainPage {
  constructor() {
    this.$nav = $('.nav');
    this.$searchKeyWordInput = $('#search-input-keyword', this.$modal);
    this.$modalSearchResult = $('.modal__search-result');
    this.$modalVideoList = $('.video-list', this.$modalSearchResult);
    this.$mainSearchResult = $('.main__search-result');
    this.$mainVideoList = $('.video-list', this.$mainSearchResult);
    this.addEvent();
    const searchModal = new SearchModal();
    searchModal.init();
  }

  addEvent() {
    $('#search-modal-button', this.$nav).addEventListener('click', this.openModal);
    $('.nav__watched-button', this.$nav).addEventListener(
      'click',
      this.handleClickWatchedButton.bind(this)
    );
    $('.nav__no-watched-button', this.$nav).addEventListener(
      'click',
      this.handleClickNoWatchedButton.bind(this)
    );
    $('.dimmer').addEventListener('click', this.closeModal.bind(this));
  }

  renderVideoItems(videos) {
    const videoListTemplate = videos
      .map(video => {
        return `<li class="video-item" data-video-id="${video.id}">
          <img
            src="${video.thumbnailUrl}"
            alt="video-item-thumbnail" class="video-item__thumbnail" />
          <h4 class="video-item__title">${video.title}</h4>
          <p class="video-item__channel-name">${video.channelTitle}</p>
          <p class="video-item__published-date">${video.publishedAt}</p>
          <p class="buttons-container">
            <button class="button main-videos-button">✅</button>
            <button class="button main-videos-button">🗑️</button>
          </p>
        </li>`;
      })
      .join('\n'); // new line해주지 않으면 insertAdjacentHTML을 사용할때 element가 5개만 생성된다.

    const template = document.createElement('template');
    template.insertAdjacentHTML('beforeend', videoListTemplate);

    template.childNodes.forEach($el => {
      this.$mainVideoList.insertAdjacentElement('beforeend', $el);
    });
  }

  checkSearchResult(searchResult) {
    if (searchResult === null) {
      return [];
    }
    const videos = searchResult.items.map(item => new VideoItem(item));
    return videos;
  }

  async handleClickWatchedButton() {
    if (this.$mainVideoList.classList.contains('watched-video-list')) {
      return;
    }
    $('.nav__no-watched-button').classList.remove('button-active');
    $('.nav__watched-button').classList.add('button-active');
    this.$mainVideoList.classList.add('watched-video-list');
    this.$mainVideoList.replaceChildren();
    renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT, this.$mainVideoList);
    // 비디오 가져오기
    const searchResult = dummyData;
    const videos = this.checkSearchResult(searchResult);
    removeSkeleton(this.$mainVideoList);
    if (videos.length === 0) {
      this.$mainSearchResult.classList.add('search-result--no-result');
      return;
    }
    this.renderVideoItems(videos);
    this.$mainSearchResult.classList.remove('search-result--no-result');
  }

  handleClickNoWatchedButton() {
    if (!this.$mainVideoList.classList.contains('watched-video-list')) {
      return;
    }
    $('.nav__no-watched-button').classList.add('button-active');
    $('.nav__watched-button').classList.remove('button-active');
    this.$mainVideoList.classList.remove('watched-video-list');
    this.$mainVideoList.replaceChildren();
    renderSkeletonItems(MAX_RENDER_VIDEOS_COUNT, this.$mainVideoList);
    // 비디오 가져오기
    removeSkeleton(this.$mainVideoList);
    const videos = [];
    if (videos.length === 0) {
      this.$mainSearchResult.classList.add('search-result--no-result');
      return;
    }
    this.$mainSearchResult.classList.remove('search-result--no-result');
  }

  openModal() {
    const $modalContainer = $('.modal-container');
    $modalContainer.classList.toggle('hide');
  }

  closeModal() {
    this.$searchKeyWordInput.value = '';
    this.$modalSearchResult.classList.remove('search-result--no-result');
    this.$modalVideoList.replaceChildren();
    $('.modal-container').classList.add('hide');
  }
}

new MainPage();
