import VideoItemView from './VideoItemView.js';
import storageManager from '../managers/storageManager.js';
import { DOM_STRING, VIDEO_LIST } from '../utils/constants.js';
import { $ } from '../utils/common.js';

export default class ModalView {
  constructor() {
    this.registerDOM();
    this.videoItemList = [];
    this.throttle = null;
  }

  registerDOM() {
    this.$modalContainer = $(DOM_STRING.MODAL_CONTAINER);
    this.$dimmer = $(DOM_STRING.DIMMER);
    this.$videoList = $(DOM_STRING.VIDEO_LIST);
    this.$searchButton = $(DOM_STRING.SEARCH_BUTTOM);
    this.$searchInput = $(DOM_STRING.SEARCH_INPUT);
    this.$searchNoResult = $(DOM_STRING.SEARCH_NO_RESULT);
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
        if ([...event.target.classList].includes(DOM_STRING.VIDEO_ITEM_SAVE_BUTTON)) {
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
    this.$videoList.insertAdjacentHTML('beforeend', '<li></li>'.repeat(VIDEO_LIST.RENDER_SIZE));
  }

  appendVideoItem() {
    [...this.$videoList.childNodes].slice(-VIDEO_LIST.RENDER_SIZE).forEach(li => {
      this.videoItemList.push(new VideoItemView(li));
    });
  }

  getSkeletonTemplate() {
    this.videoItemList
      .slice(-VIDEO_LIST.RENDER_SIZE)
      .forEach(videoItem => videoItem.getVideoItemTemplate());
  }

  getData(parsedData) {
    this.updateVideoItems(parsedData);
  }

  updateVideoItems(data) {
    this.videoItemList
      .slice(-VIDEO_LIST.RENDER_SIZE)
      .forEach((videoItem, index) => videoItem.getVideoItemTemplate(data[index]));
  }

  showNoResult() {
    this.$searchNoResult.classList.remove(DOM_STRING.HIDE);
    this.$videoList.classList.add(DOM_STRING.HIDE);
  }
}
