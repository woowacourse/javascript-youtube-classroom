import Component from '../../core/Component.js';
import VideoCard from './VideoCard.js';

export default class VideoCardList extends Component {
  setup() {
    this.state = { ...this.props, isLoading: false };
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

  setEvent() {
    this.addEvent('scroll', '#video-list', async (e) => {
      if (
        this.isScrollBelowLastCard(this.target, e.target) &&
        !this.state.isLoading
      ) {
        this.setState({ isLoading: true });

        const newVideos = await this.loadNextVideos();

        this.setState({
          items: [...this.state.items, ...newVideos],
          isLoading: false,
        });
      }
    });
  }

  async loadNextVideos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.props.items);
      }, 1000);
    });
  }

  isScrollBelowLastCard(eventTarget) {
    const { scrollHeight, scrollTop, clientHeight } = eventTarget;
    const cardHeight = this.target.lastElementChild?.offsetHeight;

    return scrollHeight - scrollTop - cardHeight <= clientHeight;
  }
}
