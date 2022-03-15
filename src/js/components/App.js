import Component from '../core/Component.js';
import MainPage from './MainPage/MainPage.js';
import SearchModal from './SearchModal/SearchModal.js';

export default class App extends Component {
  setup() {
    this.state = { isSearchModalOpened: false };
  }

  template() {
    const { isSearchModalOpened } = this.state;

    return `
      <main id="main-page" class="classroom-container"></main>
      <div id="search-modal" class="modal-container ${
        isSearchModalOpened ? '' : 'hide'
      }"></div>
    `;
  }

  afterMounted() {
    new MainPage(document.querySelector('#main-page'), {
      toggleSearchModal: this.toggleSearchModal.bind(this),
    });
    new SearchModal(document.querySelector('#search-modal'), {
      toggleSearchModal: this.toggleSearchModal.bind(this),
    });
  }

  toggleSearchModal() {
    this.setState({ isSearchModalOpened: !this.state.isSearchModalOpened });
  }
}
