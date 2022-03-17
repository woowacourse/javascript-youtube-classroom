import Component from '../core/Component.js';
import { rootStore } from '../store/rootStore.js';
import MainPage from './MainPage/MainPage.js';
import SearchModal from './SearchModal/SearchModal.js';

export default class App extends Component {
  setup() {
    this.state = { watchedMode: false };
  }

  template() {
    return `
      <main id="main-page" class="classroom-container"></main>
      <div id="search-modal" class="modal-container hide"></div>
    `;
  }

  toggleSearchModal() {
    this.$searchModal.classList.toggle('hide');
  }

  afterMounted() {
    this.$searchModal = this.$('#search-modal');

    const { watchedMode } = this.state;
    new MainPage(document.querySelector('#main-page'), {
      watchedMode,
      changeMode: this.changeMode.bind(this),
      toggleSearchModal: this.toggleSearchModal.bind(this),
    });
    new SearchModal(document.querySelector('#search-modal'), {
      toggleSearchModal: this.toggleSearchModal.bind(this),
    });
  }

  changeMode() {
    const { watchedMode } = this.state;
    this.setState({ watchedMode: !watchedMode });
  }
}
