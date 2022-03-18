import { timeFormatter } from '../utils';
import { getStorageVideoIDs, LOCALSTORAGE_KEY } from '../utils/localStorage';

const isStoredVideo = (videoIds, videoId) =>
  Object.values(videoIds).some((currentVideoId) => videoId === Object.keys(currentVideoId)[0]);

export default class VideoCard {
  constructor(props) {
    this.props = props;
  }

  template() {
    const { id, snippet } = this.props;
    const { videoId } = id;
    const {
      publishTime,
      channelTitle,
      title,
      thumbnails: {
        medium: { url },
      },
    } = snippet;

    const videoIds = getStorageVideoIDs(LOCALSTORAGE_KEY.VIDEO_IDS);

    const storeButton = isStoredVideo(videoIds, videoId)
      ? ''
      : '<button class="video-item__save-button button" type="button">⬇ 저장</button>';

    const time = timeFormatter(publishTime);

    return `
      <li class="video-item" data-video-id="${videoId}">
        <img
          src="${url}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${title}</h4>
        <p class="video-item__channel-name">${channelTitle}</p>
        <p class="video-item__published-date">${time}</p>
        ${storeButton}
      </li>
      `;
  }
}
