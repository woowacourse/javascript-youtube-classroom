import {
  LOCALSTORAGE_KEYS,
  CLASS_NAMES,
  TYPES,
} from '../constants/constants.js';
import {
  createElement,
  localStorageGetItem,
  unescapeString,
} from '../utils/utils.js';

export default class Video {
  static cache = {};

  constructor({
    videoId,
    videoTitle,
    channelTitle,
    channelId,
    publishedAt,
    thumbnailURL,
    watched = false,
    liked = false,
  }) {
    this.videoId = videoId;
    this.videoTitle = unescapeString(videoTitle);
    this.videoEmbedURL = this.createVideoEmbedURL();
    this.channelTitle = unescapeString(channelTitle);
    this.channelId = channelId;
    this.channelURL = this.createChannelURL();
    this.uploadTime = this.createVideoUploadDate(publishedAt);
    this.thumbnailURL = thumbnailURL;
    this.watched = watched;
    this.liked = liked;

    if (Video.cache[this.videoId]) return;
    Video.cache[this.videoId] = this.toJSON();
  }

  createVideoEmbedURL() {
    return `https://www.youtube.com/embed/${this.videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`;
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
      liked: this.liked,
    };
  }

  isSavedVideo() {
    const videos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    return Object.keys(videos).includes(this.videoId);
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

  createTemplate(pageType = TYPES.PAGE.MANAGEMENT) {
    const clip = createElement({
      tag: 'article',
      classes: ['clip', 'd-flex', 'flex-col'],
    });

    if (pageType === TYPES.PAGE.MANAGEMENT && this.watched) {
      clip.classList.add('d-none');
    }

    clip.dataset.videoId = this.videoId;

    const previewContainer = createElement({
      tag: 'div',
      classes: [CLASS_NAMES.CLIP.PREVIEW_CONTAINER],
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
    iframe.allowscriptaccess = 'always';

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
        'flex-grow',
        'px-1',
      ],
    });

    const videoInfo = createElement({
      tag: 'div',
      classes: ['d-flex', 'flex-col', 'video-info'],
    });

    const videoTitle = createElement({
      tag: 'h3',
      classes: [CLASS_NAMES.CLIP.TITLE],
      textContent: this.videoTitle,
    });

    const channelURL = createElement({
      tag: 'a',
      classes: [CLASS_NAMES.CLIP.CHANNEL_NAME, 'mt-1'],
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
      pageType === TYPES.PAGE.MANAGEMENT
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
      classes: ['d-flex', 'justify-end'],
    });

    const saveButton = createElement({
      tag: 'button',
      classes: [CLASS_NAMES.CLIP.VIDEO_SAVE_BUTTON, 'btn'],
      textContent: '⬇️ 저장',
    });

    if (this.isSavedVideo()) {
      saveButton.classList.add('d-none');
    }

    saveButton.dataset.eventName = 'save';
    buttonContainer.appendChild(saveButton);

    return buttonContainer;
  }

  createManagementButtonSetTemplate() {
    const buttonContainer = createElement({
      tag: 'span',
      classes: [CLASS_NAMES.CLIP.MANAGEMENT_BUTTONS, 'd-flex', 'justify-end'],
    });

    const watchedButton = createElement({
      tag: 'button',
      classes: [CLASS_NAMES.CLIP.WATCHED_BUTTON, 'scale-hover'],
      textContent: '✅',
    });
    const likeButton = createElement({
      tag: 'button',
      classes: [CLASS_NAMES.CLIP.LIKE_BUTTON, 'scale-hover'],
      textContent: '👍',
    });
    const deleteButton = createElement({
      tag: 'button',
      classes: [CLASS_NAMES.CLIP.DELETE_BUTTON, 'scale-hover'],
      textContent: '🗑️',
    });

    this.watched && watchedButton.classList.add('checked');
    this.liked && likeButton.classList.add('checked');

    watchedButton.dataset.eventName = 'watched';
    likeButton.dataset.eventName = 'like';
    deleteButton.dataset.eventName = 'delete';

    buttonContainer.appendChild(watchedButton);
    buttonContainer.appendChild(likeButton);
    buttonContainer.appendChild(deleteButton);

    return buttonContainer;
  }
}
