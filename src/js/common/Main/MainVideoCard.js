// import { getStorage, STORAGE_KEY } from '../../utils/localStorage';

export default class MainVideoCard {
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
    return `
      <li class="video-item" data-video-id="${this.videoId}">
        <img
          src="${this.thumbnail}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${this.title}</h4>
        <p class="video-item__channel_title">${this.channelTitle}</p>
        <p class="video-item__publish_time">${this.publishTime}</p>
        <div class="video-item__button_wrapper">
          <button class="video-item__watch_button button" type="button">✅</button>
          <button class="video-item__delete_button button" type="button">🗑️</button>
        </div>
      </li>
      `;
  }
}
