import notFoundImage from '../../assets/images/not_found.jpg';

export const NO_RESULT_TEMPLATE = `
  <div class="no-result">
    <img src=${notFoundImage} alt="no result image" class="no-result__image">
  </div>
`;

export const SKELETON_TEMPLATE = `
<li class="video-item skeleton" data-video-id="">
<img
  src=${notFoundImage}
  alt="video-item-thumbnail" class="video-item__thumbnail">
<h4 class="video-item__title">1231232311</h4>
<p class="video-item__channel-name">2123123</p>
<p class="video-item__published-date">1231231233</p>
<button class="video-item__save-button button">⬇ 저장</button>
</li>
`.repeat(10);

export const VIDEO_LIST_TEMPLATE = '<ul class="video-list"></ul>';
