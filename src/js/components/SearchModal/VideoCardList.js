import Component from '../../core/Component.js';
import VideoCard from './VideoCard.js';

export default class VideoCardList extends Component {
  setup() {
    this.state = this.props;
  }

  template() {
    const { items } = this.state;

    return `
      ${items.map(() => `<div class="video-card"></div>`).join('')}
    `;
  }

  afterMounted() {
    const { items } = this.state;

    document
      .querySelectorAll('.video-card')
      .forEach(
        (videoCard, index) => new VideoCard(videoCard, { item: items[index] })
      );
  }
}
