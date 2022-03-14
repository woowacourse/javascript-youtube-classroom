import Component from '../../core/Component.js';
import VideoCard from './VideoCard.js';
import SkeletonCard from './SkeletonCard.js';
import { api } from '../../api/api.js';
import {
  INTERSECTION_OBSERVER,
  QUERY_OPTIONS,
} from '../../config/constants.js';

export default class VideoCardList extends Component {
  setup() {
    this.observer = new IntersectionObserver(
      this.onLastChildVisible.bind(this),
      {
        root: this.target,
        rootMargin: INTERSECTION_OBSERVER.ROOT_MARGIN.NO_MARGIN,
        threshold: INTERSECTION_OBSERVER.THRESHOLD.IMMEDIATELY,
      }
    );

    this.state = { isLoading: false, skeletonCount: 0 };
  }

  template() {
    const { searchResult } = api.rootStore.state;
    const { skeletonCount } = this.state;

    return `
      ${
        !searchResult.length
          ? '<div class="skeleton-card"></div>'.repeat(10)
          : ''
      }
      ${searchResult.map(() => '<div class="video-card"></div>').join('')}
      ${'<div class="skeleton-card"></div>'.repeat(skeletonCount)}
    `;
  }

  afterMounted() {
    const { searchResult } = api.rootStore.state;
    const skeletonCards = this.target.querySelectorAll('.skeleton-card');
    const videoCards = this.target.querySelectorAll('.video-card');

    skeletonCards.forEach((videoCard) => {
      new SkeletonCard(videoCard);
    });
    videoCards.forEach((videoCard, index) => {
      new VideoCard(videoCard, { video: searchResult[index] });
    });

    this.observeLastChild();
  }

  observeLastChild() {
    if (this.target.lastElementChild) {
      this.observer.observe(this.target.lastElementChild);
    }
  }

  onLastChildVisible(entries, observer) {
    entries.forEach(async (entry) => {
      if (
        !entry.isIntersecting ||
        this.state.isLoading ||
        !api.rootStore.state.searchResult.length
      )
        return;

      observer.disconnect();

      this.addSkeletons(QUERY_OPTIONS.SEARCH.maxResults);

      try {
        await api.loadNextPage();
        this.removeSkeletons();
      } catch (err) {
        alert(err);
      }
    });
  }

  addSkeletons(count) {
    this.setState({ isLoading: true, skeletonCount: count });
  }

  removeSkeletons() {
    this.setState({ isLoading: false, skeletonCount: 0 });
  }
}
