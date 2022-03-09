const videoTemplate = ({ id: { videoId }, thumbnails: { default: src }, title, snippet: { channelTitle, publishTime } }) => `
    <li class="video-item" data-video-id="${videoId}"> 
      <img src="${src.url}" alt="video-item-thumbnail" class="video-item__thumbnail" />
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel-name">${channelTitle}</p>
      <p class="video-item__published-date">${publishTime}</p>
      <button class="video-item__save-button button">⬇ 저장</button>
    </li>`;

const videoSkeletonTemplate = `
  <div class="skeleton">
  <div class="image"></div>
  <p class="line"></p>
  <p class="line"></p>
  </div>`;

export { videoTemplate, videoSkeletonTemplate };
