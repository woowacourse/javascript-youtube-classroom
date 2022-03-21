const SKELETON = `
  <div class="skeleton hidden">
    <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
  </div>
`;

const EMOJI_BUTTONS = (props) => {
  const { showHomePageButtons, storeButton } = props;

  return `${showHomePageButtons
    ? `
    <div class="video-item__buttons-wrapper">
      <button class="video-item__watched-button button">✅</button>
      <button class="video-item__remove-button button">🗑️</button>
    </div>
    `
    : storeButton}`;
};

const VIDEO_CARD = (props) => {
  const {
    videoItem: {
      videoId,
      thumbnailURL,
      title,
      channelTitle,
      publishedDate
    },
    videoIds,
    showHomePageButtons
  } = props;

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
      ${EMOJI_BUTTONS({ showHomePageButtons, storeButton })}
    </li>
    `;
};

const TEMPLATE = {
  SKELETON,
  VIDEO_CARD
};

export default TEMPLATE;
