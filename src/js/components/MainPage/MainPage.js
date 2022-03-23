import { EXCEPTION_MESSAGE } from '../../constant.js';
import Component from '../../core/Component.js';
import { rootStore } from '../../store/rootStore.js';
import NotFound from '../SearchModal/NotFound.js';
import SavedVideoCardList from './SavedVideoCardList.js';
import { savedVideosStorage } from '../../localStorage/savedVideos';

export default class MainPage extends Component {
  setup() {
    this.state = { watchedMode: false };

    rootStore.setState({
      savedVideos: savedVideosStorage.load(),
      hasWatchedVideo: savedVideosStorage.hasWatchedVideo(),
      hasWatchingVideo: savedVideosStorage.hasWatchedVideo(),
    });
  }

  template() {
    const { watchedMode } = this.state;
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
      ${
        this.shouldShowNotFound()
          ? `
          <section
            id="not-found"
            class="search-result search-result--no-result"
          ></section>
        `
          : `
          <ul id="saved-video-list" class="video-list"></ul>
        `
      }
    `;
  }

  afterMounted() {
    const { watchedMode } = this.state;

    if (this.shouldShowNotFound()) {
      new NotFound(this.$('#not-found'), {
        message: watchedMode
          ? EXCEPTION_MESSAGE.NO_WATCHED_VIDEO
          : EXCEPTION_MESSAGE.NO_WATCHING_VIDEO,
      });
      return;
    }

    new SavedVideoCardList(this.$('#saved-video-list'), {
      watchedMode,
    });
  }

  shouldShowNotFound() {
    const { hasWatchedVideo, hasWatchingVideo } = rootStore.state;
    const { watchedMode } = this.state;

    return (
      (watchedMode && !hasWatchedVideo) || (!watchedMode && !hasWatchingVideo)
    );
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
    if (e.target.classList.contains('active')) {
      return;
    }

    const { watchedMode } = this.state;
    this.setState({ watchedMode: !watchedMode });
  }
}
