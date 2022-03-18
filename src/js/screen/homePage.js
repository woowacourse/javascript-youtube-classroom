import StorageEngine from '../domain/storageEngine';
import MessageBot from './messageBot';

import { $ } from '../util/domHelper';
import notFoundImage from '../../assets/images/not_found.jpg';

//template
const NO_RESULT_TEMPLATE = `
  <img src=${notFoundImage} alt="no result image" class="no-result__image">
`;

const getVideoItemTemplate = ({ channelTitle, publishTime, title, videoId, isWatched }) => `
  <li class="video-item" data-video-id=${videoId}>
    <div id="image-wrapper">
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        alt="video-item-thumbnail" class="video-item__thumbnail">
      </iframe>
    </div>
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime}</p>
    <div class="button-list">
      <button data-is-watched=${isWatched} class="video-item__watch_button button">✅</button>
      <button class="video-item__delete_button button">🗑</button>
    </div>
  </li>`;

//class
export default class HomePage {
  #storageEngine = new StorageEngine();

  #dimmer = $('.dimmer');

  #modalContainer = $('.modal-container');
  #watchLaterContainer = $('.watch-later-container');
  #watchedContainer = $('.watched-container');

  #searchModalButton = $('#search-modal-button');
  #watchLaterTabMenuButton = $('#watch-later-tab-menu-button');
  #watchedTabMenuButton = $('#watched-tab-menu-button');

  #watchLaterVideoList = $('.watch-later-video-list');
  #watchedVideoList = $('.watched-video-list');

  constructor() {
    this.#dimmer.addEventListener('click', this.#handleCloseModal);
    this.#searchModalButton.addEventListener('click', this.#handleOpenModal);
    this.#watchLaterTabMenuButton.addEventListener('click', this.handleTabMenu);
    this.#watchedTabMenuButton.addEventListener('click', this.handleTabMenu);
    this.#watchLaterVideoList.addEventListener('click', this.handleVideoButton);
    this.#watchedVideoList.addEventListener('click', this.handleVideoButton);

    this.renderVideoList();
  }

  #handleOpenModal = () => {
    this.#modalContainer.classList.remove('hide');
  };

  #handleCloseModal = (e) => {
    if (e.target.matches('#search-modal-button')) return;

    if (!e.target.closest('.search-modal')) {
      this.renderVideoList();
      this.#modalContainer.classList.add('hide');
    }
  };

  handleTabMenu = (e) => {
    const tabMenu = e.target.id === 'watch-later-tab-menu-button' ? 'watch-later' : 'watched';

    if (tabMenu === this.#storageEngine.getTabMenu()) return;

    this.#storageEngine.setTabMenu(tabMenu);
    this.toggleTabMenuClassName();
    this.renderVideoList();
  };

  toggleTabMenuClassName() {
    this.#watchLaterTabMenuButton.classList.toggle('clicked');
    this.#watchedTabMenuButton.classList.toggle('clicked');
    this.#watchLaterContainer.classList.toggle('hide');
    this.#watchedContainer.classList.toggle('hide');
  }

  renderVideoList() {
    this.#watchLaterVideoList.replaceChildren();
    this.#watchedVideoList.replaceChildren();
    const tabMenu = this.#storageEngine.getTabMenu();
    if (tabMenu === 'watch-later') {
      const watchLaterVideoList = this.#storageEngine.getWatchLaterVideos();

      if (watchLaterVideoList.length === 0) {
        this.#watchLaterVideoList.insertAdjacentHTML('beforeend', NO_RESULT_TEMPLATE);
        return;
      }

      this.#watchLaterVideoList.insertAdjacentHTML(
        'beforeend',
        watchLaterVideoList.map((video) => getVideoItemTemplate(video)).join('')
      );
      return;
    }
    const watchedVideoList = this.#storageEngine.getWatchedVideos();
    if (watchedVideoList.length === 0) {
      this.#watchedVideoList.insertAdjacentHTML('beforeend', NO_RESULT_TEMPLATE);
      return;
    }

    this.#watchedVideoList.insertAdjacentHTML(
      'beforeend',
      watchedVideoList.map((video) => getVideoItemTemplate(video)).join('')
    );
  }

  handleVideoButton = (e) => {
    if (e.target.classList.contains('video-item__watch_button')) {
      const { videoId } = e.target.closest('.video-item').dataset;
      this.#storageEngine.changeStatus(videoId, 'isWatched');
      this.renderVideoList();

      return;
    }

    if (e.target.classList.contains('video-item__delete_button')) {
      if (confirm('해당 영상을 영상 리스트에서 삭제하시겠습니까?')) {
        const { videoId } = e.target.closest('.video-item').dataset;
        this.#storageEngine.removeVideo(videoId);
        this.renderVideoList();
        MessageBot.dispatchMessage('remove', '영상이 정상적으로 삭제되었습니다.');
      }
    }
  };
}
