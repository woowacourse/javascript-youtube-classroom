import Component from '../../../core/Component.js';
import VideoCard from './VideoCard.js';
import { rootStore } from '../../../store/rootStore.js';
import { getSearchAPI } from '../../../api/api.js';
import { addSavedToVideos } from '../SearchBar.js';
import SkeletonCard from './SkeletonCard.js';
import request from '../../../__mocks__/request.js';
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

    this.state = { isLoading: false };
  }

  template() {
    const { searchResult } = rootStore.state;
    const { isLoading } = this.state;

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
    const { searchResult } = rootStore.state;
    const { isLoading } = this.state;
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
      if (!entry.isIntersecting || this.state.isLoading) return;

      observer.disconnect();

      this.setState({ isLoading: true });

      const newVideos = await this.loadNextVideos();

      this.setState({ isLoading: false });
      rootStore.setState({
        searchResult: [...rootStore.state.searchResult, ...newVideos],
      });
    });
  }

  async loadNextVideos() {
    const { query, nextPageToken: prevNextPageToken } =
      rootStore.state.searchOption;
    const { items, nextPageToken } = await getSearchAPI(
      query,
      prevNextPageToken
    );
    // const { items, nextPageToken } = await request();

    rootStore.setState({
      searchOption: {
        query,
        nextPageToken,
      },
    });

    return addSavedToVideos(items);
  }
}
