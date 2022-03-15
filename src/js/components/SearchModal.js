import { fetchDataFromKeyword } from '../utils/apiFetch.js';
import { getVideoIdFromLocalStorage, saveVideoIdToLocalStorage } from '../utils/localStorage.js';
import { noSearchResultTemplate, makeIframeTemplate, makeSkeletonTemplate } from '../utils/templates.js';
import { NUM } from '../../const/consts.js';

export class SearchModal {
  constructor() {
    this.modalContainer = document.getElementById('modal-container');
    this.searchInputKeyword = document.getElementById('search-input-keyword');
    this.videoList = document.getElementById('video-list');
    this.resultLabel = document.getElementById('result-label');
    this.noResultContainer = document.getElementById('no-result');
    this.searchButton = document.getElementById('search-button');
    this.closeModalButton = document.getElementById('close-modal-button');
    this.searchModal = document.getElementById('search-modal');

    this.searchButton.addEventListener('click', this.handleSearchButton);
    this.videoList.addEventListener('click', this.handleVideoItemSave);
    this.closeModalButton.addEventListener('click', this.handleCloseButton);
    this.searchInputKeyword.addEventListener('keyup', (event) => this.handleEnterKeyEvent(event));
  }

  show() {
    this.modalContainer.classList.remove('hide');
  }

  handleSearchButton = () => {
    this.initVideoList();
    this.keyword = this.searchInputKeyword.value;
    this.getDataMatchKeyword(this.keyword);
  };

  initVideoList() {
    this.videos = {};
    this.videoList.replaceChildren();
    this.noResultContainer.replaceChildren();
  }

  async getDataMatchKeyword(keyword) {
    this.renderSkeleton();
    this.videos = await fetchDataFromKeyword(keyword);
    this.removeSkeleton();

    if (this.videos.items.length === 0) {
      this.renderNoVideosImg();
      return;
    }

    this.renderIframe();
    this.createObserver();
  }

  renderNoVideosImg() {
    this.noResultContainer.insertAdjacentHTML('afterbegin', noSearchResultTemplate());
  }

  renderIframe() {
    this.resultLabel.removeAttribute('hidden');
    this.videoList.insertAdjacentHTML(
      'beforeend',
      this.videos.items.map((video) => makeIframeTemplate(video)).join(''),
    );
  }

  renderSkeleton() {
    this.videoList.insertAdjacentHTML(
      'beforeend',
      Array.from({ length: NUM.VIDEO_ITEMS_FOR_UNIT }, () => makeSkeletonTemplate()).join(''),
    );
  }

  removeSkeleton() {
    this.skeletonCards = [...document.getElementsByClassName('skeleton')];
    this.skeletonCards.forEach((card) => this.videoList.removeChild(card));
  }

  createObserver() {
    this.videoItems = [...document.getElementsByClassName('video-item')];
    this.intersectionObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.renderNextPage();
      }
    });

    this.intersectionObserver.observe(this.videoItems[this.videoItems.length - 1]);
  }

  async renderNextPage() {
    this.removePreviousObserver();
    this.videos = await fetchDataFromKeyword(this.keyword, this.videos.nextPageToken);
    this.renderIframe();
    this.createObserver();
  }

  removePreviousObserver() {
    this.intersectionObserver.disconnect();
  }

  handleVideoItemSave = (e) => {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }

    const proviousLocalStorage = getVideoIdFromLocalStorage();
    if (this.canSaveVideoItems(proviousLocalStorage, e.target)) {
      proviousLocalStorage.push(e.target.id);
      e.target.remove();
    }
    saveVideoIdToLocalStorage(proviousLocalStorage);
  };

  canSaveVideoItems(localStorage, target) {
    return !localStorage.includes(target.id) && localStorage.length <= NUM.MAX_STORAGE_LENGTH;
  }

  handleCloseButton = () => {
    this.modalContainer.classList.add('hide');
  };

  handleEnterKeyEvent = (event) => {
    if (event.key === 'Enter') {
      this.searchButton.click();
    }
  };
}
