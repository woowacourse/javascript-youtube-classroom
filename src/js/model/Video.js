import { store } from '../index.js';
import { increaseSavedVideoCount } from '../redux/action.js';
import {
  VALUES,
  ERROR_MESSAGE,
  LOCALSTORAGE_KEYS,
} from '../constants/constants.js';
import { createElement, localStorageGetItem, localStorageSetItem } from '../utils/utils.js';

export default class Video {
  constructor(videoInfo) {
    this.videoId = videoInfo.id.videoId;
    this.videoTitle = videoInfo.snippet.title;
    this.videoEmbedUrl = this.createVideoEmbedUrl();
    this.channelTitle = videoInfo.snippet.channelTitle;
    this.channelId = videoInfo.snippet.channelId;
    this.channelUrl = this.createChannelUrl();
    this.uploadTime = this.createVideoUploadDate(videoInfo.snippet.publishedAt);
  }

  createVideoEmbedUrl() {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }

  createChannelUrl() {
    return `https://www.youtube.com/channel/${this.channelId}`;
  }

  createVideoUploadDate(date) {
    if(Date.parse(date)){
      const newDate = new Date(date);
      return `${newDate.getFullYear()}년 ${newDate.getMonth()}월 ${newDate.getDate()}일`;
    }
    return ''
  }

  toJSON() {
    return {
      videoId: this.videoId,
      videoTitle: this.videoTitle,
      videoEmbedUrl: this.videoEmbedUrl,
      channelTitle: this.channelTitle,
      channelId: this.channelId,
      channelUrl: this.channelUrl,
      uploadTime: this.uploadTime,
    };
  }

  isSavedVideo() {
    const videos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    for (const key in videos) {
      if (this.videoId === videos[key].videoId) return true;
    }

    return false;
  }

  onSaveVideo(event) {
    const savedVideos = localStorageGetItem(LOCALSTORAGE_KEYS.VIDEOS);

    if (savedVideos.length >= VALUES.MAXIMUM_VIDEO_SAVE_COUNT) {
      alert(ERROR_MESSAGE.MAXIMUM_VIDEO_SAVE_COUNT_ERROR);

      return;
    }

    savedVideos.push(this.toJSON());
    localStorageSetItem(LOCALSTORAGE_KEYS.VIDEOS, savedVideos);

    event.target.classList.add('d-none');
    store.dispatch(increaseSavedVideoCount());
  }

  createTemplate() {
    const fragment = document.createDocumentFragment();
    const clip = createElement({ tag: 'article', classes: ['clip', 'd-none'] });

    const previewContainer = createElement({
      tag: 'div',
      classes: ['preview-container'],
    });

    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '118';
    iframe.src = `${this.videoEmbedUrl}`;
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

    const channelUrl = createElement({
      tag: 'a',
      classes: ['channel-name', 'mt-1'],
      textContent: this.channelTitle,
    });
    channelUrl.href = this.channelUrl;
    channelUrl.target = '_blank';
    channelUrl.rel = "noopener";

    const meta = createElement({ tag: 'div', classes: ['meta'] });

    const uploadTime = createElement({
      tag: 'p',
      classes: ['line'],
      textContent: this.uploadTime,
    });

    meta.appendChild(uploadTime);

    const button = createElement({
      tag: 'button',
      classes: ['save-btn', 'btn'],
      textContent: '⬇️ 저장',
    });
    button.onclick = this.onSaveVideo.bind(this);
    if (this.isSavedVideo()) {
      button.classList.add('d-none');
    }

    videoInfo.appendChild(videoTitle);
    videoInfo.appendChild(channelUrl);
    videoInfo.appendChild(meta);
    contentContainer.appendChild(videoInfo);
    contentContainer.appendChild(button);

    clip.appendChild(previewContainer);
    clip.appendChild(contentContainer);

    fragment.appendChild(clip);

    return fragment;
  }
}
