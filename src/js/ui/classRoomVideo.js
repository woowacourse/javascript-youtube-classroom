import { $ } from '../utils/dom';
import { video } from '../domain/video';
import { convertToKoreaLocaleDate } from '../utils/common';
import emptyImage from '../../assets/images/empty.png';

export const classRoomVideo = {
  $classroomVideoList: $('.classroom-video__list'),

  resetVideoList() {
    this.$classroomVideoList.replaceChildren();
  },

  videoListTemplate(videoList) {
    const template = videoList
      .map(videoData => {
        const { videoId, title, channelTitle, publishedDate, thumbnailUrl } = videoData;
        return `
          <li class="video-item">
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" 
            data-thumbnail-url=${thumbnailUrl}>
              <img
                src=${thumbnailUrl}
                alt="video-item-thumbnail" class="video-item__thumbnail"
                >
            </a>
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" data-title=${encodeURIComponent(
          title,
        )}>
              <h4 class="video-item__title">${decodeURIComponent(title)}</h4>
            </a>
            <p class="video-item__channel-name" data-channel-title=${channelTitle}>
            ${decodeURIComponent(channelTitle)}
            </p>
            <p class="video-item__published-date" data-published-date=${publishedDate}>
              ${convertToKoreaLocaleDate(publishedDate)}
            </p>
            <button class="video-item__check-button button" data-video-id="${videoId}">✅</button>
            <button class="video-item__remove-button button" data-video-id="${videoId}">🗑️</button>
          </li>`;
      })
      .join('');

    return template;
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
    const filteredVideoList = video.getFilteredVideoList(isWatched);
    this.$classroomVideoList.insertAdjacentHTML(
      'afterbegin',
      filteredVideoList.length > 0 ? this.videoListTemplate(filteredVideoList) : this.emptyVideoListTemplate(),
    );
  },
};
