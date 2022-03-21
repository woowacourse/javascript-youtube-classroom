import Component from '../core/Component.js';
import { useStore } from '../services/VideoService.js';
import './MainPage/MainPage.js';
import './SearchModal/SearchModal.js';

class App extends Component {
  template() {
    const isSearchModalOpened = useStore((state) => state.isSearchModalOpened);

    return `
      <main-page class="classroom-container"></main-page>
      <search-modal
        class="modal-container
        ${isSearchModalOpened ? '' : 'hide'}"
      >
      </search-modal>
    `;
  }
}

customElements.define('app-wrapper', App);

export default App;
