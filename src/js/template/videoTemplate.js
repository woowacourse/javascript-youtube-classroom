import notFoundImage from '../../assets/images/not_found.png';
import emptyVideoListImage from '../../assets/images/empty_saved_video_list.png';

import { MAX_VIDEO_REQUEST_COUNT } from '../constants/contants';

const stringFormatToDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear() ?? '0000'}년 ${date.getMonth() ?? '00'}월 ${
    date.getDay() ?? '00'
  }일`;
};

const videoTemplate = (
  {
    id: { videoId },
    snippet: {
      title,
      channelTitle,
      publishTime,
      thumbnails: {
        default: { url },
      },
    },
  },
  isSaved
) => `
  <li class="video-item" 
    data-video-id="${videoId}"
    data-title="${title}"
    data-channel-title="${channelTitle}"
    data-publish-time="${publishTime}"
    data-thumbnails-url="${url}"
  > 
    <img src="${url}" alt="video-item-thumbnail" class="video-item__thumbnail" loading="lazy"/>
    <h4 class="video-item__title">${title ?? '제목 없음'}</h4>
    <p class="video-item__channel-name">${channelTitle ?? '채널명 없음'}</p>
    <p class="video-item__published-date">${stringFormatToDate(publishTime)}</p>
    ${
      isSaved
        ? '<button type="button" class="video-item__save-button button" disabled >저장됨</button>'
        : '<button type="button" class="video-item__save-button button">⬇ 저장</button>'
    }
  </li>
`;

const savedVideoTemplate = ({
  videoId,
  title,
  channelTitle,
  publishTime,
  thumbnailsUrl,
  isChecked,
}) => `
  <li class="video-item"
    data-video-id="${videoId}"
    data-title="${title}"
  > 
    <img src="${thumbnailsUrl}" alt="video-item-thumbnail" class="video-item__thumbnail" loading="lazy"/>
    <h4 class="video-item__title">${title ?? '제목 없음'}</h4>
    <p class="video-item__channel-name">${channelTitle ?? '채널명 없음'}</p>
    <p class="video-item__published-date">${stringFormatToDate(publishTime)}</p>
    ${
      isChecked
        ? '<button type="button" class="button video-item__check-button selected">✅ </button>'
        : '<button type="button" class="button video-item__check-button">✅ </button>'
    }
    <button type="button" class="button video-item__delete-button">🗑️</button> 
  </li>
`;

const videoSkeletonTemplate = `
  <div class="skeleton">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </div>
`;

const totalVideoSkeletonTemplate = Array.from(
  { length: MAX_VIDEO_REQUEST_COUNT },
  () => videoSkeletonTemplate
).join(' ');

const videoNotFoundTemplate = `
  <section class="search-result search-result--no-result">
    <h3 hidden>검색 결과</h3>
    <div class="no-result">
      <img src="${notFoundImage}" alt="no result image" class="no-result__image"/>
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
      </p>
    </div>
  </section>
`;

const emptyVideoListTemplate = `
  <section class="save-result save-result--no-result">
    <h3 hidden>저장 목록</h3>
    <div class="no-result">
      <img src="${emptyVideoListImage}" alt="no result image" class="no-result__image"/>
      <p class="no-result__description">
        저장된 비디오가 없습니다
      </p>
    </div>
  </section>
`;

export {
  videoTemplate,
  totalVideoSkeletonTemplate,
  videoNotFoundTemplate,
  savedVideoTemplate,
  emptyVideoListTemplate,
};
