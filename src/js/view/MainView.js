import { DOM_STRING } from '../utils/constants.js';
import { $ } from '../utils/common.js';
import { CLASS_NAME_STRING } from '../utils/constants.js';
import VideoItemView from './VideoItemView.js';

export default class MainView {
  constructor() {
    this.registerDOM();
    this.willSeeVideoList = [];
    this.sawVideoList = [];
  }

  registerDOM() {
    this.$modalOpenButton = $(DOM_STRING.MODAL_OPEN_BUTTON);
    this.$willSeeButton = $('#will-see-button');
    this.$sawButton = $('#saw-button');
    this.$willSeeVideoList = $('#will-see-video-list');
    this.$sawVideoList = $('#saw-video-list');
    this.$currentVideoList = this.$willSeeVideoList;
  }

  getRenderedVideoIdList() {
    if (this.$currentVideoList === this.$willSeeVideoList) {
      return [...this.$currentVideoList.childNodes].map(videoItem => {
        return videoItem;
      });
    } else {
      this.sawVideoList.push(new VideoItemView(li));
    }
  }

  showSkeletonVideoList(videoList) {
    this.$currentVideoList.insertAdjacentHTML(
      'beforeend',
      `<li class=${CLASS_NAME_STRING.VIDEO_ITEM}></li>`.repeat(videoList.length)
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
        .forEach((videoItem, index) => videoItem.renderVideoItemTemplate(videoListData[index]));
    } else {
      this.sawVideoList
        .slice(-videoListData.length)
        .forEach((videoItem, index) => videoItem.renderVideoItemTemplate(videoListData[index]));
    }
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
    button.classList.remove('display-none');
    if (button === this.$willSeeButton) {
      this.$sawButton.disabled = false;
      this.$sawButton.classList.remove('nav__button-clicked');
      this.$sawButton.classList.add('display-none');
    } else {
      this.$willSeeButton.disabled = false;
      this.$willSeeButton.classList.remove('nav__button-clicked');
      this.$willSeeButton.classList.add('display-none');
    }
  }

  getRenderedVideoId() {}
}
