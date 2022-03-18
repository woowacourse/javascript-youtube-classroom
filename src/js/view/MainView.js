import { SELECTOR } from '../utils/constants.js';
import { $ } from '../utils/common.js';
import { DOM_STRING, STORE } from '../utils/constants.js';
import VideoItemView from './VideoItemView.js';

export default class MainView {
  constructor() {
    this.registerDOM();
    this.setProperties();
  }

  registerDOM() {
    this.$modalOpenButton = $(SELECTOR.MODAL_OPEN_BUTTON);
    this.$willSeeButton = $(SELECTOR.WILL_SEE_BUTTON);
    this.$sawButton = $(SELECTOR.SAW_BUTTON);
    this.$storeButtonsContainer = $(SELECTOR.STORE_BUTTONS_COTAINER);
    this.$willSeeVideoList = $(SELECTOR.WILL_SEE_VIDEO_LIST);
    this.$sawVideoList = $(SELECTOR.SAW_VIDEO_LIST);
  }

  setProperties() {
    this.currentStoreType = STORE.WILL_SEE;
    this.videoItemViewLists = {};
    this.videoItemViewLists[STORE.WILL_SEE] = [];
    this.videoItemViewLists[STORE.SAW] = [];
  }

  clickWillSeeButton() {
    this.$willSeeButton.click();
  }

  clickSawButton() {
    this.$sawButton.click();
  }

  showEmptyStorage(bool) {
    bool
      ? $(SELECTOR.EMPTY_CONTAINER).classList.remove(DOM_STRING.HIDE)
      : $(SELECTOR.EMPTY_CONTAINER).classList.add(DOM_STRING.HIDE);
  }

  getRenderedVideoIdList() {
    const currentVideoListElement = this.#getCurrentVideoListElement();
    return [...currentVideoListElement.childNodes].map(videoItem => videoItem.dataset.videoid);
  }

  showSkeletonVideoList(videoList) {
    this.#appendEmptyList(videoList);
    this.#appendVideoItem(videoList);
    this.#showSkeletonTemplate(videoList);
  }

  updateVideoItems(videoListData) {
    if (this.currentStoreType === STORE.WILL_SEE) {
      this.#renderWillSeeVideoItems(videoListData);
      return;
    }
    this.#renderSawVideoItems(videoListData);
  }

  deleteVideoItem(videoElement) {
    const targetIndex = this.videoItemViewLists[this.currentStoreType].findIndex(
      video => video.getElement() === videoElement
    );
    this.videoItemViewLists[this.currentStoreType].splice(targetIndex, 1);
    videoElement.parentNode.removeChild(videoElement);
  }

  bindModalOpenButton(callback) {
    this.$modalOpenButton.addEventListener('click', callback);
  }

  bindStoreTypeButtons(callback) {
    this.$storeButtonsContainer.addEventListener('click', event => {
      this.currentStoreType =
        event.target.id === DOM_STRING.SAW_BUTTON ? STORE.SAW : STORE.WILL_SEE;
      this.#toggleStoreButtons(event.target);
      callback(this.currentStoreType);
    });
  }

  bindVideoItemButtons(callback) {
    [this.$willSeeVideoList, this.$sawVideoList].forEach(videoList =>
      videoList.addEventListener('click', event => {
        if (
          [
            DOM_STRING.CHECK_WILL_SEE_BUTTON,
            DOM_STRING.CHECK_SAW_BUTTON,
            DOM_STRING.DELETE_STORE_BUTTON,
          ].includes(event.target.id)
        ) {
          const videoId = event.target.closest(SELECTOR.VIDEO_ITEM).dataset.videoid;
          callback(event.target.id, videoId, this.currentStoreType);
          this.deleteVideoItem(event.target.closest(SELECTOR.VIDEO_ITEM));
        }
      })
    );
  }

  #getCurrentVideoListElement() {
    if (this.currentStoreType === STORE.WILL_SEE) {
      return this.$willSeeVideoList;
    }
    return this.$sawVideoList;
  }

  #appendEmptyList(videoList) {
    const currentVideoListElement = this.#getCurrentVideoListElement();
    currentVideoListElement.insertAdjacentHTML(
      'beforeend',
      `<li class=${DOM_STRING.VIDEO_ITEM}></li>`.repeat(videoList.length)
    );
  }

  #appendVideoItem(videoList) {
    const currentVideoListElement = this.#getCurrentVideoListElement();
    [...currentVideoListElement.childNodes].slice(-videoList.length).forEach(li => {
      this.videoItemViewLists[this.currentStoreType].push(new VideoItemView(li));
    });
  }

  #showSkeletonTemplate(videoList) {
    this.videoItemViewLists[this.currentStoreType]
      .slice(-videoList.length)
      .forEach(videoItem => videoItem.renderSkeletonTemplate());
  }

  #renderWillSeeVideoItems(videoListData) {
    this.videoItemViewLists[this.currentStoreType]
      .slice(-videoListData.length)
      .forEach((videoItem, index) =>
        videoItem.renderWillSeeVideoItemTemplate(videoListData[index])
      );
  }

  #renderSawVideoItems(videoListData) {
    this.videoItemViewLists[this.currentStoreType]
      .slice(-videoListData.length)
      .forEach((videoItem, index) => videoItem.renderSawVideoItemTemplate(videoListData[index]));
  }

  #toggleStoreButtons(button) {
    button.disabled = true;
    button.classList.add(DOM_STRING.NAV_BUTTON_CLICKED);
    if (button === this.$willSeeButton) {
      this.$sawButton.disabled = false;
      this.$sawButton.classList.remove(DOM_STRING.NAV_BUTTON_CLICKED);
      this.$willSeeVideoList.classList.remove(DOM_STRING.HIDE);
      this.$sawVideoList.classList.add(DOM_STRING.HIDE);
    } else {
      this.$willSeeButton.disabled = false;
      this.$willSeeButton.classList.remove(DOM_STRING.NAV_BUTTON_CLICKED);
      this.$willSeeVideoList.classList.add(DOM_STRING.HIDE);
      this.$sawVideoList.classList.remove(DOM_STRING.HIDE);
    }
  }
}
