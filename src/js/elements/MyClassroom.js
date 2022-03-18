import CustomElement from '../abstract/CustomElement';
import { addEvent, $ } from '../utils';

class MyClassroom extends CustomElement {
  // eslint-disable-next-line max-lines-per-function
  template() {
    return `
      <main id="app" class="classroom-container">
        <h1 class="classroom-container__title">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
        <nav class="nav">
          <div class="menu">
            <input type="radio" id="playlist-videos-menu" name="nav__menu" value="playlist-videos-menu" checked></input>
            <label for="playlist-videos-menu" class="nav__playlist-videos-menu">👁️ 볼 영상</label>
            <input type="radio" id="watched-videos-menu" name="nav__menu" value="watched-videos-menu"></input>
            <label for="watched-videos-menu" class="nav__watched-videos-menu">✅ 본 영상</label>
          </div>
          <button type="button" id="search-modal-button" class="button nav__button">🔍 검색</button>
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
