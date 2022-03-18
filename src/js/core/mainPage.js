/* eslint-disable max-lines-per-function */
import SearchModal from './searchModal';
import { $ } from '../utils/dom';
import { VideoItem, checkSearchResult } from '../videoItem';
import StateController from './stateController';
export default class MainPage extends StateController {
  constructor() {
    super();
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

  async init() {
    await this.initVideoLists();
    if (StateController.prototype.savedToWatchVideoList.length === 0) {
      this.$mainSearchResult.classList.add('search-result--no-result');
      return;
    }
    this.renderVideoItems(StateController.prototype.savedToWatchVideoList);
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
      .join('\n');

    const template = document.createElement('template');
    template.insertAdjacentHTML('beforeend', videoListTemplate);

    template.childNodes.forEach($el => {
      this.$mainVideoList.insertAdjacentElement('beforeend', $el);
    });
  }

  handleClickWatchedButton() {
    if (this.$mainVideoList.classList.contains('watched-video-list')) {
      return;
    }
    $('.nav__no-watched-button').classList.remove('button-active');
    $('.nav__watched-button').classList.add('button-active');
    this.$mainVideoList.classList.add('watched-video-list');
    this.$mainVideoList.replaceChildren();
    const videos = StateController.prototype.savedWatchedVideoList;

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
    const videos = StateController.prototype.savedToWatchVideoList;

    if (videos.length === 0) {
      this.$mainSearchResult.classList.add('search-result--no-result');
      return;
    }
    this.renderVideoItems(videos);
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

const mainPage = new MainPage();
mainPage.init();
