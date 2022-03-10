import { timeFormatter } from '../utils';
import { getStorageVideoIDs, LOCALSTORAGE_KEY } from '../utils/localStorage';

export default class VideoCard {
  constructor(props) {
    this.props = props;
  }

  template() {
    const { item } = this.props;
    const {
      id: { videoId },
      snippet: {
        thumbnails: {
          medium: { url },
        },
        publishTime,
        channelTitle,
        title,
      },
    } = item;

    const videoIds = getStorageVideoIDs(LOCALSTORAGE_KEY);
    const storeButton = videoIds.includes(videoId)
      ? ''
      : '<button class="video-item__save-button button">⬇ 저장</button>';

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
