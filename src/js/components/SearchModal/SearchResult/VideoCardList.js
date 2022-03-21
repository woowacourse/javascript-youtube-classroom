import Component from '../../../core/Component.js';
import VideoCard from './VideoCard.js';
import { rootStore } from '../../../store/rootStore.js';
import { getSearchAPI } from '../../../api/api.js';
import { makeCardData } from '../SearchBar.js';
import SkeletonCard from './SkeletonCard.js';
import { LOAD_VIDEOS_COUNT } from '../../../constant.js';
import { savedVideosStorage } from '../../../localStorage/savedVideos';

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
    const { videos, isLoading } = rootStore.state;

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
    const { videos, isLoading } = rootStore.state;
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

    this.observeLastChild();
  }

  observeLastChild() {
    if (this.target.lastElementChild) {
      this.observer.observe(this.target.lastElementChild);
    }
  }

  handleLastVideoVisible(entries, observer) {
    entries.forEach(async entry => {
      if (!entry.isIntersecting || rootStore.state.isLoading) return;

      observer.disconnect();

      rootStore.setState({ isLoading: true });

      const newVideos = await this.loadNextVideos();

      rootStore.setState({
        videos: [...rootStore.state.videos, ...newVideos],
        isLoading: false,
      });
    });
  }

  async loadNextVideos() {
    const { query, pageToken: prevPageToken } = rootStore.state.searchOption;
    const [error, data] = await getSearchAPI(query, prevPageToken);

    if (error) {
      alert(`${error.message}, status: ${error.statusCode}`);

      return;
    }

    const { items, nextPageToken } = data;

    rootStore.setState({
      searchOption: {
        query,
        pageToken: nextPageToken,
      },
    });

    return makeCardData(items, savedVideosStorage.load());
  }
}
