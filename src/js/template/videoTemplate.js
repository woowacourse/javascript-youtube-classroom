const videoTemplate = ({ id: { videoId }, snippet: { title, channelTitle, publishTime, thumbnails: { default: { url } } } }) => `
  <li class="video-item" data-video-id="${videoId}"> 
    <img src="${url}" alt="video-item-thumbnail" class="video-item__thumbnail" />
    <h4 class="video-item__title">${title}</h4>
    <p class="video-item__channel-name">${channelTitle}</p>
    <p class="video-item__published-date">${publishTime}</p>
    <button class="video-item__save-button button">⬇ 저장</button>
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
  <li class="not-found-container">
    <img src="src/assets/images/not_found.png" class="not-found-image"/>
    <p class="not-found-text">검색 결과가 없습니다<p/>
    <p class="not-found-text">다른 키워드로 검색해보세요<p/>
  <li/>
`;

export { videoTemplate, videoSkeletonTemplate, videoNotFoundTemplate };
