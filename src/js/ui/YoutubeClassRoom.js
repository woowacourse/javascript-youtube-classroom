import { STORAGE_KEY } from '../constants';
import { $ } from '../utils/dom';
import { store } from '../domain/store';
import { convertToKoreaLocaleDate } from '../utils/common';

export default class YoutubeClassRoom {
  constructor() {
    this.renderWillWatchVideoList();

    $('#will-watch-video-button').addEventListener('click', e => {
      e.target.classList.add('highlight');
      $('#watched-video-button').classList.remove('highlight');
      this.renderWillWatchVideoList();
    });

    $('#watched-video-button').addEventListener('click', e => {
      e.target.classList.add('highlight');
      $('#will-watch-video-button').classList.remove('highlight');
      this.renderWatchedVideoList();
    });
  }

  renderInitial() {}

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

    $('.will-watch-video-list').insertAdjacentHTML('afterbegin', template);
  }

  renderWatchedVideoList() {
    const savedDatas = store.getLocalStorage(STORAGE_KEY);
    const filterWatchedVideoList = savedDatas.filter(savedData => savedData.watched === true);
  }

  renderEmptyVideoList() {
    const template = `
    <div class="no-result">
      <img class="no-result__image"
        src=${NoResultImage}
        alt="no-result-image"
      >
      <div class="no-result__description">
        <p>${MESSAGE.NOT_FOUND}</p>
        <p>${MESSAGE.OTHER_KEYWORD}</p>
      </div>
    </div>
    `;

    return template;
  }
}
