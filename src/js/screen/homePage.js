import StorageEngine from '../domain/storageEngine';
import MessageBot from './messageModal';

import { getVideoItemTemplate, NO_RESULT_TEMPLATE } from './template';

import { MESSAGE, MESSAGE_TYPE, TAB_MENU } from '../util/constants';
import { $ } from '../util/domHelper';

export default class HomePage {
  #storageEngine = new StorageEngine();

  #messageBot = new MessageBot();

  #modalContainer = $('.modal-container');
  #watchLaterContainer = $('.watch-later-container');
  #watchedContainer = $('.watched-container');

  #dimmer = $('.dimmer');

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
    const tabMenu =
      e.target.id === 'watch-later-tab-menu-button' ? TAB_MENU.WATCH_LATER : TAB_MENU.WATCHED;

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

    const videoListType = {
      [TAB_MENU.WATCH_LATER]: {
        videoList: this.#storageEngine.getWatchLaterVideos(),
        $videoList: this.#watchLaterVideoList,
      },
      [TAB_MENU.WATCHED]: {
        videoList: this.#storageEngine.getWatchedVideos(),
        $videoList: this.#watchedVideoList,
      },
    };
    const tabMenu = this.#storageEngine.getTabMenu();
    const { videoList, $videoList } = videoListType[tabMenu];

    if (videoList.length === 0) {
      $videoList.insertAdjacentHTML('beforeend', NO_RESULT_TEMPLATE);
      return;
    }

    $videoList.insertAdjacentHTML(
      'beforeend',
      videoList.map((video) => getVideoItemTemplate(video)).join('')
    );
  }

  handleVideoButton = (e) => {
    if (e.target.classList.contains('video-item__watch_button')) {
      const { videoId } = e.target.closest('.video-item').dataset;
      this.#storageEngine.changeStatus(videoId, 'isWatched');
      this.renderVideoList();
      return;
    }

    if (e.target.classList.contains('video-item__delete_button') && confirm(MESSAGE.CONFIRM)) {
      const { videoId } = e.target.closest('.video-item').dataset;
      this.#storageEngine.removeVideo(videoId);
      this.renderVideoList();
      this.#messageBot.dispatchMessage(MESSAGE_TYPE.REMOVE, MESSAGE.REMOVE);
    }
  };
}
