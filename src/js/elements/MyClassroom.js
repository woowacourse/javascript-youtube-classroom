import CustomElement from '../abstract/CustomElement';
import { addEvent, $ } from '../utils';

class MyClassroom extends CustomElement {
  template() {
    return `
      <main id="app" class="classroom-container">
        <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
        <nav class="nav">
          <button id="search-modal-button" class="button nav__button">🔍 검색</button>
        </nav>
      </main>
    `;
  }

  setEvent() {
    addEvent({
      component: this,
      eventType: 'click',
      selector: '#search-modal-button',
      callback: this.showSearchModal,
    });
  }

  showSearchModal() {
    $('.modal-container').classList.remove('hidden');
  }
}

customElements.define('my-classroom', MyClassroom);

export default MyClassroom;
