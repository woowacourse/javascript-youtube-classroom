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

    new MainPage(document.querySelector('#main-page'), {
      toggleSearchModal: this.toggleSearchModal.bind(this),
    });
    new SearchModal(document.querySelector('#search-modal'), {
      toggleSearchModal: this.toggleSearchModal.bind(this),
    });
  }

  // isSearchModalOpened를 state로 관리하지 않고, class로 관리하여
  // MainPage, SearchModal이 리렌더링 되지 않도록 함
  toggleSearchModal() {
    this.$searchModal.classList.toggle('hide');
  }
}
