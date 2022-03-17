import { LOAD_VIDEOS_COUNT } from '../../constant.js';
import Component from '../../core/Component.js';
import { webStore } from '../../store/WebStore.js';
import VideoCard from '../SearchModal/SearchResult/VideoCard.js';

export default class WatchingVideoCardList extends Component {
  setup() {
    this.observer = new IntersectionObserver(
      this.handleLastVideoVisible.bind(this),
      {
        root: this.target,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    this.state = { pagination: 1 };
  }

  template() {
    const savedVideos = webStore.load();
    this.videos = savedVideos.filter(video => video.watched === false);
    this.renderedVideos = this.videos.slice(
      0,
      LOAD_VIDEOS_COUNT * this.state.pagination
    );

    return `
      ${this.renderedVideos
        .map(() => `<div class="video-card real"></div>`)
        .join('')}
    `;
  }

  afterMounted() {
    const videoCards = this.target.querySelectorAll('.video-card.real');
    videoCards.forEach((videoCard, index) => {
      index < this.videos.length &&
        new VideoCard(videoCard, { video: this.renderedVideos[index] });
    });

    // 10개 이하로 fetching 해오는 경우, 더 이상 observe 하지 않는다.
    if (this.renderedVideos.length % 10 !== 0) {
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
      if (!entry.isIntersecting) return;

      observer.disconnect();

      if (this.videos.length <= this.state.pagination * LOAD_VIDEOS_COUNT)
        return;

      this.setState({ pagination: this.state.pagination + 1 });
    });
  }
}
