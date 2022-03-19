import Component from '../../core/Component.js';
import { convertTime } from '../../utils/customDate.js';

export default class VideoCard extends Component {
  setup() {
    this.state = { saved: true, watched: this.props.video.watched ?? false };
  }

  template() {
    const { videoId, thumbnailUrl, title, channelTitle, publishTime } =
      this.props.video;

    return `
      <li class="video-item" data-video-id="${videoId}">
        <img
          src="${thumbnailUrl}"
          alt="video-item-thumbnail" class="video-item__thumbnail"
          loading="lazy"
        >
        <h4 class="video-item__title line">${title}</h4>
        <p class="video-item__channel-name line">${channelTitle}</p>
        <p class="video-item__published-date line">${convertTime(
          publishTime
        )}</p>
        <button class="video-item__watched-button button">✅</button>
        <button class="video-item__remove-button button">🗑️</button>
      </li>
    `;
  }
}
