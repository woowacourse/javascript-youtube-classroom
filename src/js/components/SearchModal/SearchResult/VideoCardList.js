import Component from '../../../core/Component.js';
import VideoCard from './VideoCard.js';
import { rootStore } from '../../../store/rootStore.js';
import SkeletonCard from './SkeletonCard.js';
import { LOAD_VIDEOS_COUNT } from '../../../constant.js';

export default class VideoCardList extends Component {
  setup() {
    this.observer = new IntersectionObserver(
      this.handleLastVideoVisible.bind(this),
      {
        root: this.target,
        rootMargin: '0px',
        threshold: 0,
      }
    );
  }

  template() {
    const { videos, isLoading } = this.props;

    return `
      ${videos.map(() => `<div class="video-card real"></div>`).join('')}
      ${
        isLoading
          ? Array(LOAD_VIDEOS_COUNT)
              .fill()
              .map(() => `<div class="video-card skeleton"></div>`)
              .join('')
          : ''
      }
    `;
  }

  afterMounted() {
    const { videos, isLoading } = this.props;

    const videoCards = this.target.querySelectorAll('.video-card.real');
    videoCards.forEach((videoCard, index) => {
      index < videos.length &&
        new VideoCard(videoCard, { video: videos[index] });
    });

    if (isLoading) {
      const skeletonCards = this.target.querySelectorAll(
        '.video-card.skeleton'
      );
      skeletonCards.forEach(skeletonCard => {
        new SkeletonCard(skeletonCard);
      });

      return;
    }

    // 10개 이하로 fetching 해오는 경우, 더 이상 observe 하지 않는다.
    if (videos.length % 10 !== 0) {
      this.observer.disconnect();
      return;
    }
    this.observeLastChild();
  }

  observeLastChild() {
    if (this.target.lastElementChild) {
      this.observer.observe(this.target.lastElementChild);
    }
  }

  handleLastVideoVisible(entries, observer) {
    entries.forEach(async entry => {
      if (!entry.isIntersecting || this.props.isLoading) return;

      observer.disconnect();

      rootStore.setState({ isLoading: true });

      const newVideos = await this.props.loadNextVideos();

      rootStore.setState({
        videos: [...rootStore.state.videos, ...newVideos],
        isLoading: false,
      });
    });
  }
}
