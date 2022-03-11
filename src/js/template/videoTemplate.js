import notFoundImage from '../../assets/images/not_found.png';

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
  <li class="video-item" data-video-id="${videoId}"> 
    <img src="${url}" alt="video-item-thumbnail" class="video-item__thumbnail" />
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime}</p>
    ${
      isSaved
        ? '<button type="button" class="video-item__save-button button" disabled >저장됨</button>'
        : '<button type="button" class="video-item__save-button button">⬇ 저장</button>'
    }
  </li>
`;

const videoSkeletonTemplate = `
  <div class="skeleton">
  <div class="image"></div>
  <p class="line"></p>
  <p class="line"></p>
  </div>
`;

const videoNotFoundTemplate = `
  <section class="search-result search-result--no-result">
    <h3 hidden>검색 결과</h3>
    <div class="no-result">
      <img src="${notFoundImage}" alt="no result image" class="no-result__image">
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
      </p>
    </div>
  </section>
`;

export { videoTemplate, videoSkeletonTemplate, videoNotFoundTemplate };
