import { LOAD_VIDEOS_COUNT } from '../../constant.js';
import Component from '../../core/Component.js';
import { rootStore } from '../../store/rootStore.js';
import { webStore } from '../../store/WebStore.js';
import VideoCardList from '../SearchModal/SearchResult/VideoCardList.js';

export default class MainPage extends Component {
  setup() {
    const { watchedMode } = this.props;
    this.savedVideos = webStore.load();
    this.watchedVideos = this.savedVideos.filter(
      video => video.watched === true
    );
    this.watchingVideos = this.savedVideos.filter(
      video => video.watched === false
    );

    this.watchedVideosLength = this.watchedVideos.length;
    this.watchingVideosLength =
      this.savedVideos.length - this.watchedVideosLength;

    const videos = this.savedVideos
      .filter(video => video.watched === watchedMode)
      .slice(0, 10);

    this.state = { videos, watchedPagination: 1, watchingPagination: 1 };
  }

  template() {
    const { watchedMode } = this.props;
    return `
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav class="nav">
        <span class="nav-left">
          <button type="button" name="watching" class="button nav-left__button ${
            watchedMode ? '' : 'active'
          }">
            👁️ 볼 영상
          </button>
          <button type="button" name="watched" class="button nav-left__button ${
            watchedMode ? 'active' : ''
          }">
            ✅ 본 영상
          </button>
        </span>
        <button type="button" id="search-modal-button" class="button nav__button">
          🔍 검색
        </button>
      </nav>
      <ul id="saved-video-list" class="video-list"></ul>
    `;
  }

  afterMounted() {
    const pagination =
      this.props.watchedMode === true
        ? this.state.watchedPagination
        : this.state.watchingPagination;
    const videos =
      this.props.watchedMode === true
        ? this.watchedVideos
        : this.watchingVideos;
    console.log('videos', videos);
    console.log('pagination', pagination);
    new VideoCardList(this.$('#saved-video-list'), {
      videos: videos.slice(0, LOAD_VIDEOS_COUNT * pagination),
      isLoading: false,
      handleLastVideoVisible: this.handleLastVideoVisible.bind(this),
    });
  }

  setEvent() {
    this.addEvent(
      'click',
      '#search-modal-button',
      this.props.toggleSearchModal
    );
    this.addEvent('click', '.nav-left', this.handleMode.bind(this));
  }

  handleMode(e) {
    if (!e.target.name) {
      return;
    }
    if ([...e.target.classList].includes('active')) {
      return;
    }

    const { changeMode } = this.props;
    const savedVideos = webStore.load();
    const watched = e.target.name === 'watched';
    const videos = savedVideos.filter(video => video.watched === watched);
    this.setState({ videos });
    changeMode();
  }

  handleLastVideoVisible(entries, observer) {
    entries.forEach(async entry => {
      if (!entry.isIntersecting) return;

      observer.disconnect();
      if (this.props.watchedMode) {
        if (
          this.watchedVideosLength <=
          this.state.watchedPagination * LOAD_VIDEOS_COUNT
        )
          return;
        this.setState({ watchedPagination: this.state.watchedPagination + 1 });
      } else {
        if (
          this.watchingVideosLength <=
          this.state.watchingPagination * LOAD_VIDEOS_COUNT
        )
          return;
        this.setState({
          watchingPagination: this.state.watchingPagination + 1,
        });
      }
    });
  }
}
