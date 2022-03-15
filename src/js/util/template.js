import notFoundImage from '../../assets/images/not_found.jpg';
import serverErrorImage from '../../assets/images/server_error.jpg';
import { VIDEO_COUNT } from './constants.js';

export const NO_RESULT_IMAGE_TEMPLATE = `
  <img src=${notFoundImage} alt="no result image" class="no-result__image">
`;

export const SERVER_ERROR_TEMPLATE = `
  <img src=${serverErrorImage} alt="no result image" class="no-result__error-image">
  <div>앗...서버 점검중 시간입니다! ∑(O_O;)</div>
`;

export const SKELETON_TEMPLATE = `
  <li class="video-item skeleton" data-video-id="">
    <div id="image-wrapper">
      <img
        src=${notFoundImage}
        alt="video-item-thumbnail" class="video-item__thumbnail">
    </div>
    <h4 class="video-item__title">1231232311</h4>
    <p class="video-item__channel-name">2123123</p>
    <p class="video-item__published-date">1231231233</p>
    <button class="video-item__save-button button">⬇ 저장</button>
  </li>
`.repeat(VIDEO_COUNT);

export const VIDEO_LIST_TEMPLATE = '<ul class="video-list"></ul>';
