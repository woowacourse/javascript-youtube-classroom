import { getStorage, STORAGE_KEY } from '../../utils/localStorage';

const isStoredVideo = (storedVideos, videoId) =>
  storedVideos.some((video) => video.videoId === videoId);

export default class ModalVideoCard {
  constructor(props) {
    ({
      videoId: this.videoId,
      channelTitle: this.channelTitle,
      publishTime: this.publishTime,
      title: this.title,
      thumbnail: this.thumbnail,
    } = props);
  }

  template() {
    const videoIds = getStorage(STORAGE_KEY.VIDEO_IDS);

    const storeButton = isStoredVideo(videoIds, this.videoId)
      ? ''
      : '<button class="video-item__save-button button" type="button">⬇ 저장</button>';

    return `
      <li class="video-item" data-video-id="${this.videoId}">
        <img
          src="${this.thumbnail}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${this.title}</h4>
        <p class="video-item__channel_title">${this.channelTitle}</p>
        <p class="video-item__publish_time">${this.publishTime}</p>
        ${storeButton}
      </li>
      `;
  }
}
