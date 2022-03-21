import CustomElement from '../abstract/CustomElement';
import { addEvent, $ } from '../utils';

import './MyVideo/MyVideos';

class MyClassroom extends CustomElement {
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
        <my-videos></my-videos>
      </main>
    `;
  }

  setEvent() {
    addEvent({
      component: this,
      eventType: 'click',
      selector: '#playlist-videos-menu',
      callback: this.showPlaylistVideos,
    });
    addEvent({
      component: this,
      eventType: 'click',
      selector: '#watched-videos-menu',
      callback: this.showWatchedVideos,
    });
    addEvent({
      component: this,
      eventType: 'click',
      selector: '#search-modal-button',
      callback: this.showSearchModal,
    });
  }

  showPlaylistVideos() {
    $('.playlist-videos-container').classList.remove('hidden');
    $('.watched-videos-container').classList.add('hidden');
  }

  showWatchedVideos() {
    $('.playlist-videos-container').classList.add('hidden');
    $('.watched-videos-container').classList.remove('hidden');
  }

  showSearchModal() {
    $('.modal-container').classList.remove('hidden');
  }
}

customElements.define('my-classroom', MyClassroom);

export default MyClassroom;
