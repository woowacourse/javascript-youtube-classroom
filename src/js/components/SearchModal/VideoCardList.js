import Component from '../../core/Component.js';
import VideoCard from './VideoCard.js';
import SkeletonCard from './SkeletonCard.js';
import { rootStore } from '../../store/rootStore.js';
import { getSavedVideos, searchVideos } from '../../api/api.js';
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
    const { searchResult } = rootStore.state;
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
    const { searchResult } = rootStore.state;
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
        !rootStore.state.searchResult.length
      )
        return;

      observer.disconnect();

      const { query, nextPageToken } = rootStore.state.searchOption;

      this.addSkeletons(QUERY_OPTIONS.SEARCH.maxResults);

      const data = await searchVideos(query, nextPageToken).catch((err) => {
        alert(err);
      });

      this.removeSkeletons();
      if (data.items)
        this.updateSearchResult(data.items, {
          query,
          nextPageToken: data.nextPageToken,
        });
    });
  }

  addSkeletons(count) {
    this.setState({ isLoading: true, skeletonCount: count });
  }

  removeSkeletons() {
    this.setState({ isLoading: false, skeletonCount: 0 });
  }

  updateSearchResult(items, searchOption) {
    const savedVideos = getSavedVideos();
    const newVideos = items.map((item) => {
      return {
        videoId: item.id.videoId,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishTime: item.snippet.publishTime,
        saved: savedVideos.includes(item.id.videoId),
      };
    });

    rootStore.setState({
      searchResult: [...rootStore.state.searchResult, ...newVideos],
      searchOption,
    });
  }
}
