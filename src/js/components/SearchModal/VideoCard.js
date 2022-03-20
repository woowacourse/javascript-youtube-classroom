import Component from '../../core/Component.js';
import videoService, { useStore } from '../../services/VideoService.js';
import { convertTime } from '../../utils/customDate.js';

class VideoCard extends Component {
  template() {
    const videoId = this.getAttribute('videoId');
    const thumbnailUrl = this.getAttribute('thumbnailUrl');
    const title = this.getAttribute('title');
    const channelTitle = this.getAttribute('channelTitle');
    const publishTime = this.getAttribute('publishTime');
    const savedVideos = useStore((state) => state.savedVideos);
    const isSaved = savedVideos.map((video) => video.videoId).includes(videoId);

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
          ${
            isSaved
              ? ''
              : '<button class="video-item__save-button button">⬇ 저장</button>'
          }
        </div>
      </li>
    `;
  }

  setEvent() {
    const videoId = this.getAttribute('videoId');
    const thumbnailUrl = this.getAttribute('thumbnailUrl');
    const title = this.getAttribute('title');
    const channelTitle = this.getAttribute('channelTitle');
    const publishTime = this.getAttribute('publishTime');

    this.addEvent('click', '.video-item__save-button', () => {
      try {
        videoService.saveVideo({
          videoId,
          thumbnailUrl,
          title,
          channelTitle,
          publishTime,
        });
      } catch (err) {
        alert(err);
      }
    });
  }
}

customElements.define('video-card', VideoCard);

export default VideoCard;
