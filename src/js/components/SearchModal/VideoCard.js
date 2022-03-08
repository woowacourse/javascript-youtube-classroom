import Component from '../../core/Component.js';
import { convertTime } from '../../utils/customDate.js';

export default class VideoCard extends Component {
  template() {
    const { item } = this.props;

    return `
      <li class="video-item" data-video-id="${item.id.videoId}">
        <img
          src="${item.snippet.thumbnails.default.url}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${item.snippet.title}</h4>
        <p class="video-item__channel-name">${item.snippet.channelTitle}</p>
        <p class="video-item__published-date">${convertTime(
          item.snippet.publishTime
        )}</p>
        <button class="video-item__save-button button">⬇ 저장</button>
      </li>
    `;
  }
}
