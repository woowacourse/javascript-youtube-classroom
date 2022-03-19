import { DOM_STRING } from '../utils/constants.js';
import { $ } from '../utils/common.js';
import videoStorage from '../videoStorage.js';
import emptyImage from '../../assets/images/empty.png';

export default class MainView {
  constructor() {
    this.registerDOM();
    this.renderStoredVideoList();
    this.showType = 'watch-later';
    this.bindOnClickWatchLaterButton();
    this.onClickWatchLaterButton();
    this.bindOnClickWatchedButton();
    this.bindOnClickSwitchButton();
    this.bindOnClickDeleteButton();
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

  bindOnClickWatchLaterButton() {
    this.$watchLaterButton.addEventListener('click', this.onClickWatchLaterButton.bind(this));
  }

  bindOnClickWatchedButton() {
    this.$watchedButton.addEventListener('click', this.onClickWatchedButton.bind(this));
  }

  bindOnClickSwitchButton() {
    this.$storedVideoList.addEventListener('click', e => {
      if ([...e.target.classList].includes('switch-show-type')) {
        const videoId = e.target.dataset.videoid;
        videoStorage.switchType(videoId);
        e.target.parentElement.remove();
        const storedList = videoStorage.getVideoDataList();
        this.renderSwitchedVideoData(storedList[storedList.length - 1]);
        this.decideRenderEmptyImage();
      }
    });
  }

  bindOnClickDeleteButton() {
    this.$storedVideoList.addEventListener('click', e => {
      if ([...e.target.classList].includes('delete-button')) {
        if (confirm('삭제 하시겠습니까?')) {
          const videoId = e.target.dataset.videoid;
          videoStorage.deleteVideoData(videoId);
          e.target.parentElement.remove();
          this.decideRenderEmptyImage();
        }
      }
    });
  }

  renderStoredVideoList() {
    const storedVideoList = videoStorage.getVideoDataList();
    storedVideoList.forEach(videoData => {
      const template = `
        <li class="video-item ${videoData.type}">
          <img
            src=${videoData.url}
            alt="video-item-thumbnail" class="video-item__thumbnail"
            loading="lazy" />
          <h4 class="video-item__title">${videoData.title}</h4>
          <p class="video-item__channel-name">${videoData.channelTitle}</p>
          <p class="video-item__published-date">${videoData.publishedAt}</p>
          <button data-videoid=${videoData.videoId} class="switch-show-type button ${
        videoData.type === 'watch-later' ? '' : 'clicked'
      }">✅</button>
          <button data-videoid=${videoData.videoId} class="delete-button button">🗑️</button>
        </li>`;

      this.$storedVideoList.insertAdjacentHTML('beforeend', template);
    });
  }

  onClickWatchLaterButton() {
    this.showType = 'watch-later';
    this.$watchLaterButton.classList.add('selected__button');
    this.$watchedButton.classList.remove('selected__button');
    [...this.$storedVideoList.children].forEach(el => {
      if ([...el.classList].includes('watch-later')) {
        el.classList.remove('hide');
        return;
      }
      el.classList.add('hide');
    });
    this.decideRenderEmptyImage();
  }

  onClickWatchedButton() {
    this.showType = 'watched';
    this.$watchedButton.classList.add('selected__button');
    this.$watchLaterButton.classList.remove('selected__button');
    [...this.$storedVideoList.children].forEach(el => {
      if ([...el.classList].includes('watched')) {
        el.classList.remove('hide');
        return;
      }
      el.classList.add('hide');
    });
    this.decideRenderEmptyImage();
  }

  renderAddedVideoData(videoData) {
    const template = `
    <li class="video-item ${videoData.type} ${this.showType === 'watch-later' ? '' : 'hide'}">
      <img
        src=${videoData.url}
        alt="video-item-thumbnail" class="video-item__thumbnail"
        loading="lazy" />
      <h4 class="video-item__title">${videoData.title}</h4>
      <p class="video-item__channel-name">${videoData.channelTitle}</p>
      <p class="video-item__published-date">${videoData.publishedAt}</p>
      <button data-videoid=${videoData.videoId} class="button switch-show-type ${
      videoData.type === 'watch-later' ? '' : 'clicked'
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
      videoData.type === 'watch-later' ? '' : 'clicked'
    }">✅</button>
      <button data-videoid=${videoData.videoId} class="delete-button button">🗑️</button>
    </li>`;

    this.$storedVideoList.insertAdjacentHTML('beforeend', template);
  }

  decideRenderEmptyImage() {
    const checkRendering = [...this.$storedVideoList.children].every(el =>
      [...el.classList].includes('hide')
    );

    if (checkRendering) {
      this.$emptyListImage.classList.remove('hide');
      return;
    }
    this.$emptyListImage.classList.add('hide');
  }
}
