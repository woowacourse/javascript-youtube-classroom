import Component from '../../core/Component.js';
import videoService from '../../services/VideoService.js';
import { convertTime } from '../../utils/customDate.js';
import { COMMON_MESSAGES } from '../../config/constants.js';

class VideoCard extends Component {
  setup() {
    this.state = { watched: Boolean(this.getAttribute('watched')) ?? false };
  }

  template() {
    const videoId = this.getAttribute('videoId');
    const thumbnailUrl = this.getAttribute('thumbnailUrl');
    const title = this.getAttribute('title');
    const channelTitle = this.getAttribute('channelTitle');
    const publishTime = this.getAttribute('publishTime');
    const { watched } = this.state;

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
        <div class="video-item__button-menu">
          <button class="video-item__watched-button button ${
            watched ? 'watched' : ''
          }">✅</button>
          <button class="video-item__remove-button button">🗑️</button>
        </div>
      </li>
    `;
  }

  setEvent() {
    const videoId = this.getAttribute('videoId');

    this.addEvent('click', '.video-item__watched-button', () => {
      videoService.toggleVideoWatched(videoId);

      this.setState({ watched: !this.state.watched });
    });

    this.addEvent('click', '.video-item__remove-button', () => {
      if (window.confirm(COMMON_MESSAGES.REMOVE_SAVED_VIDEO))
        videoService.removeSavedVideo(videoId);
    });
  }
}

customElements.define('saved-card', VideoCard);

export default VideoCard;
