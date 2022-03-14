import notFoundImage from '../../assets/images/not_found.jpg';
import { VIDEO_COUNT } from './constants.js';

export const NO_RESULT_TEMPLATE = `
  <div class="no-result">
    <img src=${notFoundImage} alt="no result image" class="no-result__image">
  </div>
`;

export const SKELETON_TEMPLATE = `
<li class="video-item skeleton" data-video-id="">
<div id="image-wrapper">
  <img
    src=${notFoundImage}
    alt="video-item-thumbnail" class="video-item__thumbnail">
</div>
<h4 class="video-item__title">empty</h4>
<p class="video-item__channel-name">empty</p>
<p class="video-item__published-date">empty</p>
<button class="video-item__save-button button">⬇ 저장</button>
</li>
`.repeat(VIDEO_COUNT);

export const VIDEO_LIST_TEMPLATE = '<ul class="video-list"></ul>';
