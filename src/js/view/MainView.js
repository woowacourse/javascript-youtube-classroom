import { DOM_STRING, VIDEO_TYPE } from '../utils/constants.js';
import { $ } from '../utils/common.js';
import videoStorage from '../videoStorage.js';
import emptyImage from '../../assets/images/empty.png';
import { showVideoTemplate, storedVideoListTemplate, hideVideoTemplate } from './template.js';

export default class MainView {
  #showType = VIDEO_TYPE.WATCH_LATER;

  constructor() {
    this.registerDOM();
    this.renderStoredVideoList();
    this.renderWatchLaterVideos();
    this.decideRenderEmptyImage();
  }

  get showType() {
    return this.#showType;
  }

  set showType(type) {
    if (this.#showType === type) {
      return;
    }
    if (type !== VIDEO_TYPE.WATCH_LATER && type !== VIDEO_TYPE.WATCHED) {
      return;
    }
    this.#showType = type;
  }

  registerDOM() {
    this.$modalOpenButton = $(DOM_STRING.MODAL_OPEN_BUTTON);
    this.$watchLaterButton = $(DOM_STRING.WATCH_LATER_BUTTON);
    this.$watchedButton = $(DOM_STRING.WATCHED_BUTTON);
    this.$storedVideoList = $(DOM_STRING.STORED_VIDEO_LIST);
    this.$emptyListImage = $(DOM_STRING.EMPTY_LIST_IMAGE);
    this.$emptyListImage.src = emptyImage;
  }

  renderStoredVideoList() {
    const template = videoStorage.getVideoList().map(videoData => {
      return storedVideoListTemplate(videoData);
    });

    this.$storedVideoList.insertAdjacentHTML('beforeend', template.join(''));
  }

  renderWatchLaterVideos() {
    this.showType = VIDEO_TYPE.WATCH_LATER;
    this.$watchLaterButton.classList.add('selected__button');
    this.$watchedButton.classList.remove('selected__button');

    [...this.$storedVideoList.children].forEach(el => {
      if (el.classList.contains(VIDEO_TYPE.WATCH_LATER)) {
        el.classList.remove(DOM_STRING.HIDE);
        return;
      }
      el.classList.add(DOM_STRING.HIDE);
    });

    this.decideRenderEmptyImage();
  }

  renderWatchedVideos() {
    this.showType = VIDEO_TYPE.WATCHED;
    this.$watchedButton.classList.add('selected__button');
    this.$watchLaterButton.classList.remove('selected__button');

    [...this.$storedVideoList.children].forEach(el => {
      if (el.classList.contains(VIDEO_TYPE.WATCHED)) {
        el.classList.remove(DOM_STRING.HIDE);
        return;
      }
      el.classList.add(DOM_STRING.HIDE);
    });

    this.decideRenderEmptyImage();
  }

  switchRenderingType(e) {
    const selectedVideoDOM = e.target.parentElement;
    const storedList = videoStorage.getVideoList();
    const switchedVideo = storedList[storedList.length - 1];

    selectedVideoDOM.remove();
    this.renderSwitchedVideo(switchedVideo);
    this.decideRenderEmptyImage();
  }

  deleteSelectedVideo(e) {
    e.target.parentElement.remove();
    this.decideRenderEmptyImage();
  }

  renderAddedVideo(video) {
    const template =
      this.showType === VIDEO_TYPE.WATCHED ? hideVideoTemplate(video) : showVideoTemplate(video);

    this.$storedVideoList.insertAdjacentHTML('beforeend', template);
  }

  renderSwitchedVideo(video) {
    const template = hideVideoTemplate(video);

    this.$storedVideoList.insertAdjacentHTML('beforeend', template);
  }

  decideRenderEmptyImage() {
    const checkRendering = [...this.$storedVideoList.children].every(el =>
      el.classList.contains(DOM_STRING.HIDE)
    );

    this.$emptyListImage.classList.toggle(DOM_STRING.HIDE, !checkRendering);
  }
}
