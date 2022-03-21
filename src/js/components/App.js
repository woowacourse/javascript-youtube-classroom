import Component from '../core/Component.js';
import MainPage from './MainPage/MainPage.js';
import SearchModal from './SearchModal/SearchModal.js';

export default class App extends Component {
  template() {
    return `
      <main id="main-page" class="classroom-container"></main>
      <div id="search-modal" class="modal-container hide"></div>
    `;
  }

  afterMounted() {
    this.$searchModal = this.$('#search-modal');

    new MainPage(this.$('#main-page'), {
      toggleSearchModal: this.toggleSearchModal.bind(this),
    });
    new SearchModal(this.$('#search-modal'), {
      toggleSearchModal: this.toggleSearchModal.bind(this),
    });
  }

  toggleSearchModal() {
    this.$searchModal.classList.toggle('hide');
  }
}
