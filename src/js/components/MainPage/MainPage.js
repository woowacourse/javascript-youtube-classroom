import Component from '../../core/Component.js';
import './NavBar.js';
import './VideoCardList.js';

class MainPage extends Component {
  template() {
    return `
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav-bar class="nav"></nav-bar>
      <section class="saved-video-wrapper">
        <saved-list class="video-list"></saved-list>
      </section>
    `;
  }
}

customElements.define('main-page', MainPage);

export default MainPage;
