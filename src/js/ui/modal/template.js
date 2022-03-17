const template = {
  skeletonUI: `
  <li class="skeleton">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </li>`,

  videoItem: item => {
    return `
      <li class="video-item" data-video-id='${item.id.videoId}'>
        <img
          src='${item.snippet.thumbnails.high.url}'
          alt="video-item-thumbnail"
          class="video-item__thumbnail"
        />
        <h4 class="video-item__title">${item.snippet.title}</h4>
        <p class="video-item__channel-name">${item.snippet.channelTitle}</p>
        <p class="video-item__published-date">${item.snippet.publishTime}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>`;
  },
};

export default template;
