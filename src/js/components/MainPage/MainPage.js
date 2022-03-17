import Component from '../../core/Component.js';
import { rootStore } from '../../store/rootStore.js';
import { webStore } from '../../store/WebStore.js';
import SavedVideoCardList from './SavedVideoCardList.js';

export default class MainPage extends Component {
  setup() {
    const savedVideos = webStore.load();
    rootStore.setState({ savedVideos });
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
    const { watchedMode } = this.props;
    new SavedVideoCardList(this.$('#saved-video-list'), {
      watchedMode,
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
    changeMode();
  }
}
