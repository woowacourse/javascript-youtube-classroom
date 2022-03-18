import { MESSAGE, STORAGE_KEY } from '../constants';
import { $ } from '../utils/dom';
import { store } from '../domain/store';
import { convertToKoreaLocaleDate } from '../utils/common';
import { video } from '../domain/video';

export default class YoutubeClassRoom {
  constructor() {
    this.renderVideoList(false);
    this.addNavTabButtonEvent();
    this.addVideoCheckButtonEvent();
    this.addVideoRemoveButtonEvent();
  }

  reset() {
    $('.classroom-video__list').replaceChildren();
  }

  addNavTabButtonEvent() {
    $('.nav__tab').addEventListener('click', e => {
      this.reset();
      e.target.classList.add('highlight');
      if (e.target === $('#will-watch-video-button')) {
        $('#watched-video-button').classList.remove('highlight');
        this.renderVideoList(false);
        return;
      }
      $('#will-watch-video-button').classList.remove('highlight');
      this.renderVideoList(true);
    });
  }

  addVideoCheckButtonEvent() {
    $('.classroom-video__list').addEventListener('click', e => {
      if (e.target.classList.contains('video-item__check-button')) {
        const videoId = e.target.dataset.videoId;
        video.check(videoId);
        this.renderVideoList(false);
      }
    });
  }

  addVideoRemoveButtonEvent() {
    $('.classroom-video__list').addEventListener('click', e => {
      if (e.target.classList.contains('video-item__remove-button') && confirm(MESSAGE.REMOVE_CONFIRM)) {
        const videoId = e.target.dataset.videoId;
        video.remove(videoId);
        $('#watched-video-button').classList.contains('highlight')
          ? this.renderVideoList(true)
          : this.renderVideoList(false);
      }
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
            <button class="video-item__check-button button" data-video-id="${videoData.videoId}">✅</button>
            <button class="video-item__remove-button button" data-video-id="${videoData.videoId}">🗑️</button>
          </li>`;
      })
      .join('');
  }

  emptyVideoListTemplate() {
    return `
      <div class="empty-result">
        <div class="empty-result__description">
          <p>${MESSAGE.EMPTY_SAVED_VIDEO}</p>
        </div>
      </div>
    `;
  }

  renderVideoList(boolean) {
    const $classroomVideoList = $('.classroom-video__list');
    this.reset();
    const savedVideos = store.getLocalStorage(STORAGE_KEY);
    const filteredVideoList = savedVideos.filter(savedVideo => savedVideo.watched === boolean);
    $classroomVideoList.insertAdjacentHTML(
      'afterbegin',
      filteredVideoList.length > 0 ? this.videoListTemplate(filteredVideoList) : this.emptyVideoListTemplate(),
    );
  }
}
