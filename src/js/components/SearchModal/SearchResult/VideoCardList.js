import Component from '../../../core/Component.js';
import VideoCard from './VideoCard.js';
import { rootStore } from '../../../store/rootStore.js';
import { getSearchAPI } from '../../../api/api.js';
import { addSavedToVideos } from '../SearchBar.js';
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
    const { searchResult, isLoading } = rootStore.state;

    return `
      ${searchResult.map(() => `<div class="video-card real"></div>`).join('')}
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
    const { searchResult, isLoading } = rootStore.state;
    const videoCards = document.querySelectorAll('.video-card.real');

    videoCards.forEach((videoCard, index) => {
      new VideoCard(videoCard, { video: searchResult[index] });
    });

    if (isLoading) {
      const skeletonCards = document.querySelectorAll('.video-card.skeleton');
      skeletonCards.forEach((skeletonCard) => {
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
    entries.forEach(async (entry) => {
      if (!entry.isIntersecting || rootStore.state.isLoading) return;

      observer.disconnect();

      rootStore.setState({ isLoading: true });

      const newVideos = await this.loadNextVideos();

      rootStore.setState({
        searchResult: [...rootStore.state.searchResult, ...newVideos],
        isLoading: false,
      });
    });
  }

  async loadNextVideos() {
    const { query, pageToken: prevPageToken } = rootStore.state.searchOption;
    const { items, nextPageToken } = await getSearchAPI(query, prevPageToken);
    // const { items, pageToken } = await request();

    rootStore.setState({
      searchOption: {
        query,
        pageToken: nextPageToken,
      },
    });

    return addSavedToVideos(items);
  }
}
