import Component from '../../core/Component.js';

export default class MainPage extends Component {
  template() {
    return `
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav class="nav">
        <span class="nav-left">
          <button type="button" class="button nav-left__button">
            👁️ 볼 영상
          </button>
          <button type="button" class="button nav-left__button">
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

  setEvent() {
    const { toggleSearchModal } = this.props;

    this.addEvent('click', '#search-modal-button', toggleSearchModal);
  }
}
