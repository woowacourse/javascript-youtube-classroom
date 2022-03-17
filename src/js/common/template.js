const SKELETON_TEMPLATE = `
  <div class="skeleton hidden">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </div>
`;

const videoCardStyled = (props) => {
  const {
    videoItem: {
      videoId,
      thumbnailURL,
      title,
      channelTitle,
      publishedDate
    },
    videoIds } = props;

  const storeButton = videoIds.includes(videoId)
    ? ''
    : '<button class="video-item__save-button button">⬇ 저장</button>';

  return `
    <li class="video-item" data-video-id="${videoId}">
      <img
        src="${thumbnailURL}"
        alt="video-item-thumbnail" class="video-item__thumbnail" data-video-thumbnail="${thumbnailURL}">
      <h4 class="video-item__title" data-video-title="${title}">${title}</h4>
      <p class="video-item__channel-name" data-video-channel-name="${channelTitle}">${channelTitle}</p>
      <p class="video-item__published-date" data-video-published-date="${publishedDate}">${publishedDate}</p>
      ${storeButton}
    </li>
    `;
};

const storedResultStyled = `
    <section class="stored-result">
      <h3 hidden>저장된 영상</h3>
      <ul class="video-list"></ul>
    </section>
  `;

export { SKELETON_TEMPLATE, videoCardStyled, storedResultStyled };
