import notFoundImage from '../../assets/images/not_found.png';

const videoTemplate = (
  {
    id: { videoId },
    snippet: {
      title,
      channelTitle,
      publishTime,
    },
  },
  isSaved
) => `
  <li class="video-item" data-video-id="${videoId}"> 
    <iframe src="https://www.youtube.com/embed/${videoId}" loading="lazy" alt="video-item-thumbnail" class="video-item__thumbnail" ></iframe>
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime}</p>
    ${isSaved ? '<button type="button" class="video-item__save-button button" disabled >저장됨</button>' : '<button type="button" class="video-item__save-button button">⬇ 저장</button>'}
  </li>
`;

const watchVideoTemplate = (
  {
    id,
    snippet: {
      title,
      channelTitle,
      publishedAt,
    },
  },
  divisionSection
) => `
  <li class="video-item" data-video-id="${id}"> 
    <iframe src="https://www.youtube.com/embed/${id}" loading="lazy" alt="video-item-thumbnail" class="video-item__thumbnail" ></iframe>
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishedAt}</p>
    <button class="delete-video-button">🗑️</button>
    ${divisionSection === 'watched' ? '<button class="watched-video-button button-click">✅</button>' : '<button class="watched-video-button">✅</button>'}
  </li>
`;

const videoSkeletonTemplate = `
  <li class="skeleton">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </li>
`;

const videoNotFoundTemplate = `
    <h3 hidden>검색 결과</h3>
    <div class="no-result">
      <img src="${notFoundImage}" alt="no result image" class="no-result__image">
      <p class="no-result__description">
        검색 결과가 없습니다<br />
        다른 키워드로 검색해보세요
      </p>
    </div>
`;

const videoNoMoreTemplate = '<p class="video-no-more">결과가 더 이상 없습니다</p>';

export {
  videoTemplate,
  videoSkeletonTemplate,
  videoNotFoundTemplate,
  videoNoMoreTemplate,
  watchVideoTemplate,
};
