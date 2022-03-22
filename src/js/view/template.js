import videoStorage from '../videoStorage.js';
import { DOM_STRING, VIDEO_TYPE } from '../utils/constants.js';

export const videoListTemplate = parseData => {
  return `
  <li class="video-item">
    <img
      src=${parseData.url}
      alt="video-item-thumbnail" class="video-item__thumbnail"
      loading="lazy" />
    <h4 class="video-item__title">${parseData.title}</h4>
    <p class="video-item__channel-name">${parseData.channelTitle}</p>
    <p class="video-item__published-date">${parseData.publishedAt}</p>
    <button data-video-id=${parseData.videoId} class="video-item__save-button button ${
    videoStorage.hasVideo(parseData.videoId) ? `${DOM_STRING.HIDE}` : ''
  }">⬇ 저장</button>
  </li>
  `;
};

export const skeletonTemplate = () => {
  return `
  <li class="video-item">
    <div class="video-item__thumbnail skeleton"></div>
    <div class="video-item__title skeleton"></div>
    <div class="video-item__channel-name skeleton"></div>
    <div class="video-item__published-date skeleton"></div>
    <div class="video-item__save-button skeleton"></div>
  </li>
  `;
};

export const storedVideoListTemplate = video => {
  return `
  <li class="video-item ${video.type}">
    <img
      src=${video.url}
      alt="video-item-thumbnail" class="video-item__thumbnail"
      loading="lazy" />
    <h4 class="video-item__title">${video.title}</h4>
    <p class="video-item__channel-name">${video.channelTitle}</p>
    <p class="video-item__published-date">${video.publishedAt}</p>
    <button data-video-id=${video.videoId} class="switch-show-type button ${
    video.type === VIDEO_TYPE.WATCH_LATER ? '' : 'clicked'
  }">✅</button>
    <button data-video-id=${video.videoId} class="delete-button button">🗑️</button>
  </li>`;
};

export const showVideoTemplate = video => {
  return `
  <li class="video-item ${video.type}">
    <img
      src=${video.url}
      alt="video-item-thumbnail" class="video-item__thumbnail"
      loading="lazy" />
    <h4 class="video-item__title">${video.title}</h4>
    <p class="video-item__channel-name">${video.channelTitle}</p>
    <p class="video-item__published-date">${video.publishedAt}</p>
    <button data-video-id=${video.videoId} class="switch-show-type button ${
    video.type === VIDEO_TYPE.WATCH_LATER ? '' : 'clicked'
  }">✅</button>
    <button data-video-id=${video.videoId} class="delete-button button">🗑️</button>
  </li>`;
};

export const hideVideoTemplate = video => {
  return `
  <li class="video-item ${video.type} hide">
    <img
      src=${video.url}
      alt="video-item-thumbnail" class="video-item__thumbnail"
      loading="lazy" />
    <h4 class="video-item__title">${video.title}</h4>
    <p class="video-item__channel-name">${video.channelTitle}</p>
    <p class="video-item__published-date">${video.publishedAt}</p>
    <button data-video-id=${video.videoId} class="button switch-show-type ${
    video.type === VIDEO_TYPE.WATCH_LATER ? '' : 'clicked'
  }">✅</button>
    <button data-video-id=${video.videoId} class="delete-button button">🗑️</button>
  </li>`;
};
