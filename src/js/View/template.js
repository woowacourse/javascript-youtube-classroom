import { parseDate } from '../util';
import { MAX_DATA_FETCH_AT_ONCE } from '../constants';

export const template = {
  videoListItem: ({ id, thumbnail, title, channelName, publishedDate, saved }) =>
    `<li class="video-item" data-video-id=${id}>
      <img src=${thumbnail} alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelName}</p>
      <p class="video-item__published-date">${parseDate(publishedDate)}</p>
      <button class="video-item__save-button button ${saved ? 'hide' : ''}" type="button">⬇ 저장</button>
      </li>
    `,
  skeletonListItem: () =>
    `<li class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </li>`.repeat(MAX_DATA_FETCH_AT_ONCE),
  watchVideoListItem: ({ id, thumbnail, title, channelName, publishedDate, watched }) =>
    `<li class="video-item" data-video-id=${id}>
      <img src=${thumbnail} alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelName}</p>
      <p class="video-item__published-date">${publishedDate}</p>
      <div class="watch-delete-button">
        <button class="video-item__watched-button button ${
          watched ? 'selected' : ''
        }" type="button" data-action="changeWatchState">✅</button>
        <button class="video-item__delete-button button" type="button" data-action="deleteVideo">🗑</button>
      </div>
    </li>
`,
};

export const MESSAGE = {
  NO_RESULT: '검색 결과가 없습니다<br />다른 키워드로 검색해보세요',
  ERROR_RESULT: '검색 결과를 가져오는데 실패했습니다.<br />관리자에게 문의하세요.',
};
