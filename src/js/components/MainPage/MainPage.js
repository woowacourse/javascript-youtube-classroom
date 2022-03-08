import Component from '../../core/Component.js';

export default class MainPage extends Component {
  template() {
    return `
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav class="nav">
        <button id="search-modal-button" class="button nav__button">
          🔍 검색
        </button>
      </nav>
    `;
  }
}
