import { store } from '../index.js';
import { increaseSavedVideoCount } from '../redux/action.js';
import {
  VALUES,
  ERROR_MESSAGE,
  LOCALSTORAGE_KEYS,
} from '../constants/constants.js';
import {
  createElement,
  localStorageGetItem,
  localStorageSetItem,
} from '../utils/utils.js';

export default class Video {
  constructor({
    videoId,
    videoTitle,
    channelTitle,
    channelId,
    publishedAt,
    thumbnailURL,
    watched = false,
  }) {
    this.videoId = videoId;
    this.videoTitle = videoTitle;
    this.videoEmbedURL = this.createVideoEmbedURL();
    this.channelTitle = channelTitle;
    this.channelId = channelId;
    this.channelURL = this.createChannelURL();
    this.uploadTime = this.createVideoUploadDate(publishedAt);
    this.thumbnailURL = thumbnailURL;
    this.watched = watched;
  }

  createVideoEmbedURL() {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }

  createChannelURL() {
    return `https://www.youtube.com/channel/${this.channelId}`;
  }

  createVideoUploadDate(date) {
    if (Date.parse(date)) {
      const newDate = new Date(date);
      return `${newDate.getFullYear()}년 ${newDate.getMonth()}월 ${newDate.getDate()}일`;
    }
    return '';
  }

  toJSON() {
    return {
      videoTitle: this.videoTitle,
      videoEmbedURL: this.videoEmbedURL,
      channelTitle: this.channelTitle,
      channelId: this.channelId,
      channelURL: this.channelURL,
      uploadTime: this.uploadTime,
      thumbnailURL: this.thumbnailURL,
      watched: this.watched,
    };
  }

  isSavedVideo() {
    const videos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    return Object.keys(videos).includes(this.videoId);
  }

  onSaveVideo(event) {
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    if (Object.keys(savedVideos).length >= VALUES.MAXIMUM_VIDEO_SAVE_COUNT) {
      alert(ERROR_MESSAGE.MAXIMUM_VIDEO_SAVE_COUNT_ERROR);

      return;
    }

    const newObject = {};
    newObject[this.videoId] = this.toJSON();
    Object.assign(savedVideos, newObject);
    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, savedVideos);

    event.target.classList.add('d-none');
    store.dispatch(increaseSavedVideoCount());
  }

  createIframeSrcdocTemplate() {
    return `
    <style>
      * {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      body {
        height: 100%;
      }

      span {
        position: absolute;
        top: -290%;
        left: 45%;
        color: rgba(238, 238, 238, 0.9);
        font-size: 2rem;
        transition: transform 0.2s ease-in-out;
      }

      span:hover {
        transform: scale(1.6);
      }

      a {
        width: 236px;
        height: 118px;
        position: relative;
        cursor: pointer;
      }
      
      img{
        width:100%; 
        height:118px;
        object-fit: cover;
      }

    </style>
    <a href="${this.videoEmbedURL}?autoplay=1">
      <img src="${this.thumbnailURL}" alt="${this.videoTitle} thumbnail"/>
      <span>►</span>
    </a>`;
  }

  createTemplate(pageType = 'management') {
    const clip = createElement({ tag: 'article', classes: ['clip'] });

    // 초기 생성 : 볼 영상 기준
    if (pageType === 'management' && this.watched) {
      clip.classList.add('d-none');
    }

    clip.dataset.videoId = this.videoId;

    const previewContainer = createElement({
      tag: 'div',
      classes: ['preview-container'],
    });

    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '118px';
    iframe.dataset.srcdoc = this.createIframeSrcdocTemplate();
    iframe.dataset.src = `${this.videoEmbedURL}`;
    iframe.frameBorder = '0';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = 'true';
    iframe.onload = (e) => {
      e.target.classList.add('loaded');
    };

    previewContainer.appendChild(iframe);

    const contentContainer = createElement({
      tag: 'div',
      classes: [
        'content-container',
        'pt-2',
        'd-flex',
        'flex-col',
        'justify-between',
        'w-100',
      ],
    });

    const videoInfo = createElement({
      tag: 'div',
      classes: ['d-flex', 'flex-col', 'video-info'],
    });

    // TODO: 텍스트 인코딩 깨지는거 해결하기
    const videoTitle = createElement({
      tag: 'h3',
      classes: ['video-title'],
      textContent: this.videoTitle,
    });

    const channelURL = createElement({
      tag: 'a',
      classes: ['channel-name', 'mt-1'],
      textContent: this.channelTitle,
    });
    channelURL.href = this.channelURL;
    channelURL.target = '_blank';
    channelURL.rel = 'noopener';

    const meta = createElement({ tag: 'div', classes: ['meta'] });

    const uploadTime = createElement({
      tag: 'p',
      classes: ['line'],
      textContent: this.uploadTime,
    });

    meta.appendChild(uploadTime);

    const buttonContainer =
      pageType === 'management'
        ? this.createManagementButtonSetTemplate()
        : this.createSaveButtonTemplate();

    videoInfo.appendChild(videoTitle);
    videoInfo.appendChild(channelURL);
    videoInfo.appendChild(meta);
    contentContainer.appendChild(videoInfo);
    contentContainer.appendChild(buttonContainer);

    clip.appendChild(previewContainer);
    clip.appendChild(contentContainer);

    return clip;
  }

  createSaveButtonTemplate() {
    const buttonContainer = createElement({
      tag: 'span',
      classes: ['relative'],
    });

    const button = createElement({
      tag: 'button',
      classes: ['save-btn', 'btn'],
      textContent: '⬇️ 저장',
    });

    button.onclick = this.onSaveVideo.bind(this);
    if (this.isSavedVideo()) {
      button.classList.add('d-none');
    }

    buttonContainer.appendChild(button);

    return buttonContainer;
  }

  // TODO: 현재 state 따라서 opacity 조정.
  createManagementButtonSetTemplate() {
    const buttonContainer = createElement({
      tag: 'span',
      classes: ['management-buttons'],
    });

    const watchedButton = createElement({
      tag: 'button',
      classes: ['watched-button'],
      textContent: '✅',
    });
    const likeButton = createElement({
      tag: 'button',
      classes: ['like-button'],
      textContent: '👍',
    });
    const commentButton = createElement({
      tag: 'button',
      classes: ['comment-button'],
      textContent: '💬',
    });
    const deleteButton = createElement({
      tag: 'button',
      classes: ['delete-button'],
      textContent: '🗑️',
    });

    buttonContainer.appendChild(watchedButton);
    buttonContainer.appendChild(likeButton);
    buttonContainer.appendChild(commentButton);
    buttonContainer.appendChild(deleteButton);

    return buttonContainer;
  }
}
