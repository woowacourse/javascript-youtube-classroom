import Component from '../../core/Component.js';
import VideoCard from './VideoCard.js';
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

    this.state = { isLoading: false, skeletons: [] };
  }

  template() {
    const { searchResult } = rootStore.state;
    const { skeletons } = this.state;
    const videos = [...searchResult, ...skeletons];

    return `
      ${videos.map(() => `<div class="video-card"></div>`).join('')}
    `;
  }

  afterMounted() {
    const { searchResult } = rootStore.state;
    const { skeletons } = this.state;
    const videos = [...searchResult, ...skeletons];
    const videoCards = document.querySelectorAll('.video-card');

    videoCards.forEach((videoCard, index) => {
      videos[index] && new VideoCard(videoCard, { video: videos[index] });
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
      if (!entry.isIntersecting || this.state.isLoading) return;

      observer.disconnect();

      const { query, nextPageToken } = rootStore.state.searchOption;

      this.addSkeletons();

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

  addSkeletons() {
    this.setState({
      isLoading: true,
      skeletons: Array(QUERY_OPTIONS.SEARCH.maxResults).fill({
        loading: true,
        videoId: null,
        thumbnailUrl: null,
        title: null,
        channelTitle: null,
        publishTime: null,
        saved: false,
      }),
    });
  }

  removeSkeletons() {
    this.setState({ isLoading: false, skeletons: [] });
  }

  updateSearchResult(items, searchOption) {
    const savedVideos = getSavedVideos();
    const newVideos = items.map((item) => {
      return {
        loading: false,
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
