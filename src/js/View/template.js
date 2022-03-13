import { yearMonthDate } from '../util';

export const template = {
  videoListItem: ({ id, thumbnail, title, channelName, publishedDate, saved }) =>
    `<li class="video-item" data-video-id="${id}">
      <img src=${thumbnail} alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelName}</p>
      <p class="video-item__published-date">${yearMonthDate(publishedDate)}</p>
      ${saved ? '' : '<button class="video-item__save-button button">⬇ 저장</button>'}
      </li>
    `,
  skeletonListItem: () =>
    `<li class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </li>`.repeat(10),
};

export const MESSAGE = {
  NO_RESULT: '검색 결과가 없습니다<br />다른 키워드로 검색해보세요',
  ERROR_RESULT: '검색 결과를 가져오는데 실패했습니다.<br />관리자에게 문의하세요.',
};
