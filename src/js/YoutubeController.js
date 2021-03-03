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
    this.navigationView.on('clickNavTab', (e) => this.changeNavTab(e.detail));
  }

  changeNavTab(currentTab) {
    this.navigationView.toggleTabColor(this.selectedTab, currentTab);
    this.selectedTab = currentTab;

    if (currentTab.element.id === 'search-btn') {
      this.searchModalView.openModal();
    }
  }
}
