import { STORAGE_KEY } from '../constants';
import { $ } from '../utils/dom';
import { store } from '../domain/store';
import { convertToKoreaLocaleDate } from '../utils/common';

export default class YoutubeClassRoom {
  constructor() {
    this.renderVideoList(false, '.will-watch-video-list');
    this.addWillWatchVideoButtonEvent();
    this.addWatchedVideoButtonEvent();
  }

  reset() {
    $('.will-watch-video-list').replaceChildren();
    $('.watched-video-list').replaceChildren();
  }

  addWillWatchVideoButtonEvent() {
    $('#will-watch-video-button').addEventListener('click', e => {
      this.reset();
      e.target.classList.add('highlight');
      $('#watched-video-button').classList.remove('highlight');
      this.renderVideoList(false, '.will-watch-video-list');
    });
  }

  addWatchedVideoButtonEvent() {
    $('#watched-video-button').addEventListener('click', e => {
      this.reset();
      e.target.classList.add('highlight');
      $('#will-watch-video-button').classList.remove('highlight');
      this.renderVideoList(true, '.watched-video-list');
    });
  }

  videoListTemplate(videoList) {
    return videoList
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
            <a href="https://www.youtube.com/watch?v=${
              videoData.videoId
            }" target="_blank" data-title=${encodeURIComponent(videoData.title)}>
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
  }

  emptyVideoListTemplate() {
    return `
    <div class="empty-result">
      <div class="empty-result__description">
        <p>저장된 동영상이 없습니다.</p>
      </div>
    </div>
    `;
  }

  renderVideoList(boolean, selector) {
    const savedVideos = store.getLocalStorage(STORAGE_KEY);
    const filteredVideoList = savedVideos.filter(savedVideo => savedVideo.watched === boolean);
    $(selector).insertAdjacentHTML(
      'afterbegin',
      filteredVideoList.length > 0 ? this.videoListTemplate(filteredVideoList) : this.emptyVideoListTemplate(),
    );
  }
}
