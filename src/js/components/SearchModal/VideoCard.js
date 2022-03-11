import Component from '../../core/Component.js';
import { saveVideo } from '../../api/api.js';
import { convertTime } from '../../utils/customDate.js';

export default class VideoCard extends Component {
  setup() {
    this.state = { saved: this.props.video.saved };
  }

  template() {
    const { loading, videoId, thumbnailUrl, title, channelTitle, publishTime } =
      this.props.video;
    const { saved } = this.state;

    return loading
      ? `
        <li class="video-item skeleton">
          <div class="video-item__thumbnail"></div>
          <h4 class="video-item__title line"></h4>
          <p class="video-item__channel-name line"></p>
          <p class="video-item__published-date line"></p>
          <button class="video-item__save-button button"></button>
        </li>
      `
      : `
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
        ${
          saved
            ? ''
            : '<button class="video-item__save-button button">⬇ 저장</button>'
        }
      </li>
    `;
  }

  setEvent() {
    const {
      video: { videoId },
    } = this.props;

    this.addEvent('click', '.video-item__save-button', () => {
      try {
        saveVideo(videoId);

        this.setState({ saved: true });
      } catch (err) {
        alert(err);
      }
    });
  }
}
