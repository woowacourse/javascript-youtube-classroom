import Component from '../../core/Component.js';
import VideoCard from './VideoCard.js';
import { rootStore } from '../../store/rootStore.js';
import { searchVideos } from '../../api/api.js';

export default class VideoCardList extends Component {
  setup() {
    this.observer = new IntersectionObserver(
      this.onLastChildVisible.bind(this),
      {
        root: this.target,
        rootMargin: '0px',
        threshold: 0,
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
    // 화면에 들어온 이미지를 잡아서, data-src에 있는 url를 src로 넣어준다.
    entries.forEach(async (entry) => {
      if (!entry.isIntersecting || this.state.isLoading) return;

      observer.disconnect();

      // 스크롤이 마지막 요소에 닿으면 로딩 시작
      // 로딩 될 요소들의 스켈레톤 생성해 state에 추가
      this.setState({
        isLoading: true,
        skeletons: Array(10).fill({
          loading: true,
          videoId: null,
          thumbnailUrl: null,
          title: null,
          channelTitle: null,
          publishTime: null,
          saved: false,
        }),
      });

      const newVideos = await this.loadNextVideos();

      this.setState({ isLoading: false, skeletons: [] });
      rootStore.setState({
        searchResult: [...rootStore.state.searchResult, ...newVideos],
      });
    });
  }

  async loadNextVideos() {
    const { query, nextPageToken } = rootStore.state.searchOption;
    const data = await searchVideos(query, nextPageToken);

    // searchOption 업데이트
    rootStore.setState({
      searchOption: {
        query,
        nextPageToken: data.nextPageToken,
      },
    });

    // 로딩이 끝난 후 로딩 된 요소들을 원하는 프로퍼티를 가진 객체로 매핑
    const savedVideos = Component.webStore.load();

    return data.items.map((item) => {
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
  }
}
