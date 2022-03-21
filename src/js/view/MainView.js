import { DOM_STRING, VIDEO_TYPE } from '../utils/constants.js';
import { $ } from '../utils/common.js';
import videoStorage from '../videoStorage.js';
import emptyImage from '../../assets/images/empty.png';

export default class MainView {
  constructor() {
    this.registerDOM();
    this.renderStoredVideoList();
    this.showType = VIDEO_TYPE.WATCH_LATER;
    this.renderWatchLaterVideos();
    this.decideRenderEmptyImage();
  }

  registerDOM() {
    this.$modalOpenButton = $(DOM_STRING.MODAL_OPEN_BUTTON);
    this.$watchLaterButton = $(DOM_STRING.WATCH_LATER_BUTTON);
    this.$watchedButton = $(DOM_STRING.WATCHED_BUTTON);
    this.$storedVideoList = $(DOM_STRING.STORED_VIDEO_LIST);
    this.$emptyListImage = $(DOM_STRING.EMPTY_LIST_IMAGE);
    this.$emptyListImage.src = emptyImage;
  }

  bindModalOpenButton(callback) {
    this.$modalOpenButton.addEventListener('click', callback);
  }

  bindOnClickWatchLaterButton(callback) {
    this.$watchLaterButton.addEventListener('click', callback);
  }

  bindOnClickWatchedButton(callback) {
    this.$watchedButton.addEventListener('click', callback);
  }

  bindOnClickSwitchButton(callback) {
    this.$storedVideoList.addEventListener('click', callback);
  }

  bindOnClickDeleteButton(callback) {
    this.$storedVideoList.addEventListener('click', callback);
  }

  renderStoredVideoList() {
    const template = videoStorage.getVideoDataList().map(videoData => {
      return `
        <li class="video-item ${videoData.type}">
          <img
            src=${videoData.url}
            alt="video-item-thumbnail" class="video-item__thumbnail"
            loading="lazy" />
          <h4 class="video-item__title">${videoData.title}</h4>
          <p class="video-item__channel-name">${videoData.channelTitle}</p>
          <p class="video-item__published-date">${videoData.publishedAt}</p>
          <button data-videoid=${videoData.videoId} class="switch-show-type button ${
        videoData.type === VIDEO_TYPE.WATCH_LATER ? '' : 'clicked'
      }">✅</button>
          <button data-videoid=${videoData.videoId} class="delete-button button">🗑️</button>
        </li>`;
    });

    this.$storedVideoList.insertAdjacentHTML('beforeend', template.join(''));
  }

  renderWatchLaterVideos() {
    this.showType = VIDEO_TYPE.WATCH_LATER;
    this.$watchLaterButton.classList.add('selected__button');
    this.$watchedButton.classList.remove('selected__button');

    [...this.$storedVideoList.children].forEach(el => {
      if ([...el.classList].includes(VIDEO_TYPE.WATCH_LATER)) {
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
      if ([...el.classList].includes(VIDEO_TYPE.WATCHED)) {
        el.classList.remove(DOM_STRING.HIDE);
        return;
      }
      el.classList.add(DOM_STRING.HIDE);
    });

    this.decideRenderEmptyImage();
  }

  switchRenderingType(e) {
    e.target.parentElement.remove();
    const storedList = videoStorage.getVideoDataList();
    this.renderSwitchedVideoData(storedList[storedList.length - 1]);
    this.decideRenderEmptyImage();
  }

  deleteSelectedVideo(e) {
    e.target.parentElement.remove();
    this.decideRenderEmptyImage();
  }

  renderAddedVideoData(videoData) {
    const template = `
    <li class="video-item ${videoData.type} ${
      this.showType === VIDEO_TYPE.WATCH_LATER ? '' : DOM_STRING.HIDE
    }">
      <img
        src=${videoData.url}
        alt="video-item-thumbnail" class="video-item__thumbnail"
        loading="lazy" />
      <h4 class="video-item__title">${videoData.title}</h4>
      <p class="video-item__channel-name">${videoData.channelTitle}</p>
      <p class="video-item__published-date">${videoData.publishedAt}</p>
      <button data-videoid=${videoData.videoId} class="switch-show-type button ${
      videoData.type === VIDEO_TYPE.WATCH_LATER ? '' : 'clicked'
    }">✅</button>
      <button data-videoid=${videoData.videoId} class="delete-button button">🗑️</button>
    </li>`;

    this.$storedVideoList.insertAdjacentHTML('beforeend', template);
  }

  renderSwitchedVideoData(videoData) {
    const template = `
    <li class="video-item ${videoData.type} hide">
      <img
        src=${videoData.url}
        alt="video-item-thumbnail" class="video-item__thumbnail"
        loading="lazy" />
      <h4 class="video-item__title">${videoData.title}</h4>
      <p class="video-item__channel-name">${videoData.channelTitle}</p>
      <p class="video-item__published-date">${videoData.publishedAt}</p>
      <button data-videoid=${videoData.videoId} class="button switch-show-type ${
      videoData.type === VIDEO_TYPE.WATCH_LATER ? '' : 'clicked'
    }">✅</button>
      <button data-videoid=${videoData.videoId} class="delete-button button">🗑️</button>
    </li>`;

    this.$storedVideoList.insertAdjacentHTML('beforeend', template);
  }

  decideRenderEmptyImage() {
    const checkRendering = [...this.$storedVideoList.children].every(el =>
      [...el.classList].includes(DOM_STRING.HIDE)
    );

    if (checkRendering) {
      this.$emptyListImage.classList.remove(DOM_STRING.HIDE);
      return;
    }
    this.$emptyListImage.classList.add(DOM_STRING.HIDE);
  }
}
