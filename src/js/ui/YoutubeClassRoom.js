import { STORAGE_KEY } from '../constants';
import { $ } from '../utils/dom';
import { store } from '../domain/store';
import { convertToKoreaLocaleDate } from '../utils/common';

export default class YoutubeClassRoom {
  constructor() {
    this.renderWillWatchVideoList();

    $('#will-watch-video-button').addEventListener('click', e => {
      $('.will-watch-video-list').replaceChildren();
      $('.watched-video-list').replaceChildren();
      e.target.classList.add('highlight');
      $('#watched-video-button').classList.remove('highlight');
      this.renderWillWatchVideoList();
    });

    $('#watched-video-button').addEventListener('click', e => {
      $('.watched-video-list').replaceChildren();
      $('.will-watch-video-list').replaceChildren();
      e.target.classList.add('highlight');
      $('#will-watch-video-button').classList.remove('highlight');
      this.renderWatchedVideoList();
    });
  }

  renderWillWatchVideoList() {
    const savedVideos = store.getLocalStorage(STORAGE_KEY);
    const filterWillWatchVideoList = savedVideos.filter(savedVideo => savedVideo.watched === false);

    const template = filterWillWatchVideoList
      .map(videoData => {
        return `
      <li class="video-item">
        <a href="https://www.youtube.com/watch?v=${videoData.videoId}" target="_blank" 
        data-thumbnails-high-url=${videoData.thumbnailsHighUrl}>
          <img
            src=${videoData.thumbnailsHighUrl}
            alt="video-item-thumbnail" class="video-item__thumbnail"
            >
        </a>
        <a href="https://www.youtube.com/watch?v=${videoData.videoId}" target="_blank" data-title=${encodeURIComponent(
          videoData.title,
        )}>
          <h4 class="video-item__title">${decodeURIComponent(videoData.title)}</h4>
        </a>
        <p class="video-item__channel-name" data-channel-title=${videoData.channelTitle}>
        ${decodeURIComponent(videoData.channelTitle)}
        </p>
        <p class="video-item__published-date" data-published-date=${videoData.publishedDate}>
          ${convertToKoreaLocaleDate(videoData.publishedDate)}
        </p>
        <button class="video-item__check-button button">✅</button>
        <button class="video-item__remove-button button">🗑️</button>
      </li>`;
      })
      .join('');

    $('.will-watch-video-list').insertAdjacentHTML(
      'afterbegin',
      filterWillWatchVideoList.length > 0 ? template : this.emptyVideoListTemplate(),
    );
  }

  renderWatchedVideoList() {
    const savedDatas = store.getLocalStorage(STORAGE_KEY);
    const filterWatchedVideoList = savedDatas.filter(savedData => savedData.watched === true);

    const template = filterWatchedVideoList
      .map(videoData => {
        return `
      <li class="video-item">
        <a href="https://www.youtube.com/watch?v=${videoData.videoId}" target="_blank" 
        data-thumbnails-high-url=${videoData.thumbnailsHighUrl}>
          <img
            src=${videoData.thumbnailsHighUrl}
            alt="video-item-thumbnail" class="video-item__thumbnail"
            >
        </a>
        <a href="https://www.youtube.com/watch?v=${videoData.videoId}" target="_blank" data-title=${encodeURIComponent(
          videoData.title,
        )}>
          <h4 class="video-item__title">${decodeURIComponent(videoData.title)}</h4>
        </a>
        <p class="video-item__channel-name" data-channel-title=${videoData.channelTitle}>
        ${decodeURIComponent(videoData.channelTitle)}
        </p>
        <p class="video-item__published-date" data-published-date=${videoData.publishedDate}>
          ${convertToKoreaLocaleDate(videoData.publishedDate)}
        </p>
        <button class="video-item__check-button button highlight">✅</button>
        <button class="video-item__remove-button button">🗑️</button>
      </li>`;
      })
      .join('');

    $('.watched-video-list').insertAdjacentHTML(
      'afterbegin',
      filterWatchedVideoList.length > 0 ? template : this.emptyVideoListTemplate(),
    );
  }

  emptyVideoListTemplate() {
    const template = `
    <div class="empty-result">
      <div class="empty-result__description">
        <p>저장된 동영상이 없습니다.</p>
      </div>
    </div>
    `;

    return template;
  }
}
