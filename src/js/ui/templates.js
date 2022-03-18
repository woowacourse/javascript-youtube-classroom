import '../../assets/images/not_found.png';
import '../../assets/images/eror-403-noBackground.png';
import { convertDataToDateString } from '../util/converter.js';

const template = {
  videoItems: ({ id, thumbnails, channelTitle, title, publishTime, isSaved }) => `
  <li class="video-item" data-video-id=${id}>
    <img
      src=${thumbnails}
      alt="video-item-thumbnail" class="video-item__thumbnail" />
    <h4 class="video-item__title" >${title}</h4>
    <p class="video-item__channel-name" >${channelTitle}</p>
    <p class="video-item__published-date" >${convertDataToDateString(publishTime)}</p>
    ${isSaved ? '' : '<button class="video-item__save-button button">⬇ 저장</button>'}
  </li>
  `,

  noSearchResult: () => `
    <div class="no-result">
      <img src="https://hwangstar156.github.io/javascript-youtube-classroom/not_found.png" alt="no result image" class="no-result__image" alt="검색결과 없음">
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
    <img src= "https://hwangstar156.github.io/javascript-youtube-classroom/eror-403-noBackground.png"/>
    <p class="no-result__description">
      할당량 초과!!<br />
      다음날 5시에 다시 시도하세요
    </p>
  </div>
  `,

  responceFailedError: () => `
  <div class="no-result">
    <img src= "https://hwangstar156.github.io/javascript-youtube-classroom/eror-403-noBackground.png"/>
    <p class="no-result__description">
      네트워크 요청 오류!!<br />
      다시 요청해주세요
    </p>
  </div>
  `,

  afterWatchVideoItem: (savedItems, isWatched) => `
  ${savedItems
    .map(({ videoId, videoThumbnail, videoDate, videoTitle, videoChannelTitle }) => {
      return `
    <section class="video-item" data-video-id=${videoId}>
      <h2 hidden>본 영상</h2>
      <img
        src=${videoThumbnail}
        alt="video-item-thumbnail" class="video-item__thumbnail" />
      <h4 class="video-item__title" >${videoTitle}</h4>
      <p class="video-item__channel-name" >${videoChannelTitle}</p>
      <p class="video-item__published-date" >${videoDate}</p>
      <div class="video-watch-controller">
        ${
          isWatched
            ? '<button class="after-watch-video-button button">👁️</button>'
            : '<button class="watch-video-button button">✅</button>'
        } 
        <button class="delete-watch-video-button button">🗑️</button>
      </div>
    </section>
      `;
    })
    .join('')}
  `,

  noAfterWatchItem: () => `
    <p>저장된 영상이 없습니다~</p>
  `,
};

export default template;
