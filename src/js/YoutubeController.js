import { $ } from './utils/dom.js';
import NavigationView from './views/NavigationView.js';
import SearchModalView from './views/SearchModalView.js';

export default class YoutubeController {
  constructor() {
    this.selectedTab = $('#saved-btn');
    this.navigationView = new NavigationView($('#nav-bar'));
    this.searchModalView = new SearchModalView($('.modal'));
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.navigationView.on('clickNavTab', (e) => this.changeNavTab(e.detail));
    this.searchModalView.on('closeModal', () =>
      this.changeNavTab($('#saved-btn')),
    );
  }

  changeNavTab(currentTab) {
    this.navigationView.toggleTabColor(this.selectedTab, currentTab);
    this.selectedTab = currentTab;

    if (currentTab.element.id === 'search-btn') {
      this.searchModalView.openModal();
    }
  }
}
