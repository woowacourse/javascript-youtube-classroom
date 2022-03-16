import not_found from '../../assets/images/not_found.png';
import error_403 from '../../assets/images/error-background.png';
import { convertDataToDateString } from '../util/converter.js';

const template = {
  videoItems: ({ id, thumbnails, channelTitle, title, publishTime, isSaved }) => `
  <li class="video-item" data-video-id=${id}>
    <img
      src=${thumbnails}
      alt="video-item-thumbnail" class="video-item__thumbnail" />
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${convertDataToDateString(publishTime)}</p>
    ${isSaved ? '' : '<button class="video-item__save-button button">⬇ 저장</button>'}
  </li>
  `,

  noSearchResult: () => `
    <div class="no-result">
      <img src=${not_found} alt="no result image" class="no-result__image">
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
      </p>
    </div>
  `,

  skeletonItem: () => `
    <li class="video-item skeleton-container">
      <div class="skeleton thumbnail"></div>
      <div class="skeleton title"></div>
      <div class="skeleton text"></div>
      <div class="skeleton date"></div>
    </li>
  `,

  exceedCapacityErrorImage: () => `
  <div class="no-result">
    <img src= ${error_403} >
    <p class="no-result__description">
      할당량 초과!!<br />
      다음날 5시에 다시 시도하세요
    </p>
  </div>
  `,
};

export default template;
