const BUTTON_TEMPLATE = {
  SEARCHED_VIDEOS: `
    <button class="video-item__save-button button" type="button">⬇ 저장</button>
  `,
  WATCHED_VIDEOS: `<div class="video-item__button_wrapper">
    <button class="video-item__watch_button button focus" type="button">✅</button>
    <button class="video-item__delete_button button" type="button">🗑️</button>
  </div>`,
  WATCH_LATER_VIDEOS: `<div class="video-item__button_wrapper">
    <button class="video-item__watch_button button" type="button">✅</button>
    <button class="video-item__delete_button button" type="button">🗑️</button>
  </div>`,
};

const VideoCardTemplate = (video, page) => {
  const { videoId, channelTitle, publishTime, title, thumbnail } = video;

  return `
    <li class="video-item" data-video-id="${videoId}">
      <img
        src="${thumbnail}"
        alt="video-item-thumbnail" class="video-item__thumbnail">
      <h4 class="video-item__title">${title}</h4>
      <p class="video-item__channel_title">${channelTitle}</p>
      <p class="video-item__publish_time">${publishTime}</p>
      ${BUTTON_TEMPLATE[page] ?? ''}
    </li>
    `;
};

export default VideoCardTemplate;
