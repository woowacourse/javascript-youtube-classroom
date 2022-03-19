import notFoundImage from '../../assets/images/not_found.jpg';
import serverErrorImage from '../../assets/images/server_error.jpg';
import { VIDEO_COUNT } from '../util/constants';

export const NO_RESULT_TEMPLATE = `
  <img src=${notFoundImage} alt="no result image" class="no-result__image">
`;

export const SERVER_ERROR_TEMPLATE = ` 
  <img src=${serverErrorImage} alt="no result image" class="no-result__error-image">
  <span>앗...현재는 서버 점검중입니다~ ∑(O_O;)</span>
`;

const PLAIN_TEXT = '---------';

export const SKELETON_TEMPLATE = `
  <li class="video-item skeleton" data-video-id="">
    <div id="image-wrapper">
      <img
        src=${notFoundImage}
        alt="video-item-thumbnail" class="video-item__thumbnail">
    </div>
    <h4 class="video-item__title">${PLAIN_TEXT}</h4>
    <p class="video-item__channel-name">${PLAIN_TEXT}</p>
    <p class="video-item__published-date">${PLAIN_TEXT}</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>
`.repeat(VIDEO_COUNT);

export const getVideoItemTemplate = ({ channelTitle, publishTime, title, videoId, isWatched }) => `
  <li class="video-item" data-video-id=${videoId}>
    <div id="image-wrapper">
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        alt="video-item-thumbnail" class="video-item__thumbnail">
      </iframe>
    </div>
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime}</p>
    <div class="button-list">
      <button data-is-watched=${isWatched} class="video-item__watch_button button">✅</button>
      <button class="video-item__delete_button button">🗑</button>
    </div>
  </li>`;

export const getMessageTemplate = (type, message) => `
  <li class="message ${type}">${message}</li>
`;
