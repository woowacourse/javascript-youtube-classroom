import Component from '../core/Component.js';
import { rootStore } from '../store/rootStore.js';
import MainPage from './MainPage/MainPage.js';
import SearchModal from './SearchModal/SearchModal.js';

export default class App extends Component {
  setup() {
    this.state = { watchedMode: false };
  }

  template() {
    // TODO: modal 상태가 번함에 따라, main-page가 re-rendering되지 않게 하기
    // SOLVE: watchedMode를 MainPage -> App으로 올림으로써 해결
    const { isSearchModalOpened } = rootStore.state;

    return `
      <main id="main-page" class="classroom-container"></main>
      <div id="search-modal" class="modal-container ${
        isSearchModalOpened ? '' : 'hide'
      }"></div>
    `;
  }

  afterMounted() {
    const { watchedMode } = this.state;
    new MainPage(document.querySelector('#main-page'), {
      watchedMode,
      changeMode: this.changeMode.bind(this),
    });
    new SearchModal(document.querySelector('#search-modal'));
  }

  changeMode() {
    const { watchedMode } = this.state;
    this.setState({ watchedMode: !watchedMode });
  }
}
