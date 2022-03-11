import Component from '../../core/Component.js';
import { webStore } from '../../store/WebStore.js';
import { convertTime } from '../../utils/customDate.js';

export default class VideoCard extends Component {
  setup() {
    this.state = { saved: this.props.video.saved };
  }

  template() {
    const { videoId, thumbnailUrl, title, channelTitle, publishTime } =
      this.props.video;
    const { saved } = this.state;

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
        ${
          saved
            ? ''
            : '<button class="video-item__save-button button">⬇ 저장</button>'
        }
      </li>
    `;
  }

  setEvent() {
    const { videoId } = this.props.video;

    this.addEvent('click', '.video-item__save-button', () => {
      const prevSavedVideos = webStore.load();

      try {
        webStore.save([...prevSavedVideos, videoId]);
        this.setState({ saved: true });
      } catch ({ message }) {
        alert(message);
      }
    });
  }
}
