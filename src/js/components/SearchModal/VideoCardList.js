import Component from '../../core/Component.js';
import './VideoCard.js';
import './SkeletonCard.js';
import videoService, { useStore } from '../../services/VideoService.js';
import {
  INTERSECTION_OBSERVER,
  QUERY_OPTIONS,
} from '../../config/constants.js';

class VideoCardList extends Component {
  setup() {
    this.observer = new IntersectionObserver(
      this.onLastChildVisible.bind(this),
      {
        root: this,
        rootMargin: INTERSECTION_OBSERVER.ROOT_MARGIN.NO_MARGIN,
        threshold: INTERSECTION_OBSERVER.THRESHOLD.IMMEDIATELY,
      }
    );
    this.state = { isLoading: false, skeletonCount: 0 };
  }

  template() {
    const searchResult = useStore((state) => state.searchResult);
    const { skeletonCount } = this.state;

    return `
      ${
        !searchResult.length
          ? '<skeleton-card class="skeleton-card"></skeleton-card>'.repeat(10)
          : ''
      }
      ${searchResult
        .map(
          (video) =>
            `<video-card
              class="video-card"
              videoId="${video.videoId}"
              thumbnailUrl="${video.thumbnailUrl}"
              title="${video.title}"
              channelTitle="${video.channelTitle}"
              publishTime="${video.publishTime}"
            >
            </video-card>`
        )
        .join('')}
      ${'<skeleton-card class="skeleton-card"></skeleton-card>'.repeat(
        skeletonCount
      )}
    `;
  }

  afterMounted() {
    this.observeLastChild();
  }

  observeLastChild() {
    if (this.lastElementChild) {
      this.observer.observe(this.lastElementChild);
    }
  }

  onLastChildVisible(entries, observer) {
    entries.forEach(async (entry) => {
      if (
        !entry.isIntersecting ||
        this.state.isLoading ||
        !videoService.rootStore.state.searchResult.length
      )
        return;

      observer.disconnect();

      this.addSkeletons(QUERY_OPTIONS.SEARCH.maxResults);

      try {
        await videoService.loadNextPage();
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

customElements.define('video-list', VideoCardList);

export default VideoCardList;
