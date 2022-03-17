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
    return [...this.$currentVideoList.childNodes].map(videoItem => {
      return videoItem.dataset.videoid;
    });
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
        .forEach((videoItem, index) =>
          videoItem.renderWillSeeVideoItemTemplate(videoListData[index])
        );
    } else {
      this.sawVideoList
        .slice(-videoListData.length)
        .forEach((videoItem, index) => videoItem.renderSawVideoItemTemplate(videoListData[index]));
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
    if (button === this.$willSeeButton) {
      this.$sawButton.disabled = false;
      this.$sawButton.classList.remove('nav__button-clicked');
      this.$willSeeVideoList.classList.remove('display-none');
      this.$sawVideoList.classList.add('display-none');
    } else {
      this.$willSeeButton.disabled = false;
      this.$willSeeButton.classList.remove('nav__button-clicked');
      this.$willSeeVideoList.classList.add('display-none');
      this.$sawVideoList.classList.remove('display-none');
    }
  }

  getRenderedVideoId() {}
}
