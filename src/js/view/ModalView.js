import VideoItemView from './VideoItemView.js';
import storageManager from '../managers/storageManager.js';
import { DOM_STRING } from '../utils/constants.js';

export default class ModalView {
  constructor() {
    this.registerDOM();
    this.videoItemList = [];
    this.throttle = null;
  }

  registerDOM() {
    this.$modalContainer = document.querySelector(DOM_STRING.MODAL_CONTAINER);
    this.$dimmer = document.querySelector(DOM_STRING.DIMMER);
    this.$videoList = document.querySelector(DOM_STRING.VIDEO_LIST);
    this.$searchButton = document.querySelector(DOM_STRING.SEARCH_BUTTOM);
    this.$searchInput = document.querySelector(DOM_STRING.SEARCH_INPUT);
    this.$searchNoResult = document.querySelector(DOM_STRING.SEARCH_NO_RESULT);
  }

  showModal() {
    this.$modalContainer.classList.remove(DOM_STRING.HIDE);
    this.$searchNoResult.classList.add(DOM_STRING.HIDE);
    this.$searchInput.value = '';
    this.$searchInput.focus();
  }

  hideModal() {
    this.$modalContainer.classList.add(DOM_STRING.HIDE);
  }

  bindOnClickDimmer(callback) {
    this.$dimmer.addEventListener('click', callback);
  }

  bindOnClickSearchButton(callback) {
    this.$searchButton.addEventListener('click', () => {
      callback(this.$searchInput.value);
    });
    this.$searchInput.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        callback(this.$searchInput.value);
      }
    });
  }

  bindVideoListScroll(callback) {
    this.$videoList.addEventListener('scroll', () => {
      if (!this.throttle) {
        this.throttle = setTimeout(async () => {
          this.throttle = null;
          if (
            this.$videoList.scrollHeight - this.$videoList.scrollTop <=
            this.$videoList.offsetHeight
          ) {
            callback(this.$searchInput.value);
          }
        }, 1000);
      }
    });
  }

  bindVideoListClickStoreButton(callback) {
    this.$videoList.addEventListener('click', event => {
      try {
        if (event.target.tagName === 'BUTTON') {
          storageManager.checkOverMaxLength();
          event.target.classList.add(DOM_STRING.HIDE);
          callback(event.target.dataset.videoid);
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }

  resetVideoList() {
    this.$searchNoResult.classList.add(DOM_STRING.HIDE);
    this.$videoList.classList.remove(DOM_STRING.HIDE);
    this.$videoList.textContent = '';
    this.videoItemList = [];
  }

  appendEmptyList() {
    this.$videoList.insertAdjacentHTML('beforeend', '<li></li>'.repeat(10));
  }

  appendVideoItem() {
    [...this.$videoList.childNodes].slice(-10).forEach(li => {
      this.videoItemList.push(new VideoItemView(li));
    });
  }

  getSkeletonTemplate() {
    this.videoItemList.slice(-10).forEach(videoItem => videoItem.getVideoItemTemplate());
  }

  getData(parsedData) {
    this.getSkeletonTemplate();
    this.updateVideoItems(parsedData);
  }

  updateVideoItems(data) {
    this.videoItemList
      .slice(-10)
      .forEach((videoItem, index) => videoItem.getVideoItemTemplate(data[index]));
  }

  showNoResult() {
    this.$searchNoResult.classList.remove(DOM_STRING.HIDE);
    this.$videoList.classList.add(DOM_STRING.HIDE);
  }
}
