import { $ } from '../utils/dom';
import { video } from '../domain/video';
import { convertToKoreaLocaleDate } from '../utils/common';
import emptyImage from '../../assets/images/empty.png';

export const youtubeClassRoomVideo = {
  reset() {
    $('.classroom-video__list').replaceChildren();
  },

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
  },

  emptyVideoListTemplate() {
    return `
      <div class="empty-result">
        <div class="empty-result__description">
          <img src=${emptyImage}>
        </div>
      </div>
    `;
  },

  renderVideoList(isWatched) {
    const $classroomVideoList = $('.classroom-video__list');
    this.reset();
    const savedVideoList = video.getVideoList();
    const filteredVideoList = savedVideoList.filter(savedVideo => savedVideo.watched === isWatched);
    $classroomVideoList.insertAdjacentHTML(
      'afterbegin',
      filteredVideoList.length > 0 ? this.videoListTemplate(filteredVideoList) : this.emptyVideoListTemplate(),
    );
  },
};
