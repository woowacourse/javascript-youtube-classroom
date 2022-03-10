import { convertYYYYMMDD } from './utils/index.js';

const videoTemplate = (id, snippet) =>
  `<li class="video-item" data-video-id="${id.videoId}">
    <img
      src="${snippet.thumbnails.default.url}"
      alt="video-item-thumbnail" class="video-item__thumbnail">
    <h4 class="video-item__title">[Playlist] ${snippet.title}</h4>
    <p class="video-item__channel-name">${snippet.channelTitle}</p>
    <p class="video-item__published-date">${convertYYYYMMDD(snippet.publishTime)}</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>`;

export default videoTemplate;
