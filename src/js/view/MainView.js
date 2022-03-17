import { SELECTOR } from '../utils/constants.js';
import { $ } from '../utils/common.js';
import { DOM_STRING } from '../utils/constants.js';
import VideoItemView from './VideoItemView.js';

export default class MainView {
  constructor() {
    this.registerDOM();
    this.$currentVideoList = this.$willSeeVideoList;
    this.willSeeVideoList = [];
    this.sawVideoList = [];
  }

  registerDOM() {
    this.$modalOpenButton = $(SELECTOR.MODAL_OPEN_BUTTON);
    this.$willSeeButton = $('#will-see-button');
    this.$sawButton = $('#saw-button');
    this.$willSeeVideoList = $('#will-see-video-list');
    this.$sawVideoList = $('#saw-video-list');
  }

  getRenderedVideoIdList() {
    return [...this.$currentVideoList.childNodes].map(videoItem => {
      return videoItem.dataset.videoid;
    });
  }

  showSkeletonVideoList(videoList) {
    this.$currentVideoList.insertAdjacentHTML(
      'beforeend',
      `<li class=${DOM_STRING.VIDEO_ITEM}></li>`.repeat(videoList.length)
    );
    [...this.$currentVideoList.childNodes].slice(-videoList.length).forEach(li => {
      if (this.$currentVideoList === this.$willSeeVideoList) {
        this.willSeeVideoList.push(new VideoItemView(li));
      } else {
        this.sawVideoList.push(new VideoItemView(li));
      }
    });
    if (this.$currentVideoList === this.$willSeeVideoList) {
      this.willSeeVideoList
        .slice(-videoList.length)
        .forEach(videoItem => videoItem.renderSkeletonTemplate());
    } else {
      this.sawVideoList
        .slice(-videoList.length)
        .forEach(videoItem => videoItem.renderSkeletonTemplate());
    }
  }

  updateVideoItems(videoListData) {
    if (this.$currentVideoList === this.$willSeeVideoList) {
      this.willSeeVideoList
        .slice(-videoListData.length)
        .forEach((videoItem, index) =>
          videoItem.renderWillSeeVideoItemTemplate(videoListData[index])
        );
    } else {
      this.sawVideoList
        .slice(-videoListData.length)
        .forEach((videoItem, index) => videoItem.renderSawVideoItemTemplate(videoListData[index]));
    }
  }

  bindVideoItemButton(callback) {
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
          callback(event.target.id, videoId);
          this.deleteVideoItem(event.target.closest(SELECTOR.VIDEO_ITEM));
        }
      })
    );
  }

  deleteVideoItem(videoElement) {
    if (this.$currentVideoList === this.$willSeeVideoList) {
      const targetIndex = this.willSeeVideoList.findIndex(
        video => video.getElement() === videoElement
      );
      this.willSeeVideoList.splice(targetIndex, 1);
    } else {
      const targetIndex = this.sawVideoList.findIndex(video => video.getElement() === videoElement);
      this.sawVideoList.splice(targetIndex, 1);
    }
    videoElement.parentNode.removeChild(videoElement);
  }

  bindModalOpenButton(callback) {
    this.$modalOpenButton.addEventListener('click', callback);
  }

  bindWillSeeButton(callback) {
    this.$willSeeButton.addEventListener('click', event => {
      this.$currentVideoList = this.$willSeeVideoList;
      this.toggleStoreButtons(event.target);
      callback();
    });
  }

  bindSawButton(callback) {
    this.$sawButton.addEventListener('click', event => {
      this.$currentVideoList = this.$sawVideoList;
      this.toggleStoreButtons(event.target);
      callback(event.target);
    });
  }

  toggleStoreButtons(button) {
    button.disabled = true;
    button.classList.add('nav__button-clicked');
    if (button === this.$willSeeButton) {
      this.$sawButton.disabled = false;
      this.$sawButton.classList.remove('nav__button-clicked');
      this.$willSeeVideoList.classList.remove(DOM_STRING.HIDE);
      this.$sawVideoList.classList.add(DOM_STRING.HIDE);
    } else {
      this.$willSeeButton.disabled = false;
      this.$willSeeButton.classList.remove('nav__button-clicked');
      this.$willSeeVideoList.classList.add(DOM_STRING.HIDE);
      this.$sawVideoList.classList.remove(DOM_STRING.HIDE);
    }
  }
}
