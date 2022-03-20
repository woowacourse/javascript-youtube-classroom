import { ELEMENTS } from '../constants/constants.js';

const savedVideoTemplate = {
  noSaved: '<li class="no-saved-video">저장된 동영상이 없습니다.<li>',

  VideoItem: (item) => {
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
  },
};

export const renderNoSaved = () => {
  ELEMENTS.SAVED_VIDEO_LIST.innerHTML = savedVideoTemplate.noSaved;
};

export const renderSavedVideos = (content, savedVideos) => {
  ELEMENTS.SAVED_VIDEO_LIST.replaceChildren();
  savedVideos.forEach((video) => {
    if (video.state === content) {
      ELEMENTS.SAVED_VIDEO_LIST.insertAdjacentHTML(
        'beforeEnd',
        savedVideoTemplate.VideoItem(video)
      );
    }
  });
  if (!ELEMENTS.SAVED_VIDEO_LIST.hasChildNodes()) {
    renderNoSaved();
  }
};
