import notFoundImage from '../../assets/images/not_found.jpg';

import { VIDEOS_TYPE, VIDEO_COUNT } from './constants.js';

export const myVideoTemplate = (
  { videoId, thumbnail, title, channelTitle, publishTime },
  currentFilter
) => {
  return `
  <li class="video-item" data-video-id=${videoId}>
    <img src=${thumbnail} alt="video-item-thumbnail" class="video-item__thumbnail" />
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime}</p>
    <div class="video-item__button-container">
      ${
        currentFilter === VIDEOS_TYPE.VIEWED_VIDEOS
          ? '<button type="button" class="video-item__view-uncheck-button button">✅</button>'
          : '<button type="button" class="video-item__view-check-button button">✅</button>'
      }
      <button type="button" class="video-item__delete-button button">🗑️</button>
    </div>
  </li>
  `;
};

export const NO_RESULT_TEMPLATE = `
  <div class="no-result">
    <img src=${notFoundImage} alt="no result image" class="no-result__image">
  </div>
`;

export const SKELETON_TEMPLATE = `
<li class="video-item skeleton" data-video-id="">
  <div class="image-wrapper">
    <img
      src=${notFoundImage}
      alt="video-item-thumbnail" class="video-item__thumbnail">
  </div>
  <h4 class="video-item__title"></h4>
  <p class="video-item__channel-name"></p>
  <p class="video-item__published-date"></p>
  <button type="button" class="video-item__save-button button">⬇ 저장</button>
</li>
`.repeat(VIDEO_COUNT);

export const VIDEO_LIST_TEMPLATE = '<ul class="video-list"></ul>';
