import { LOAD_VIDEOS_COUNT } from '../../constant.js';
import Component from '../../core/Component.js';
import { webStore } from '../../store/WebStore.js';
import VideoCardList from '../SearchModal/SearchResult/VideoCardList.js';

export default class MainPage extends Component {
  setup() {
    const savedVideos = webStore.load();
    const videos = savedVideos.filter(video => video.watched === false);

    this.state = { videos, mode: 'watching', pagination: 1 };
  }
  template() {
    const { mode } = this.state;
    return `
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav class="nav">
        <span class="nav-left">
          <button type="button" name="watching" class="button nav-left__button ${
            mode === 'watching' ? 'active' : ''
          }">
            👁️ 볼 영상
          </button>
          <button type="button" name="watched" class="button nav-left__button ${
            mode === 'watching' ? '' : 'active'
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
    new VideoCardList(this.$('#saved-video-list'), {
      videos: this.state.videos.slice(
        0,
        LOAD_VIDEOS_COUNT * this.state.pagination - 1
      ),
      isLoading: false,
      loadNextVideos: this.loadNextVideos.bind(this),
    });
  }

  setEvent() {
    const { toggleSearchModal } = this.props;

    this.addEvent('click', '#search-modal-button', toggleSearchModal);
    this.addEvent('click', '.nav-left', this.handleMode.bind(this));
  }

  handleMode(e) {
    if (e.target.name) {
      const savedVideos = webStore.load();
      const watched = e.target.name === 'watched';
      const videos = savedVideos.filter(video => video.watched === watched);
      this.setState({ mode: e.target.name, videos });
    }
  }

  loadNextVideos() {
    console.log('this.state', this.state);
    // this.setState({ pagination: this.state.pagination + 1 });
  }
}
