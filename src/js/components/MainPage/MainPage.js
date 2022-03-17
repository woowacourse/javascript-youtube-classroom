import { LOAD_VIDEOS_COUNT } from '../../constant.js';
import Component from '../../core/Component.js';
import WatchedVideoCardList from './WatchedVideoCardList.js';
import WatchingVideoCardList from './WatchingVideoCardList.js';

export default class MainPage extends Component {
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
    if (this.props.watchedMode) {
      new WatchedVideoCardList(this.$('#saved-video-list'));
    } else {
      new WatchingVideoCardList(this.$('#saved-video-list'));
    }
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
    changeMode();
  }
}
