import { fetchDataFromKeyword } from '../utils/apiFetch.js';
import {
  getVideoIdFromLocalStorage,
  getVideoItemsFromLocalStorage,
  saveVideoIdToLocalStorage,
  saveVideoItemToLocalStorage,
} from '../utils/localStorage.js';
import { noSearchResultTemplate, makeThumbnailTemplate, makeSkeletonTemplate } from '../utils/templates.js';
import { NUM } from '../../const/consts.js';

import { SearchModal } from '../model/SearchModal.js';

export class SearchModalView {
  constructor(props) {
    this.props = props;
    this.searchModal = new SearchModal();

    this.modalContainer = document.getElementById('modal-container');
    this.searchInputKeyword = document.getElementById('search-input-keyword');
    this.clearSearchInputKeywordButton = document.getElementById('search-input-clear-button');
    this.videoList = document.getElementById('video-list');
    this.resultLabel = document.getElementById('result-label');
    this.noResultContainer = document.getElementById('no-result');
    this.searchButton = document.getElementById('search-button');
    this.closeModalButton = document.getElementById('close-modal-button');

    this.searchButton.addEventListener('click', this.handleSearchButton);
    this.videoList.addEventListener('click', this.handleVideoItemSave);
    this.closeModalButton.addEventListener('click', this.handleCloseButton);
    this.searchInputKeyword.addEventListener('keyup', (event) => this.handleEnterKeyEvent(event));
    this.clearSearchInputKeywordButton.addEventListener('click', this.clearSearchInputKeyword);
  }

  show() {
    this.modalContainer.classList.remove('hide');
  }

  handleSearchButton = () => {
    this.initVideoList();
    this.searchModal.setKeyword(this.searchInputKeyword.value);
    this.getDataMatchKeyword();
  };

  initVideoList() {
    this.videoList.replaceChildren();
    this.noResultContainer.replaceChildren();
  }

  async getDataMatchKeyword() {
    this.renderSkeleton();
    await this.searchModal.searchVideos();
    this.removeSkeleton();

    if (this.searchModal.hasNoVideoItems()) {
      this.renderNoVideosImg();
      return;
    }
    this.renderThumbnail(this.searchModal.videoItemObjects());
    this.createObserver();
  }

  renderNoVideosImg() {
    this.noResultContainer.insertAdjacentHTML('afterbegin', noSearchResultTemplate());
  }

  renderThumbnail(videoItemObjects) {
    const local = getVideoIdFromLocalStorage();
    this.resultLabel.removeAttribute('hidden');
    this.videoList.insertAdjacentHTML(
      'beforeend',
      videoItemObjects
        .map((video) => {
          if (local.includes(video.id)) {
            return makeThumbnailTemplate(video, 'exist');
          }
          return makeThumbnailTemplate(video);
        })
        .join(''),
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
    this.videoCards = [...document.getElementsByClassName('video-item')];
    this.intersectionObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.renderNextPage();
      }
    });

    this.intersectionObserver.observe(this.videoCards[this.videoCards.length - 1]);
  }

  async renderNextPage() {
    this.removePreviousObserver();
    this.renderSkeleton();
    await this.searchModal.searchNextPageVideos();
    this.removeSkeleton();
    this.renderThumbnail(this.searchModal.videoItemObjects());
    this.createObserver();
  }

  removePreviousObserver() {
    this.intersectionObserver.disconnect();
  }

  handleVideoItemSave = (e) => {
    if (!e.target.classList.contains('video-item__save-button')) {
      return;
    }

    const tempVideoIdsInLocalStorage = getVideoIdFromLocalStorage();
    if (this.canSaveVideoIdInLocalStorage(e.target)) {
      tempVideoIdsInLocalStorage.push(e.target.id);
      e.target.style.display = 'none';
    }

    this.saveVideoItemInformationToLocalStorage(e.target);
    saveVideoIdToLocalStorage(tempVideoIdsInLocalStorage);
  };

  saveVideoItemInformationToLocalStorage(target) {
    const tempVideosInLocalStorage = getVideoItemsFromLocalStorage();
    tempVideosInLocalStorage.push({
      title: target.parentNode.parentNode.childNodes[3].innerText,
      channelName: target.parentNode.parentNode.childNodes[5].innerText,
      publishedDate: target.parentNode.parentNode.childNodes[7].innerText,
      id: target.id,
      watchLater: true,
    });
    saveVideoItemToLocalStorage(tempVideosInLocalStorage);
  }

  canSaveVideoIdInLocalStorage(target) {
    return (
      !getVideoIdFromLocalStorage().includes(target.id) && getVideoIdFromLocalStorage().length <= NUM.MAX_STORAGE_LENGTH
    );
  }

  handleCloseButton = () => {
    this.modalContainer.classList.add('hide');
    this.props.closeModal();
  };

  handleEnterKeyEvent = (event) => {
    if (event.key === 'Enter') {
      this.searchButton.click();
    }
  };

  clearSearchInputKeyword = () => {
    this.searchInputKeyword.value = '';
  };
}
