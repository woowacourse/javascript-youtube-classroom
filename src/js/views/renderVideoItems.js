/* eslint-disable max-lines-per-function */
import { $ } from '../utils/dom';

import {
  MAIN_TO_WATCH_BUTTONS,
  MAIN_WATCHED_BUTTONS,
  MODAL_SAVE_BUTTON,
  SAVED_VIDEO_LIST_KEY,
} from '../constants/constant';

export const insertButtons = (htmlElement, videoId) => {
  if (htmlElement.classList.contains('main__search-result')) {
    if ($('.video-list', htmlElement).classList.contains('watched-video-list')) {
      return MAIN_WATCHED_BUTTONS;
    }
    return MAIN_TO_WATCH_BUTTONS;
  }
  if (htmlElement.classList.contains('modal__search-result')) {
    if (JSON.parse(localStorage.getItem(SAVED_VIDEO_LIST_KEY)).includes(videoId)) {
      return '';
    }
    return MODAL_SAVE_BUTTON;
  }
  return null;
};

export const renderVideoItems = (videos, htmlElement) => {
  const videoListTemplate = videos
    .map(video => {
      return `<li class="video-item" data-video-id="${video.id}">
      <img
        src="${video.thumbnailUrl}"
        alt="video-item-thumbnail" class="video-item__thumbnail" />
      <h4 class="video-item__title">${video.title}</h4>
      <p class="video-item__channel-name">${video.channelTitle}</p>
      <p class="video-item__published-date">${video.publishedAt}</p>
      <p class="buttons-container">${insertButtons(htmlElement, video.id)}</p>
    </li>`;
    })
    .join('\n');
  $('.video-list', htmlElement).insertAdjacentHTML('beforeend', videoListTemplate);
};
