import { localStorageManager } from '../components/App.js';
import { store } from '../index.js';
import { increaseSavedVideoCount } from '../redux/action.js';
import {
  VALUES,
  ERROR_MESSAGE,
  LOCALSTORAGE_KEYS,
} from '../constants/constants.js';

export default class Video {
  constructor(item) {
    this.videoId = item.id.videoId;
    this.videoTitle = item.snippet.title;
    this.videoEmbedUrl = this.parseVideoEmbedUrl();
    this.channelTitle = item.snippet.channelTitle;
    this.channelId = item.snippet.channelId;
    this.channelUrl = this.parseChannelUrl();
    this.uploadTime = this.parseVideoUploadDate(item.snippet.publishTime);
  }

  parseVideoEmbedUrl() {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }

  parseChannelUrl() {
    return `https://www.youtube.com/channel/${this.channelId}`;
  }

  parseVideoUploadDate(date) {
    const newDate = new Date(date);

    return `${newDate.getFullYear()}년 ${newDate.getMonth()}월 ${newDate.getDate()}일`;
  }

  toJson() {
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
    const videos = localStorageManager.getItem(LOCALSTORAGE_KEYS.VIDEOS);

    for (const key in videos) {
      if (this.videoId === videos[key].videoId) return true;
    }

    return false;
  }

  onSaveVideo(event) {
    const savedVideos = localStorageManager.getItem(LOCALSTORAGE_KEYS.VIDEOS);

    if (savedVideos.length >= VALUES.MAXIMUM_VIDEO_SAVE_COUNT) {
      alert(ERROR_MESSAGE.MAXIMUM_VIDEO_SAVE_COUNT_ERROR);

      return;
    }

    savedVideos.push(this.toJson());
    localStorageManager.setItem(LOCALSTORAGE_KEYS.VIDEOS, savedVideos);

    event.target.classList.add('d-none');
    store.dispatch(increaseSavedVideoCount());
  }

  createTemplate() {
    const fragment = document.createDocumentFragment();
    const clip = document.createElement('article');
    clip.classList.add(...['clip', 'd-none']);

    const previewContainer = document.createElement('div');
    previewContainer.classList.add(...['preview-container']);

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

    const contentContainer = document.createElement('div');
    contentContainer.classList.add(
      ...[
        'content-container',
        'pt-2',
        'd-flex',
        'flex-col',
        'justify-between',
        'w-100',
      ]
    );

    const videoInfo = document.createElement('div');
    videoInfo.classList.add(...['d-flex', 'flex-col', 'video-info']);

    // TODO: 텍스트 인코딩 깨지는거 해결하기
    const videoTitle = document.createElement('h3');
    videoTitle.classList.add(...['video-title']);
    videoTitle.textContent = this.videoTitle;

    const channelUrl = document.createElement('a');
    channelUrl.href = this.channelUrl;
    channelUrl.target = '_blank';
    channelUrl.classList.add(...['channel-name', 'mt-1']);
    channelUrl.textContent = this.channelTitle;

    const meta = document.createElement('div');
    meta.classList.add('meta');

    const uploadTime = document.createElement('p');
    uploadTime.textContent = this.uploadTime;
    uploadTime.classList.add('line');

    meta.appendChild(uploadTime);

    const button = document.createElement('button');
    button.classList.add(...['save-btn', 'btn']);
    if (this.isSavedVideo()) button.classList.add('d-none');
    button.textContent = '⬇️ 저장';
    button.onclick = this.onSaveVideo.bind(this);

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
