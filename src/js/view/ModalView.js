import VideoItemView from './VideoItemView.js';
import { SELECTOR, VIDEO_LIST, DOM_STRING, SCROLL, KEY_CODE } from '../utils/constants.js';
import { $, throttle } from '../utils/common.js';

export default class ModalView {
  constructor() {
    this.registerDOM();
    this.videoItemList = [];
    this.enabledScrollSearch = false;
    this.searchInputValue = '';
  }

  registerDOM() {
    this.$modalContainer = $(SELECTOR.MODAL_CONTAINER);
    this.$dimmer = $(SELECTOR.DIMMER);
    this.$videoList = $(SELECTOR.VIDEO_LIST);
    this.$searchButton = $(SELECTOR.SEARCH_BUTTOM);
    this.$searchInput = $(SELECTOR.SEARCH_INPUT);
    this.$searchNoResult = $(SELECTOR.SEARCH_NO_RESULT);
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

  controlScrollSearch(value) {
    this.enabledScrollSearch = value;
  }

  bindOnClickClose(callback) {
    this.$dimmer.addEventListener('click', callback);
    this.$modalContainer.addEventListener('keyup', event => {
      if (event.keyCode === KEY_CODE.ESC) {
        callback();
      }
    });
  }

  bindOnClickSearchButton(callback) {
    this.$searchButton.addEventListener('click', () => {
      this.searchInputValue = this.$searchInput.value;
      callback(this.searchInputValue);
    });
    this.$searchInput.addEventListener('keyup', e => {
      if (e.keyCode === KEY_CODE.ENTER) {
        this.searchInputValue = this.$searchInput.value;
        callback(this.searchInputValue);
      }
    });
  }

  bindVideoListScroll(callback) {
    this.$videoList.addEventListener('scroll', () => {
      throttle(() => {
        if (
          this.$videoList.scrollHeight - this.$videoList.scrollTop <=
            this.$videoList.offsetHeight + SCROLL.ADDITIONAL_OFFSET &&
          this.enabledScrollSearch
        ) {
          this.controlScrollSearch(false);
          callback(this.searchInputValue);
        }
      });
    });
  }

  bindVideoListClickStoreButton(callback) {
    this.$videoList.addEventListener('click', event => {
      if ([...event.target.classList].includes(DOM_STRING.VIDEO_ITEM_SAVE_BUTTON)) {
        event.target.classList.add(DOM_STRING.HIDE);
        callback(event.target.dataset.videoid);
      }
    });
  }

  resetVideoList() {
    this.$searchNoResult.classList.add(DOM_STRING.HIDE);
    this.$videoList.classList.remove(DOM_STRING.HIDE);
    this.$videoList.textContent = '';
    this.videoItemList = [];
  }

  showNoResult() {
    this.$searchNoResult.classList.remove(DOM_STRING.HIDE);
    this.$videoList.classList.add(DOM_STRING.HIDE);
  }

  updateVideoItems(videoListData) {
    const willUpdateVideoItemList = this.videoItemList.slice(-VIDEO_LIST.RENDER_SIZE);
    const willDeleteVideoItemList = willUpdateVideoItemList.splice(videoListData.length);

    willUpdateVideoItemList.forEach((videoItem, index) =>
      videoItem.renderVideoItemTemplate(videoListData[index])
    );
    willDeleteVideoItemList.forEach(videoItem => videoItem.deleteTemplate());
  }

  showLoadingVideoItems() {
    this.#appendEmptyList();
    this.#appendVideoItem();
    this.#showSkeletonTemplate();
  }

  #appendEmptyList() {
    this.$videoList.insertAdjacentHTML(
      'beforeend',
      `<li class=${DOM_STRING.VIDEO_ITEM}></li>`.repeat(VIDEO_LIST.RENDER_SIZE)
    );
  }

  #appendVideoItem() {
    [...this.$videoList.childNodes].slice(-VIDEO_LIST.RENDER_SIZE).forEach(li => {
      this.videoItemList.push(new VideoItemView(li));
    });
  }

  #showSkeletonTemplate() {
    this.videoItemList
      .slice(-VIDEO_LIST.RENDER_SIZE)
      .forEach(videoItem => videoItem.renderSkeletonTemplate());
  }
}
