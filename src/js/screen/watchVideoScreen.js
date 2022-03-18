import StorageEngine from '../domain/storageEngine';
import { $ } from '../util/domHelper';

export default class WatchVideoScreen {
  #watchLaterTabMenuButton = $('#watch-later-tab-menu-button');
  #watchedTabMenuButton = $('#watched-tab-menu-button');
  #storageEngine = new StorageEngine();

  constructor() {
    this.#watchLaterTabMenuButton.addEventListener('click', this.handleTabMenu);
    this.#watchedTabMenuButton.addEventListener('click', this.handleTabMenu);
  }

  handleTabMenu = (e) => {
    const tabMenu = e.target.id === 'watch-later-tab-menu-button' ? 'watch-later' : 'watched';

    if (tabMenu === this.#storageEngine.getTabMenu()) return;

    this.#storageEngine.setTabMenu(tabMenu);
    this.toggleTabMenuClassName();
  };

  toggleTabMenuClassName() {
    this.#watchLaterTabMenuButton.classList.toggle('clicked');
    this.#watchedTabMenuButton.classList.toggle('clicked');
  }
}
