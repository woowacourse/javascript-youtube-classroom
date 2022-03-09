const template = {
  videoItems: ({ videoId, url, channelTitle, title, publishTime, isSaved }) => `
  <li class="video-item" data-video-id=${videoId}>
    <img
      src=${url}
      alt="video-item-thumbnail" class="video-item__thumbnail" />
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime.getFullYear()}년 ${publishTime.getMonth()}월 ${publishTime.getDate()}일</p>
    ${
      isSaved
        ? ""
        : '<button class="video-item__save-button button">⬇ 저장</button>'
    }
  </li>
  `,

  noSearchResult: () => `
    <div class="no-result">
      <img src='../../assets/images/not_found.png' alt="no result image" class="no-result__image">
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
};
export default template;
