import { ERROR_MESSAGE } from '../constants';

const dateTemplate = (stringDate) => {
  const date = new Date(stringDate);
  return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;
}

export const template = {
  skeletonListItem: () =>
    `<li class="skeleton hide">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </li>`.repeat(10),
  searchResultListItem: ({ id, thumbnail, title, channelName, publishedDate, saved }) =>
    `<li class="video-item" 
      data-id="${id}"
      data-thumbnail="${thumbnail}"
      data-title="${title}"
      data-channel-name="${channelName}"
      data-published-date="${publishedDate}"
    >
      <img src=${thumbnail} alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelName}</p>
      <p class="video-item__published-date">${dateTemplate(publishedDate)}</p>
      ${saved ? '' : '<button id="save-button" class="video-item__save-button button">⬇ 저장</button>'}
      </li>
    `,
  savedVideoListItem: ({ id, thumbnail, title, channelName, publishedDate, watched }) =>
    `<li class="video-item" 
      data-id="${id}"
    >
      <img src=${thumbnail} alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelName}</p>
      <p class="video-item__published-date">${dateTemplate(publishedDate)}</p>
      <button class="button icon-button check-watched-button ${watched ? 'selected' : ''}">✅</button>
      <button class="button icon-button delete-button">🗑️</button>
      </li>
    `,
  failToReadSavedVideo: `<li class="align-center">${ERROR_MESSAGE.FAIL_TO_READ_SAVED_VIDEO_INFO}</li>`,
  noUnwatchedVideo: '<li class="align-center">볼 영상이 없습니다.</li>',
  noWatchedVideo: '<li class="align-center">본 영상이 없습니다.</li>',
};

export const MESSAGE = {
  NO_RESULT: '검색 결과가 없습니다.<br />다른 키워드로 검색해보세요.',
  ERROR_RESULT: '검색 결과를 가져오는데 실패했습니다.<br />관리자에게 문의하세요.',
};
