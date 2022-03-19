import { ELEMENTS } from '../constants/constants.js';

const savedVideoTemplate = (item) => {
  return `
    <li class="video-item" data-video-id='${item.videoId}'>
      <img
        src='${item.thumbnails}'
        alt="video-item-thumbnail"
        class="video-item__thumbnail"
      />
      <h4 class="video-item__title">${item.title}</h4>
      <p class="video-item__channel-name">${item.channelTitle}</p>
      <p class="video-item__published-date">${item.publishTime}</p>
      <div class="video-manage-button">
        <button class="video-watched-button">✅</button>
        <button class="video-remove-button">🗑</button>
      </div>
    </li>
`;
};

export const rendersavedVideo = (videoData) => {
  ELEMENTS.SAVED_VIDEO_LIST.insertAdjacentHTML('beforeEnd', savedVideoTemplate(videoData));
};

export const renderSavedVideos = (content, savedVideos) => {
  ELEMENTS.SAVED_VIDEO_LIST.replaceChildren();
  savedVideos.forEach((video) => {
    if (video.state === content) {
      ELEMENTS.SAVED_VIDEO_LIST.insertAdjacentHTML('beforeEnd', savedVideoTemplate(video));
    }
  });

  if (!ELEMENTS.SAVED_VIDEO_LIST.hasChildNodes()) {
    ELEMENTS.EMPTY_VIDEO_IMAGE.classList.remove('hide');
  }
};
