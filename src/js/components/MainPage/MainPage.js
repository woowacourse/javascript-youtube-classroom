import Component from '../../core/Component.js';
import NavBar from './NavBar.js';
import VideoCardList from './VideoCardList.js';

export default class MainPage extends Component {
  template() {
    return `
      <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav id="nav-bar" class="nav"></nav>
      <ul id="saved-video-list" class="video-list"></ul>
    `;
  }

  afterMounted() {
    new NavBar(this.$('#nav-bar'));
    new VideoCardList(this.$('#saved-video-list'));
  }
}
