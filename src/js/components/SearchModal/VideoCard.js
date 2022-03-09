import Component from '../../core/Component.js';
import { convertTime } from '../../utils/customDate.js';

export default class VideoCard extends Component {
  setup() {
    this.state = { saved: this.props.video.saved };
  }

  template() {
    const {
      video: { videoId, thumbnailUrl, title, channelTitle, publishTime },
    } = this.props;
    const { saved } = this.state;

    return `
      <li class="video-item" data-video-id="${videoId}">
        <img
          src="${thumbnailUrl}"
          alt="video-item-thumbnail" class="video-item__thumbnail">
        <h4 class="video-item__title">${title}</h4>
        <p class="video-item__channel-name">${channelTitle}</p>
        <p class="video-item__published-date">${convertTime(publishTime)}</p>
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
      const prevSavedVideos = Component.webStore.load();
      Component.webStore.save([...prevSavedVideos, videoId]);

      this.setState({ saved: true });
    });
  }
}
